const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'express_mysql'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.get('/', (req, res) => {
  return res.json('the backend side!');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = "SELECT * FROM tasks WHERE id = ?";
  db.query(sql, taskId, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.json(data[0]);
  });
});

// Create a task
app.post('/tasks', (req, res) => {
  const { description, priority, deadline, status } = req.body;
  const newTask = { description, priority, deadline, status };

  const sql = "INSERT INTO tasks SET ?";
  db.query(sql, newTask, (err, result) => {
    if (err) return res.json(err);
    newTask.id = result.insertId;
    return res.json(newTask);
  });
});

// Update a task by ID
app.patch('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { description, priority, deadline, status } = req.body;
  const updateTask = { description, priority, deadline, status };

  const sql = "UPDATE tasks SET ? WHERE id = ?";
  db.query(sql, [updateTask, taskId], (err, result) => {
    if (err) return res.json(err);
    // Check if the task was found and updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.json({ message: "task updated successfully" });
  });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  const sql = "DELETE FROM tasks WHERE id = ?";
  db.query(sql, taskId, (err, result) => {
    if (err) return res.json(err);
    // Check if the task was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.json({ message: "task deleted successfully" });
  });
});

app.listen(3001, () => {
  console.log('Server works!!');
});