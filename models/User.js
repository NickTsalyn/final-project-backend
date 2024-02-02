import Joi from "joi";

import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";


const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const themeList = ["light", "violet", "dark"];

const userScheme = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			match: emailPattern,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
			minlength: 6,
		},
		theme: {
			type: String,
			enum: themeList,
			default: "violet",
		},
		avatar: String,
		token: String,
		// verify: {
		// 	type: Boolean,
		// 	default: false,
		// },
		// verificationToken: {
		// 	type: String,
		// 	required: [true, "Verify token is required"],
		// },
	},
	{ versionKey: false, timestamps: true }
);

userScheme.post("save", handleSaveError);
userScheme.pre("findOneAndUpdate", preUpdate);
userScheme.post("findOneAndUpdate", handleSaveError);

export const userSignupScheme = Joi.object({
	name: Joi.string().required(),
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.string().min(6).required(),
})

export const userSigninScheme = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.string().min(6).required(),
})

export const userEditScheme = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(emailPattern),
	password: Joi.string().min(6),
});

export const userEmailScheme = Joi.object({
    email: Joi.string().required()
})

const User = model("user", userScheme);

export default User;
