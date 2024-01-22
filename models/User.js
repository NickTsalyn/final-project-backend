import { Schema, model } from "mongoose";

import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userScheme = new Schema(
	{
		password: {
			type: Number,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
		token: String,
	},
	{ versionKey: false, timestamps: true }
);

userScheme.post("save", handleSaveError)
userScheme.pre("findOneAndUpdate", preUpdate)
userScheme.post("findOneAndUpdate", handleSaveError)

export const userSignupScheme = Joi.object({
    password: Joi.number().required(),
    email: Joi.string.pattern(emailPattern).required()
})

export const userSigninScheme = Joi.object({
    password: Joi.number().required(),
    email: Joi.string().pattern(emailPattern).required()
})

export const userEmailScheme = Joi.object({
    email: Joi.string().required()
})

const User = model('user', userScheme)

export default User