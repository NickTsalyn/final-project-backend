import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

import User from "../models/User.js";
import { HttpError, sendMail, generateRandomCode } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

dotenv.config();

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "profileAvatar");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    name,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
            name: user.name,
			email: user.email,
			theme: user.theme,
			avatar: user.avatar,
		},
	});
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Logout succesfull" });
};

const getCurrent = async (req, res) => {
  const { email, name, theme, _id: id, avatar } = req.user;
  res.json({ email, name, theme, id, avatar });
};

const editProfile = async (req, res) => {
  const { _id } = req.user;

  let data = { ...req.body };
  
  if (req.body.password) {
    const updatedPassword = await bcrypt.hash(req.body.password, 10);

    data.password = updatedPassword;
  };

  
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const newAvatar = path.join("profileAvatar", filename);
    
    data.avatar = newAvatar;
  };
  
  const result = await User.findOneAndUpdate(_id, { ...data });

  if (!result) {
    throw HttpError(404, "User not found");
  };
 
  res.json({
    user: {
      name: result.name,
      email: result.email,
      avatar: result.avatar,
    },
  });
};

const sendNeedHelp = async (req, res) => {
  const { email, comment } = req.body;
  // const emailTo = "taskpro.project@gmail.com";
  const emailTo = "manoiloruslan@gmail.com";

  const helpMessage = {
    to: emailTo,
    subject: `Task PRO: Need help for ${email}`,
    text: comment,
  };

  await sendMail(helpMessage);

  res.json({
    message: "Mail sent",
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = generateRandomCode(24);
  const resetTokenExpiration = Date.now() + 3600000;

  user.resetToken = resetToken.toString();
  user.resetTokenExpiration = resetTokenExpiration.toString();
  await user.save();

  const forgotPasswordEmail = {
    to: email,
    from: "ManoiloRuslan@gmail.com",
    subject: "Password Reset Code",
    text: `Your password reset code is: ${resetToken}`,
  };

  await sendMail(forgotPasswordEmail);

  res.json({ message: "Password reset code sent successfully" });
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  const user = await User.findOne({ resetToken: resetToken });

  if (!user || user.resetTokenExpiration < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired reset code" });
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  user.resetToken = null;
  user.resetTokenExpiration = null;
  await user.save();

  res.json({ message: "Password successfully changed" });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  editProfile: ctrlWrapper(editProfile),
  sendNeedHelp: ctrlWrapper(sendNeedHelp),
  forgotPassword: ctrlWrapper(forgotPassword),
  resetPassword: ctrlWrapper(resetPassword),
};
