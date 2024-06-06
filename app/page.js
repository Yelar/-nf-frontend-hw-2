'use client';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList/index';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    const inputText = localStorage.getItem("inputText");
    if (inputText && inputText.length > 0) {
      const newTask = { id: counter, text: inputText, completed: false };
      const newArr = [...tasks, newTask];
      setTasks([...tasks, newTask]);
      setCounter(counter + 1);
    }
  };

  const handleToggleTask = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  const uncompletedCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
          onChange={(event) => localStorage.setItem("inputText", event.target.value)}
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-4 rounded ml-4">
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList tasks={filteredTasks} handleDeleteTask={handleDeleteTask} handleToggleTask={handleToggleTask} status={filter} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{uncompletedCount} items left</span>
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button onClick={() => setTasks(tasks.filter(task => !task.completed))} className="text-gray-400 hover:text-white">
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
