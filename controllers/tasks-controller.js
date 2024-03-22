import Task from "../models/Task.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Column from "../models/Column.js";

const addTask = async (req, res) => {
  const { id: columnID } = req.params;
  const { _id: owner } = req.user;

  const existingColumn = await Column.findOne({ _id: columnID });
  if (!existingColumn)
    throw HttpError(404, "You trying to add task to unexisting column");

  const newTask = await Task.create({ ...req.body, columnID, owner });

  existingColumn.tasks.push(newTask._id);
  await existingColumn.save();

  res.status(201).json(newTask);
};

const getAllTasks = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { title, description, priority, deadline, columnID } = req.body;

  const task = await Task.findOne({ _id: id, owner });

  if (!task) throw HttpError(404, "You trying to edit unexisting task");

  task.title = title || task.title;
  task.description = description || task.description;
  task.priority = priority || task.priority;
  task.deadline = deadline || task.deadline;
  task.columnID = columnID || task.columnID;

  await task.save();

  res.json(task);
};

const changeColumn = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { columnID: newColumnID } = req.body;
  
  const task = await Task.findOne({ _id: id, owner });
  if (!task) throw HttpError(404, "You trying to change unexisting task");

  const prevColumnID = task.columnID;
  await Column.updateOne({ _id: prevColumnID }, { $pull: { tasks: id } });

  const newColumn = await Column.findOne({ _id: newColumnID, owner });

  task.columnID = newColumnID;
  await task.save();

  newColumn.tasks.push(id);
  await newColumn.save();

  res.json({ [task._id]: id, prevColumnID, newColumnID });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const deletedTask = await Task.findOneAndDelete({ _id: id, owner });

  if (!deletedTask) throw HttpError(404, `Task with id=${id} not found!`);

  const columnID = deletedTask.columnID;

  await Column.updateOne({ _id: columnID }, { $pull: { tasks: id } });

  res.json({ id, columnID });
};

// ---------------------------------------------------------

const dndUpdate = async (req, res) => {
  const { id, columnId: prevColumn } = req.params;
  const { currentColumnId, newTaskIdx } = req.body;

  const result = await Task.findByIdAndUpdate(
    id,
    { column: currentColumnId },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, `Task with id=${id} not found`);
  }

  res.json({ result, prevColumn, newTaskIdx });
};

// --------------------------------------------------------------

export default {
  addTask: ctrlWrapper(addTask),
  getAllTasks: ctrlWrapper(getAllTasks),
  editTask: ctrlWrapper(editTask),
  changeColumn: ctrlWrapper(changeColumn),
  deleteTask: ctrlWrapper(deleteTask),
  dndUpdate: ctrlWrapper(dndUpdate),
};
