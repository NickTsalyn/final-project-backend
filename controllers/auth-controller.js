import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

import User from "../models/User.js";
import { HttpError} from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

dotenv.config()

const { JWT_SECRET, BASE_URL } = process.env;

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
			email: user.email,
		},
	});
};

const signout = async (req, res) => {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: ''})

    res.status(204).json({message: "Logout succesfull"})
}

const getCurrent = async(req, res) => {
    const {email} = req.user
    res.json({email})
}

const updateAvatar = async(req, res) => {
    const {path: oldPath, filename} = req.file
    const newPath = path.join("profileAvatar", filename)
    await fs.rename(oldPath, newPath)
    avatarURL = path.join('profileAvatar', filename)

    const result = await User.findOneAndUpdate({token}, {new: true})
    if(!result) {
        throw HttpError(404, "User not found")
    }
    if(req.user.avatarURL) {
        const oldAvatarPath = path.join(path.resolve('public', req.user.avatarURL))
        await fs.unlink(oldAvatarPath)
    }

    res.json({
        avatarURL: result.avatarURL
    })

}


export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    signout: ctrlWrapper(signout),
    getCurrent: ctrlWrapper(getCurrent),
    updateAvatar: ctrlWrapper(updateAvatar)
}