const express = require("express");
const {
  addTask,
  fetchAllTasks,
  updateTask,
  deleteTask,
  fetchTaskById,
} = require("../controllers/tasks.controller");
const Router = express.Router();

// http://localhost:8080/task/add-task
// Add new task

Router.post("/add-task", addTask);

// http://localhost:8080/task/get-tasks
//fetch all tasks

Router.get("/get-tasks", fetchAllTasks);

// http://localhost:8080/task/get-task/:_id
//fetch task by id

Router.get("/get-task/:_id", fetchTaskById);

// http://localhost:8080/task/delete-task/:_id
//Delete task

Router.delete("/delete-task/:_id", deleteTask);

// http://localhost:8080/task/update-task/:_id
//Update task

Router.put("/update-task/:_id", updateTask);

module.exports = Router;
