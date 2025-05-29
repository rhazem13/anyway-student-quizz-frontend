import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TopNavbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { xs: 0, md: "240px" },
        width: { xs: "100%", md: "calc(100% - 240px)" },
        bgcolor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          pl: { xs: 7, md: 2 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="text.secondary"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            display: { xs: "none", sm: "block" },
            fontWeight: 600,
          }}
        >
          Welcome {user?.username},
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
          }}
        >
          <IconButton
            onClick={handleMenu}
            sx={{ p: 0 }}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: { xs: 32, md: 35 },
                height: { xs: 32, md: 35 },
                fontSize: "0.9rem",
              }}
            >
              {user?.username?.[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 180,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" color="text.primary">
                {user?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5 }}>
              <LogoutIcon fontSize="small" color="action" />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
