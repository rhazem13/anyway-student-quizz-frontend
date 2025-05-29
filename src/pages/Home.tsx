import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { School as SchoolIcon } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      window.location.reload();
    } else {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          m: 0,
          p: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "450px",
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <SchoolIcon
            sx={{
              fontSize: 64,
              color: "primary.main",
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 3,
            }}
          >
            Welcome to Coligo
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400 }}
          >
            Your Learning Management System
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleAuth}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                minWidth: 150,
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
            {!isLoggedIn && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  minWidth: 150,
                }}
              >
                Register
              </Button>
            )}
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 4, fontStyle: "italic" }}
          >
            Join thousands of students in their learning journey
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
