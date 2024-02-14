import Board from "../models/Board.js";
import { HttpError, cloudinary } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
// import fs from "fs/promises";


const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board
    .find({ owner })
    .populate("owner", ["name"]);
  
  res.json(result);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  
  const result = await Board
    .findOne({ _id: id, owner })
    .populate("owner", ["name"]);

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found!`);
  };

  res.json(result);
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { title } = req.body;

  const existingBoard = await Board.findOne({ title, owner });

  if (existingBoard) {
    return res.status(400).json({ error: 'Board with the same title is already exists' });
  }

  // const { url: backgroundURL } = await cloudinary.uploader.upload(req.file.path,
  //   {
  //     folder: "task-pro",
  //   }
  // );
  // await fs.unlink(req.file.path);

  // const result = await Board.create({ ...req.body, backgroundURL, owner });
  const result = await Board.create({ ...req.body, owner });
  
  res.status(201).json(result);
};

const editBoardById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Board.findByIdAndUpdate({ _id: id, owner }, req.body);

  res.json(result);
};

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Board.findByIdAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, `Board with id=${id} not found`);
  };

  res.json({ id });
};

export default {
  getAllBoards: ctrlWrapper(getAllBoards),
  getByID: ctrlWrapper(getByID),
  addBoard: ctrlWrapper(addBoard),
  editBoardById: ctrlWrapper(editBoardById),
  deleteBoard: ctrlWrapper(deleteBoard),
};
