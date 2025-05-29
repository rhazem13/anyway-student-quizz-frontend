import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Assessment as AssessmentIcon,
  Announcement as AnnouncementIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Schedule", icon: <EventIcon />, path: "/schedule" },
  { text: "Courses", icon: <MenuBookIcon />, path: "/courses" },
  { text: "Gradebook", icon: <SchoolIcon />, path: "/gradebook" },
  { text: "Performance", icon: <AssessmentIcon />, path: "/performance" },
  { text: "Announcement", icon: <AnnouncementIcon />, path: "/announcements" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "primary.main",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
          Coligo
        </Typography>
      </Box>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.12)",
                  },
                },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.9rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
