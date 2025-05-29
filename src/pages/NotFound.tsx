import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Error as ErrorIcon } from "@mui/icons-material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: "64px",
            color: "primary.main",
            mb: 2,
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: "6rem",
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: "text.primary",
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
          }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/dashboard")}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
