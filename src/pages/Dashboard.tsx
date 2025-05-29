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
} from "@mui/material";
import requireAuth from "../components/requireAuth";

const Dashboard = () => {
  const announcements = [
    {
      id: 1,
      author: "Mr.Ahmed Mostafa",
      department: "Math 101",
      avatar: "AM",
      content:
        "Hi my heroes! I just want you ready to our exams and focus on remaining assessments to gain more grades, good luck my warriors! 😊",
    },
    {
      id: 2,
      author: "Mrs.Salma Ahmed",
      department: "Physics 02",
      avatar: "SA",
      content:
        "Hello my students, I want to announce that the next quiz will be within 3 days and will cover the whole unit2. Also add additional handout. Study hard good luck!",
    },
  ];

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
            <List>
              {announcements.map((announcement) => (
                <ListItem
                  key={announcement.id}
                  alignItems="flex-start"
                  sx={{ px: 0 }}
                >
                  <ListItemAvatar>
                    <Avatar>{announcement.avatar}</Avatar>
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
                          {announcement.author}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {announcement.department}
                        </Typography>
                      </Box>
                    }
                    secondary={announcement.content}
                  />
                </ListItem>
              ))}
            </List>
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
