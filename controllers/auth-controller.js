import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import queryString from "query-string";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import User from "../models/User.js";
import { HttpError, sendMail, generateRandomCode } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

dotenv.config();

const { BASE_URL, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process.env;
const avatarPath = path.resolve("public", "profileAvatar");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    name,
  });

  const payload = { id: newUser._id };

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
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = { id: user._id };

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
  const { name, email, password } = req.body;

  const user = await User.findOne(_id);
  if (!user) throw HttpError(404, "User not found");

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    const updatedPassword = await bcrypt.hash(password, 10);
    user.password = updatedPassword || user.password;
  }

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const newAvatar = path.join("profileAvatar", filename);

    user.avatar = newAvatar || user.avatar;
  }

  await user.save();

  res.json({
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

const sendNeedHelp = async (req, res) => {
  const { email, comment } = req.body;
  const emailTo = "taskpro.project@gmail.com";
  // const emailTo = "oleksandr.tsyb@ukr.net";

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

const changeTheme = async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;

  const result = await User.findByIdAndUpdate(_id, { theme });

  res.json({
    theme: result.theme,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = generateRandomCode(24);
  const resetTokenExpiration = Date.now() + 3600000;

  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  const forgotPasswordEmail = {
    to: email,
    from: "oleksandr.tsyb@ukr.net",
    subject: "Password Reset Code",
    text: `Your password reset code is: ${resetToken}`,
  };

  await sendMail(forgotPasswordEmail);

  res.json({ message: "Password reset code sent successfully" });
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  const user = await User.findOne({ resetToken: resetToken });

  if (!user || user.resetTokenExpiration < Date.now())
    return res.status(400).json({ message: "Invalid or expired reset code" });

  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  user.resetToken = null;
  user.resetTokenExpiration = null;
  await user.save();

  res.json({ message: "Password successfully changed" });
};

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const { code } = urlParams;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, name, email, picture: avatar } = userData.data;
  const password = await bcrypt.hash(id, 10);

  const googleUser = await User.findOne({ email });

  if (!googleUser) {
    const newGoogleUser = await User.create({ name, email, password, avatar });

    const payload = { id: newGoogleUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    const updatedGoogleUser = await User.findByIdAndUpdate(newGoogleUser._id, {
      token,
    });

    return res.redirect(
      `${BASE_URL}?token=${updatedGoogleUser.token}&email=${updatedGoogleUser.email}&name=${updatedGoogleUser.name}&avatar=${updatedGoogleUser.avatar}&theme=${updatedGoogleUser.theme}`
    );
  }

  const payload = { id: googleUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const updatedGoogleUser = await User.findByIdAndUpdate(googleUser._id, {
    token,
  });

  return res.redirect(
    `${BASE_URL}?token=${updatedGoogleUser.token}&email=${updatedGoogleUser.email}&name=${updatedGoogleUser.name}&avatar=${updatedGoogleUser.avatar}&theme=${updatedGoogleUser.theme}`
  );
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  changeTheme: ctrlWrapper(changeTheme),
  editProfile: ctrlWrapper(editProfile),
  sendNeedHelp: ctrlWrapper(sendNeedHelp),
  forgotPassword: ctrlWrapper(forgotPassword),
  resetPassword: ctrlWrapper(resetPassword),

  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
