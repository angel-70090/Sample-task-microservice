const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory DB (for demo)
let tasks = [];

/**
 * Health Check Endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Task Service is running 🚀' });
});

/**
 * Create Task
 */
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: completed || false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * Get All Tasks
 */
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/**
 * Get Task by ID
 */
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

/**
 * Delete Task
 */
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Task Service running on http://localhost:${PORT}`);
});