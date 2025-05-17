export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodosApiResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

export type Todos = {
  isLoading: boolean;
  data: Todo[];
};
