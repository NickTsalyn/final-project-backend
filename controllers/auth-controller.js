import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

import User from "../models/User.js";
import { HttpError, sendMail} from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

dotenv.config()

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve('public', 'profileAvatar')

const signup = async (req, res) => {
	const { email, password, name } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
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
		},
	});
};

const signout = async (req, res) => {
	const { _id } = req.user
	await User.findByIdAndUpdate(_id, { token: '' })

	res.status(204).json({ message: "Logout succesfull" })
};

const getCurrent = async (req, res) => {
	const { email, name, theme, _id: id, avatar } = req.user;
	res.json({ email, name, theme, id, avatar });
};

const updateAvatar = async (req, res) => {
	const { token } = req.user
	let avatar = req.user.avatar

	const { path: oldPath, filename } = req.file
	const newPath = path.join(avatarPath, filename)
	await fs.rename(oldPath, newPath)
	avatar = path.join('profileAvatar', filename)

	const result = await User.findOneAndUpdate({ token }, { new: true })
	if (!result) {
		throw HttpError(404, "User not found")
	}
	if (req.user.avatar) {
		const oldAvatarPath = path.join(path.resolve('public', req.user.avatar))
		await fs.unlink(oldAvatarPath)
	}

	res.json({
		avatar: result.avatar
	})

};

const sendNeedHelp = async (req, res) => {
    const { email, comment } = req.body;

	const helpMessage = {
        to: email,
        subject: "Task PRO: Need help",
        text: comment,
    };

    await sendMail(helpMessage);

    res.json({
        message: "Mail sent"
    });
};

export default {
	signup: ctrlWrapper(signup),
	signin: ctrlWrapper(signin),
	signout: ctrlWrapper(signout),
	getCurrent: ctrlWrapper(getCurrent),
	updateAvatar: ctrlWrapper(updateAvatar),
	sendNeedHelp: ctrlWrapper(sendNeedHelp),
};