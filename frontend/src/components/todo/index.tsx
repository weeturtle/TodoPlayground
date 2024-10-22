import { ITodo } from './todoContainer';

interface TodoProps {
  todo: ITodo;
  // eslint-disable-next-line no-unused-vars
  handleToggle: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
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
      <p
        style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.title}
      </p>
    </li>
  );
};

export default TodoItem;
