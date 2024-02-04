import Column from "../models/Column.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllColumns = async (req, res) => {
  const result = await Column.find();
  if (result.length === 0) {
    throw HttpError(404, `No columns added`);
  }
  res.json(result);
};

const addColumn = async (req, res) => {
  const result = await Column.create(req.body);
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
  const result = await Column.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Column with id=${id} not found`);
  }
  res.status(200).json({
    message: "Column removed",
  });
};

export default {
  getAllColumns: ctrlWrapper(getAllColumns),
  addColumn: ctrlWrapper(addColumn),
  editColumnById: ctrlWrapper(editColumnById),
  deleteColumn: ctrlWrapper(deleteColumn),
};
