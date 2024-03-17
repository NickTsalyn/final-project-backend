import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const addColumn = async (req, res) => {
  const { id: boardID } = req.params;
  const { _id: owner } = req.user;

  const existingBoard = await Board.findOne({ _id: boardID });
  if (!existingBoard) throw HttpError(404, "You trying to add column to unexisting board");

  const newColumn = await Column.create({ ...req.body, boardID, owner });

  existingBoard.columns.push(newColumn._id);
  await existingBoard.save();

  res.status(201).json(newColumn);
};

const getColumnByID = async (req, res) => {
  const { id } = req.params;

  const result = await Column.findOne({ _id: id });
  if (!result) {
    throw HttpError(404, `Column with id=${id} not found!`);
  }

  res.json(result);
};

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Column.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const editColumn = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { title } = req.body;

  const column = await Column.findOne({ _id: id, owner });

  if (!column) throw HttpError(404, "You trying to edit unexisting column");

  column.title = title || column.title;

  await column.save();

  res.json(column);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const existingColumn = await Column.findOneAndDelete({ _id: id, owner });
  if (!existingColumn) throw HttpError(404, `Column with id=${id} not found`);

  await Task.deleteMany({ columnID: id });

  const boardID = existingColumn.boardID;
  await Board.updateOne({ _id: boardID }, { $pull: { columns: id } });

  res.status(204).json({ message: "Column deleted successfully" });
};

export default {
  addColumn: ctrlWrapper(addColumn),
  getColumnByID: ctrlWrapper(getColumnByID),
  getAllColumns: ctrlWrapper(getAllColumns),
  editColumn: ctrlWrapper(editColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
