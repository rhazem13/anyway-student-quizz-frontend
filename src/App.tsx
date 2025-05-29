import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Toolbar,
} from "@mui/material";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import { AuthProvider, useAuth } from "./context/AuthContext";

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

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isAuthenticated && (
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
          ...(isAuthenticated && {
            ml: "240px",
            mt: "64px",
          }),
        }}
      >
        {isAuthenticated && <Toolbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
