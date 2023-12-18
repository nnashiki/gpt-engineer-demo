import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  title: string;
  content: string;
  deadline: string;
  is_completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', content: '', deadline: '' });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (response.ok) {
        fetchTodos(); // Refresh the list after adding new todo
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTodo.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={newTodo.content}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="deadline"
            placeholder="Deadline"
            value={newTodo.deadline}
            onChange={handleInputChange}
          />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.content}</p>
              <p>Deadline: {todo.deadline}</p>
              <p>{todo.is_completed ? 'Completed' : 'Not Completed'}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
