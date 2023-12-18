// Define types for Todo and TodoCreate based on the API specification
export interface Todo {
  id: number;
  title: string;
  content: string;
  deadline: string;
  is_completed: boolean;
}

export interface TodoCreate {
  title: string;
  content: string;
  deadline: string;
}