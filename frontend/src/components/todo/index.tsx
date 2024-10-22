import { ITodo } from './todoContainer';

interface TodoProps {
  todo: ITodo;
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
}

const TodoItem = ({ todo, handleToggle, handleDelete }: TodoProps) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggle(todo.id)}
      />
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
      {todo.title}
    </li>
  );
};

export default TodoItem;
