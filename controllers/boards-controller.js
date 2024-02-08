import Board from "../models/Board.js";
import { HttpError, cloudinary } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";


const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board
    .find({ owner })
    .populate("owner", ["name"]);
  
  res.json(result);
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result);
};

const editBoardById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Board.findByIdAndUpdate({ _id: id, owner }, req.body);

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }
  res.json(result);
};

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Board.findByIdAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  }
  res.status(200).json({
    message: "Board removed",
  });
};

export default {
  getAllBoards: ctrlWrapper(getAllBoards),
  addBoard: ctrlWrapper(addBoard),
  editBoardById: ctrlWrapper(editBoardById),
  deleteBoard: ctrlWrapper(deleteBoard),
};
