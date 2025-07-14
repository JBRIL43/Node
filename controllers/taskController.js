const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const task = await Task.create({ name, user: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = {
      user: req.user._id,
      name: { $regex: search, $options: "i" },
    };
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const total = await Task.countDocuments(query);
    res.json({ tasks, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, name } = req.body;
    const update = {};
    if (status) {
      if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      update.status = status;
    }
    if (name) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ message: "Invalid name" });
      }
      update.name = name.trim();
    }
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      update,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
