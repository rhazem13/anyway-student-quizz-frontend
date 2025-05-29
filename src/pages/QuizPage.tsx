import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  LinearProgress,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import requireAuth from "../components/requireAuth";
import axios from "axios";
import type { FullQuiz, Question } from "../types";

// const totalTime = 600; // This might come from the API later
const defaultTotalTime = 600; // 10 minutes in seconds

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState<FullQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(defaultTotalTime);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | null;
  }>({}); // To store user's selected answers
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
    status: string;
  } | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get<FullQuiz>(
          `http://localhost:5000/api/quizzes/${quizId}`
        );
        setQuizData(response.data);
        // setTimeLeft(response.data.timeLimit); // If API provides time limit
        setError(null);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  useEffect(() => {
    if (timeLeft <= 0 && !quizFinished) {
      setQuizFinished(true);
      console.log("Quiz time finished! Submitting quiz...");
      handleSubmitQuiz(); // Submit quiz automatically when time runs out
      return;
    }

    if (quizFinished || loading) return; // Don't run timer if quiz is finished or loading

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizFinished, loading]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizData!.questions[currentQuestionIndex]._id]: event.target.value,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quizData) return; // Should not happen

    const submissionBody = Object.entries(userAnswers)
      .map(([questionId, selectedAnswerText]) => {
        const question = quizData.questions.find((q) => q._id === questionId);
        const selectedAnswerIndex = question?.answers.findIndex(
          (a) => a.text === selectedAnswerText
        );
        return {
          questionId,
          selectedAnswerIndex:
            selectedAnswerIndex !== undefined ? selectedAnswerIndex : -1, // Use -1 or handle unanswered questions as per API spec
        };
      })
      .filter((submission) => submission.selectedAnswerIndex !== -1); // Filter out unanswered questions if API expects only answered

    setSubmissionLoading(true);
    setSubmissionError(null);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/quizzes/${quizId}/submit`,
        submissionBody
      );
      setQuizResult(response.data);
      setQuizFinished(true);
    } catch (err: any) {
      console.error("Error submitting quiz:", err);
      setSubmissionError("Failed to submit quiz. Please try again.");
      setQuizFinished(true); // Mark as finished even on error to show result/error state
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return; // Should not happen if button is enabled

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(
        userAnswers[quizData.questions[currentQuestionIndex + 1]._id] || null
      );
    } else {
      // Last question, submit the quiz
      handleSubmitQuiz();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
  };

  const progressValue = quizData
    ? ((quizData.questions.length - (currentQuestionIndex + 1)) /
        quizData.questions.length) *
      100
    : 0; // Progress based on questions remaining

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading Quiz...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!quizData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">Quiz not found.</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/quizzes")}
          sx={{ mt: 3 }}
        >
          Back to Quizzes
        </Button>
      </Container>
    );
  }

  if (quizFinished) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Quiz Finished!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Quiz: {quizData.title}
        </Typography>

        {submissionLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Submitting quiz and calculating result...</Typography>
          </Box>
        ) : submissionError ? (
          <Alert severity="error">{submissionError}</Alert>
        ) : quizResult ? (
          <Box>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Your Score: {quizResult.score} / {quizResult.totalQuestions}
            </Typography>
            <Typography
              variant="h6"
              color={
                quizResult.status === "pass" ? "success.main" : "error.main"
              }
            >
              Result: {quizResult.status.toUpperCase()}
              {quizResult.status === "pass" ? " 🎉" : " 😞"} {/* Cool emojis */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Percentage: {quizResult.percentage.toFixed(2)}%
            </Typography>
          </Box>
        ) : (
          <Typography>Quiz completed.</Typography>
        )}

        <Button
          variant="contained"
          onClick={() => navigate("/quizzes")}
          sx={{ mt: 3 }}
        >
          Back to Quizzes
        </Button>
      </Container>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]; // Define currentQuestion here when not finished

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz: {quizData.title}
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </Typography>
          <Typography
            variant="h6"
            color={timeLeft <= 60 && timeLeft > 0 ? "error" : "text.primary"} // Error color only when less than 60s and time > 0
          >
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{ mb: 3 }}
        />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {currentQuestion.description}
        </Typography>

        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {currentQuestion.answers.map((answer) => (
            <FormControlLabel
              key={answer._id}
              value={answer.text}
              control={<Radio />}
              label={answer.text}
            />
          ))}
        </RadioGroup>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || submissionLoading} // Disable button during submission
        >
          {currentQuestionIndex === quizData.questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </Button>
      </Box>
    </Container>
  );
};

export default requireAuth(QuizPage);
