const Task = require('../models/Task');

// GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim())
      return res.status(400).json({ message: 'Title is required' });

    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task)
      return res.status(404).json({ message: 'Task not found' });

    const { title, description, status } = req.body;
    await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task)
      return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
