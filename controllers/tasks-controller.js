import Task from "../models/Task.js";
import { HttpError} from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Column from "../models/Column.js";


const getAll = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Task
        .find({ owner }, "-createdAt -updatedAt")
        .populate("owner", ["name"]);
    
    res.json(result);
};

const addTask = async (req, res) => {
    const { _id: owner } = req.user;
    const { id: id } = req.params;

    const existingColumn = await Column.findOne({ _id: id });

    if (!existingColumn) {
      throw HttpError(404, "You trying to add task to unexisting column");
    }

    const result = await Task.create({ ...req.body, owner, column: id });
    res.status(201).json(result);
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;

    console.log(req.body);
    const result = await Task.findOneAndUpdate({ _id: id, owner }, req.body);

    if (!result) {
        throw HttpError(404, `Task with id=${id} not found!`);
    };

    res.json(result);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Task.findOneAndDelete({ _id: id, owner });

    if (!result) {
        throw HttpError(404, `Task with id=${id} not found!`);
    };

    res.json({ message: "Task deleted" });
};


export default {
    getAll: ctrlWrapper(getAll),
    addTask: ctrlWrapper(addTask),
    editTask: ctrlWrapper(editTask),
    deleteTask: ctrlWrapper(deleteTask),
};