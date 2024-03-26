import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board.create({ ...req.body, owner });

  res.status(201).json(result);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Board.findOne({ _id: id, owner }).populate({
    path: "columns",
    select: "title boardID owner",

    populate: {
      path: "tasks",
      select: "title description priority deadline columnID owner",
    },
  });

  if (!result) throw HttpError(404, `Board with id=${id} not found!`);

  res.json(result);
};

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }).populate("columns", ["title"]);
  res.json(result);
};

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const existingBoard = await Board.findByIdAndDelete({ _id: id, owner });
  if (!existingBoard) throw HttpError(404, `Board with id=${id} not found`);

  const ownColumns = await Column.find({ boardID: id });
  const columnIDs = ownColumns.map((column) => column._id);

  await Task.deleteMany({ columnID: { $in: columnIDs } });

  await Column.deleteMany({ boardID: id });

  res.status(204).json({ message: "Board deleted successfully" });
};

const editBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { title, background, icon } = req.body;

  const board = await Board.findOne({ _id: id, owner });

  if (!board) throw HttpError(404, "You trying to edit unexisting board");

  board.title = title || board.title;
  board.background = background || board.background;
  board.icon = icon || board.icon;

  await board.save();

  res.json(board);
};

export default {
  addBoard: ctrlWrapper(addBoard),
  getByID: ctrlWrapper(getByID),
  getAllBoards: ctrlWrapper(getAllBoards),
  deleteBoard: ctrlWrapper(deleteBoard),
  editBoard: ctrlWrapper(editBoard),
};
