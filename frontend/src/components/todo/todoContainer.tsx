import { useEffect, useState } from 'react';
import TodoItem from '.';
import fetchTodos from './fetchTodos';
import { useAuth } from '../../provider/useAuth';
import axios from 'axios';

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoContainer = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { isAuthed } = useAuth();

  useEffect(() => {
    const getTodos = async () => {
      const _todos = await fetchTodos();
      console.log(_todos);
      setTodos(_todos);
    };

    if (isAuthed) {
      getTodos();
    }
  }, [isAuthed]);

  const handleToggle = async (id: string) => {
    const initial_todo = todos.find((todo) => todo.id === id);

    if (!initial_todo) {
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );

    try {
      const response = await axios.put('/todos', {
        id,
        completed: !initial_todo.completed,
      });

      if (response.status !== 200) {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: initial_todo.completed }
            : todo,
        ),
      );
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos &&
          todos
            .sort((a, b) =>
              a.completed === b.completed ? 0 : a.completed ? 1 : -1,
            )
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
              />
            ))}
      </ul>
    </>
  );
};

export default TodoContainer;
