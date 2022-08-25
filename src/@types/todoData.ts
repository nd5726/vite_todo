export interface todoData {
  completed_at?: string;
  content: string;
  id?: string;
}

export interface todos {
  todos: todoData[];
}
