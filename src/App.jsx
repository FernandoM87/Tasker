import { useEffect, useState } from 'react';
import { fetchItems, addItem, deleteItem } from './api';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleAdd = async () => {
    const newItem = await addItem(input);
    setItems([...items, newItem]);
    setInput('');
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6 max-w-md mx-auto my-32 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">MongoDB CRUD</h1>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 ml-2">
          Add
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="flex justify-between p-2 border-b">
            {item.name}
            <button onClick={() => handleDelete(item._id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
