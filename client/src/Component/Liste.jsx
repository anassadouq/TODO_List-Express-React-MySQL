import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Liste() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetschTasks();
  }, []);

  const fetschTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = async (id) => {
    console.log("Deleting task with id:", id);

    const confirmDelete = window.confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/tasks/${id}/`);
        fetschTasks(); // Refresh the task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "btn btn-danger rounded-pill";
      case "Normal":
        return "btn btn-primary rounded-pill";
      case "Low":
        return "btn btn-success rounded-pill";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('fr-FR').format(new Date(dateString));
  };

  return (
    <div className="container">
      <h1 className="text-center">TO DO LIST</h1>

      <Link to='/create'>
        <button className="btn btn-dark my-4">Add Task</button>
      </Link>

      <table width="100%" className="text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>

              <td>
                {task.status === "100" ? (
                  <s>{task.description}</s>
                ) : (
                  <label>{task.description}</label>
                )}
              </td>

              <td>
                <button className={getPriorityClass(task.priority)} style={{ width: "80%" }}>
                  {task.priority}
                </button>
              </td>

              <td>{formatDate(task.deadline)}</td>

              <td>
                <input type="range" min="0" max="100" value={task.status}/>
                <span>{task.status}%</span>
              </td>

              <td>
                <Link to={`/update/${task.id}`} className="btn btn-secondary">
                  Update
                </Link>
                <button onClick={() => deleteTask(task.id)} className="btn btn-danger mx-1">Delete</button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>  
    </div> 
  )
}