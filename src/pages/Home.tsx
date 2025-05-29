import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            color="primary"
            sx={{ fontWeight: 500 }}
          >
            Welcome to Coligo
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Your Learning Management System
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleAuth}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
