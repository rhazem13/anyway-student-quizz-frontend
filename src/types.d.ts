export interface Announcement {
  _id: string;
  name: string;
  course: string;
  content: string;
  img?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
