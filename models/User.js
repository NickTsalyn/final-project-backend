import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const themeList = ["light", "violet", "dark"];

const userScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailPattern,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
	  required: true,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: String,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "violet",
    },
    avatar: String,
    token: String,
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
});

export const userSigninScheme = Joi.object({
  email: Joi.string().pattern(emailPattern),
  password: Joi.string().min(6),
});

export const userEditScheme = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().pattern(emailPattern).optional(),
  password: Joi.string().min(6).optional(),
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
