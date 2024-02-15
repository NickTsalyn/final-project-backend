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
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
		},
		resetToken: {
			type: String
		},
		resetTokenExpiration: {
			type: String
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
	name: Joi.string(),
    email: Joi.string().pattern(emailPattern),
    password: Joi.string().min(6),
})

export const userSigninScheme = Joi.object({
    email: Joi.string().pattern(emailPattern),
    password: Joi.string().min(6),
})

export const userEditScheme = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(emailPattern),
	password: Joi.string().min(6),
});

export const userChangeThemeSchema = Joi.object({
    theme: Joi.string().valid(...themeList),
});

export const userHelpMailScheme = Joi.object({
	email: Joi.string(),
	comment: Joi.string(),
});

const User = model("user", userScheme);

export default User;
