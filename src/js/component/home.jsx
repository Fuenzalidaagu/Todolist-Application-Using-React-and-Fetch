import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  function handleTaskInput(event) {
    setTaskInput(event.target.value);
  }

  async function addTask(event) {
    if (event.key === 'Enter') {
      const trimmedTaskInput = taskInput.trim();
  
      if (!trimmedTaskInput) {
        return;
      }
  
      const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/fuenzalidaagu', {
        method: 'PUT',
        body: JSON.stringify({ task: trimmedTaskInput }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      setTasks([...tasks, trimmedTaskInput]);
      setTaskInput('');
    }
  }
  
  async function deleteTask(index) {

    await fetch('https://assets.breatheco.de/apis/fake/todos/user/fuenzalidaagu', {
      method: 'PUT',
      body: JSON.stringify({ tasks: tasks.filter((task, i) => i !== index) }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    setTasks(tasks.filter((task, i) => i !== index));
  }

  async function cleanAllTasks() {

    await fetch('https://assets.breatheco.de/apis/fake/todos/user/fuenzalidaagu', {
      method: 'DELETE'
    });
  
    setTasks([]);
  }

  return (
    <div className='book'>
      <div className="todo-list">
        <h1>TODO LIST</h1>
        <input
          type="text"
          placeholder="Añadir tarea"
          value={taskInput}
          onChange={handleTaskInput}
          onKeyPress={addTask}
        />
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => deleteTask(index)}>x</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas, añadir tareas</p>
        )}
        <div  className='deleteall'>
        <button onClick={cleanAllTasks}>Borrar todas las tareas</button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;