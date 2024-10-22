import { useState } from 'react';

interface NewTodoProps {
  // eslint-disable-next-line no-unused-vars
  onAdd: (title: string) => void;
}

const NewTodo = ({ onAdd }: NewTodoProps) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title) {
      return;
    }

    onAdd(title);
    setTitle('');
  };

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </>
  );
};

export default NewTodo;
