const Task = require("../models/Task");

/*************************** Add new Task ********************* */

exports.addTask = async (req, res) => {
  const newTask = new Task({ ...req.body });

  try {
    await newTask.save();
    const tasks = await Task.find();
    res.status(200).json({ msg: "Task added successfully", tasks });
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Add task failed" }] });
  }
};

/*************************** fetch all Tasks ********************* */

exports.fetchAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ msg: "Fetch all Tasks success", tasks });
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Fetch all tasks failed" }] });
  }
};

/*************************** fetch Task by id ********************* */

exports.fetchTaskById = async (req, res) => {
  const { _id } = req.params;

  try {
    const task = await Task.findOne({ _id });

    if (!task)
      return res
        .status(404)
        .json({ errors: [{ msg: "This task is not availbale anymore" }] });

    res.status(201).json({ msg: "fetch task success", task });
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "fetch task failed" }] });
  }
};

/*************************** Delete Task ********************* */

exports.deleteTask = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete({ _id });
    const tasks = await Task.find();
    res.status(200).json({ msg: "Task deleted successfully", tasks });
  } catch (error) {
    res.status(400).json({ msg: "Delete task failed" });
  }
};

/*************************** Update Task ********************* */

exports.updateTask = async (req, res) => {
  const { _id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id },
      { $set: { ...req.body } }
    );
    const tasks = await Task.find();
    res.status(200).json({ msg: "Task updated successfully", tasks });
  } catch (error) {
    res.status(400).json({ msg: "Update task failed" });
  }
};
