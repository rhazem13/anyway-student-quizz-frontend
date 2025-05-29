import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Quiz as QuizIcon,
  Announcement as AnnouncementIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Quizzes", icon: <QuizIcon />, path: "/quizzes" },
  { text: "Announcements", icon: <AnnouncementIcon />, path: "/announcements" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #11547A 0%, #65D5D0 100%)",
        color: "white",
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
          Student Quiz
        </Typography>
      </Box>

      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "white",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "& .MuiListItemText-root": {
                    color: "primary.main",
                    "& .MuiTypography-root": {
                      fontWeight: 600,
                    },
                  },
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "rgba(255, 255, 255, 0.7)",
                  minWidth: 40,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "rgba(255, 255, 255, 0.7)",
                  "& .MuiTypography-root": {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            left: 16,
            top: 16,
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            border: "none",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            height: "100%",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
