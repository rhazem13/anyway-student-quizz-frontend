export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
}

export interface Announcement {
  _id: string;
  name: string;
  course: string;
  content: string;
  createdAt: string;
  img?: string;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
  _id: string;
}

export interface Question {
  description: string;
  answers: Answer[];
  _id: string;
}

export interface FullQuiz extends Quiz {
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare module "*.png" {
  const value: string;
  export default value;
}
