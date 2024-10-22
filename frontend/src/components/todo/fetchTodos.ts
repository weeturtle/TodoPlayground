import axios from 'axios';
import { ITodo } from './todoContainer';

interface TodoResponse {
  data: { todos: ITodo[] };
}

const fetchTodos = async (): Promise<ITodo[]> => {
  const response = await axios.get<null, TodoResponse>('/todos');
  console.log(response);
  return response.data.todos;
};

export default fetchTodos;
