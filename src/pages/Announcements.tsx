import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Announcement } from "../types";
import requireAuth from "../components/requireAuth";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get<Announcement[]>(
          "http://localhost:5000/api/announcements"
        );
        setAnnouncements(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch announcements");
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
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

  const courses = [
    ...new Set(announcements.map((announcement) => announcement.course)),
  ];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || announcement.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Announcements
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search announcements..."
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
          <List sx={{ width: "100%" }}>
            {filteredAnnouncements.map((announcement) => (
              <Paper
                key={announcement._id}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    p: 3,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={announcement.img}
                      alt={announcement.name}
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "primary.main",
                      }}
                    >
                      {announcement.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" color="text.primary">
                          {announcement.name}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {announcement.course}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="div"
                          variant="body1"
                          color="text.primary"
                          sx={{ mb: 1 }}
                        >
                          {announcement.content}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          Posted on {formatDate(announcement.createdAt)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default requireAuth(Announcements);
