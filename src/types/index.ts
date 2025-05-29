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

declare module "*.png" {
  const value: string;
  export default value;
}
