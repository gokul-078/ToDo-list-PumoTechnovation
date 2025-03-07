import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTodo = localStorage.getItem('todos');
    if (savedTodo) {
      setItems(JSON.parse(savedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newItem = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setItems([...items, newItem]);
    setInputValue('');
  }

  const toggleComplete = (id) => {
    setItems(items.map((item) => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  }

  return (
    <div className='todo-content'>
      <h1>To Do List</h1>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task!"
        />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            />
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.text}
            </span>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
