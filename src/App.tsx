import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Quizzes from "./pages/Quizzes";
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden", // Prevent body scrolling when drawer is open on mobile
      }}
    >
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
          p: { xs: 2, md: 3 },
          ...(isAuthenticated && {
            ml: { xs: 0, md: "240px" },
            mt: "64px",
          }),
          width: "100%",
          height: "100vh",
          overflow: "auto", // Enable scrolling for main content
          position: "relative", // For proper positioning of floating elements
        }}
      >
        {isAuthenticated && <Toolbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="*" element={<NotFound />} />
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
