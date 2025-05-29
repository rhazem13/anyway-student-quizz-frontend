import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Quiz } from "../types";
import requireAuth from "../components/requireAuth";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get<Quiz[]>(
          "http://localhost:5000/api/quizzes"
        );
        setQuizzes(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch quizzes");
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const courses = [...new Set(quizzes.map((quiz) => quiz.course))];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || quiz.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Quizzes
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Course</InputLabel>
              <Select
                value={filterCourse}
                label="Filter by Course"
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <MenuItem value="all">All Courses</MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredQuizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz._id}>
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ mb: 2, fontWeight: 500 }}
                  >
                    {quiz.title}
                  </Typography>
                  <Box sx={{ mb: 2, flex: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Course: {quiz.course}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Topic: {quiz.topic}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {formatDate(quiz.dueDate)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: "auto" }}
                  >
                    Start Quiz
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default requireAuth(Quizzes);
