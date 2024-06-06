import React from 'react';
import TaskItem from '../TaskItem/index.jsx';

const TaskList = ({ tasks, handleDeleteTask, handleToggleTask, status }) => {
  const filteredTasks = tasks.filter(task => {
    if (status === 'all') return true;
    if (status === 'active') return !task.completed;
    if (status === 'completed') return task.completed;
  });

  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleToggleTask={handleToggleTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
