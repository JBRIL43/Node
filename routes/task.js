const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/tasks", auth, createTask);
router.get("/tasks", auth, getTasks);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;
