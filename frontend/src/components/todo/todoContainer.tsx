import { useState } from 'react';
import TodoItem from '.';

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoContainer = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    { id: '1', title: 'Learn React', completed: false },
    { id: '2', title: 'Learn TypeScript', completed: false },
    { id: '3', title: 'Learn Next.js', completed: false },
  ]);

  const handleToggle = (id: string) => {
    // Temporary replacement for useOptimism
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return;
    }

    todo.completed = !todo.completed;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos
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
