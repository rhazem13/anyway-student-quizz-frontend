import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const TopNavbar = () => {
  // This would typically come from your auth context/state
  const username = "Talia";

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: "240px",
        width: "calc(100% - 240px)",
        bgcolor: "background.default",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          color="text.primary"
          sx={{ fontSize: "1.1rem" }}
        >
          Welcome {username},
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paper",
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ p: 0 }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 35,
                height: 35,
                fontSize: "0.9rem",
              }}
            >
              {username[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
