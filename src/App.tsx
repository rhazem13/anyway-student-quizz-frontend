import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Toolbar,
} from "@mui/material";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B4965", // Dark teal from the sidebar
      light: "#62B6CB", // Lighter teal for accents
    },
    secondary: {
      main: "#5CC6BA", // Turquoise from the buttons
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {isLoggedIn && (
            <>
              <Sidebar />
              <TopNavbar />
            </>
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
              ...(isLoggedIn && {
                ml: "240px",
                mt: "64px",
              }),
            }}
          >
            {isLoggedIn && <Toolbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
