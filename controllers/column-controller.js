import Column from "../models/Column.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Board from "../models/Board.js";

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Column.find({ owner }, "-createdAt -updatedAt").populate(
    "owner",
    ["name"]
  );

  res.json(result);
};

const getColumnByID = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Column.findOne({ _id: id, owner }).populate("owner", [
    "name",
  ]);

  if (!result) {
    throw HttpError(404, `Column with id=${id} not found!`);
  }

  res.json(result);
};

const addColumn = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: id } = req.params;

  const existingBoard = await Board.findOne({ _id: id });

  if (!existingBoard) {
    throw HttpError(404, "You trying to add column to unexisting board");
  }

  const result = await Column.create({ ...req.body, owner, board: id });
  res.status(201).json(result);
};

const editColumnById = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndUpdate(id, req.body);

  if (!result) {
    throw HttpError(404, `Column with id=${id} not found`);
  }
  res.json(result);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Column.findOneAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, `Column with id=${id} not found`);
  }

  res.status(204).json({
    message: "Column removed",
  });
};

export default {
  getAllColumns: ctrlWrapper(getAllColumns),
  getColumnByID: ctrlWrapper(getColumnByID),
  addColumn: ctrlWrapper(addColumn),
  editColumnById: ctrlWrapper(editColumnById),
  deleteColumn: ctrlWrapper(deleteColumn),
};
