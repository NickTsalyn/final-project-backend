import express from "express";

import { isEmptyBody, authenticate } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupScheme, userSigninScheme, userEmailScheme } from "../models/User.js";
import upload from "../middlewares/upload.js";
import resizeAvatar from "../middlewares/resizeAvatar.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupScheme));
authRouter.post("/signin", isEmptyBody, validateBody(userSigninScheme))
authRouter.post("/signout", authenticate)
authRouter.get("/current", authenticate)
authRouter.patch("/avatar", upload.single(), resizeAvatar, authenticate)
authRouter.get("/verify/:verificationToken")
authRouter.post("/verify", isEmptyBody, validateBody(userEmailScheme))


export default authRouter