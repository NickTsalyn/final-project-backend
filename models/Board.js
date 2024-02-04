import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";

const boardScheme = new Schema (
    {
        title: {
            type: String,
            required: true
        },

        // iconURL: {
        //     type: String,
        //     required: true
        // },

        // backgroundURL: {
        //     type: String,
        //     required: true
        // },

        owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
            required: true
		},
    },

    { versionKey: false, timestamps: true }
)

boardScheme.post("save", handleSaveError);
boardScheme.pre("findOneAndUpdate", preUpdate);
boardScheme.post("findOneAndUpdate", handleSaveError);

const Board = model("board", boardScheme);

export default Board;