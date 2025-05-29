import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";
import requireAuth from "../components/requireAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Announcement } from "../types";

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const dueItems = [
    {
      id: 1,
      title: "Unit 2 quiz",
      course: "Physics 02",
      topic: "Unit2: Motion and Forces",
      dueDate: "20 Dec 2024 - 09:00 PM",
      type: "quiz",
    },
    {
      id: 2,
      title: "12-12 Assignment",
      course: "Math K12",
      topic: "الوحدة - الجبر",
      dueDate: "20 Dec 2024 - 09:00 PM",
      type: "assignment",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Card
          sx={{
            backgroundImage: "linear-gradient(to right, #ffffff, #f5f5f5)",
            borderRadius: 2,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  EXAMS TIME
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Here we are, Are you ready to fight? Don't worry, we prepared
                  some tips to be ready for your exams.
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", mb: 2 }}
                >
                  "Nothing happens until something moves" - Albert Einstein
                </Typography>
                <Button variant="contained" color="secondary">
                  View exams tips
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* You can add an illustration here */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Announcements</Typography>
              <Button color="primary">All</Button>
            </Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ p: 2 }}>
                {error}
              </Typography>
            ) : (
              <List>
                {announcements.map((announcement) => (
                  <ListItem
                    key={announcement._id}
                    alignItems="flex-start"
                    sx={{ px: 0 }}
                  >
                    <ListItemAvatar>
                      <Avatar src={announcement.img} alt={announcement.name}>
                        {announcement.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="text.primary"
                          >
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
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {announcement.content}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1, display: "block" }}
                          >
                            {new Date(
                              announcement.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">What's due</Typography>
              <Button color="primary">All</Button>
            </Box>
            <List>
              {dueItems.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" color="primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {item.course}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Topic: {item.topic}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due to: {item.dueDate}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    {item.type === "quiz" ? "Start Quiz" : "Solve Assignment"}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default requireAuth(Dashboard);
