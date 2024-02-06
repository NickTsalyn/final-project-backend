import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";


const priorityList = ["Without", "Low", "Medium", "High"];

const taskScheme = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Set title for task']
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
            enum: priorityList,
            default: "Without",
        },
        deadline: {
            type: String,
        },
        column: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

taskScheme.post("save", handleSaveError);
taskScheme.pre("findOneAndUpdate", preUpdate);

export const taskAddSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    priority: Joi.string().valid(...priorityList),
    deadline: Joi.string(),
});

export const taskEditSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    priority: Joi.string().valid(...priorityList),
    deadline: Joi.string(),
});

const Task = model("task", taskScheme);


export default Task;