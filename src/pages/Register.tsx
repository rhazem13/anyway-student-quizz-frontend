import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  useTheme,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  School as SchoolIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("isLoggedIn", "true");
        // You might want to store the token and user info in a more secure way
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
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
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <SchoolIcon
            sx={{
              fontSize: 48,
              color: "primary.main",
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="username"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                mb: 2,
              }}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <Button
              variant="text"
              onClick={() => navigate("/")}
              sx={{ textTransform: "none" }}
            >
              Already have an account? Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
