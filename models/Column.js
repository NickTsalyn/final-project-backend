import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";

export const columnScheme = new Schema (
    {
        title: {
            type: String,
            required: true
        },
    },

    { versionKey: false, timestamps: true }
)

columnScheme.post("save", handleSaveError);
columnScheme.pre("findOneAndUpdate", preUpdate);
columnScheme.post("findOneAndUpdate", handleSaveError);

const Column = model('column', columnScheme);

export default Column