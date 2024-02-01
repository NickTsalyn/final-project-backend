import express from "express";

import { isEmptyBody, authenticate, upload, resizeAvatar } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupScheme, userSigninScheme, userEmailScheme, userEditScheme } from "../models/User.js";


const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupScheme));
authRouter.post("/signin", isEmptyBody, validateBody(userSigninScheme))
authRouter.patch("/edit", authenticate, upload.single('avatar'), resizeAvatar, validateBody(userEditScheme));
authRouter.post("/signout", authenticate)
authRouter.get("/verify/:verificationToken")
authRouter.post("/verify", isEmptyBody, validateBody(userEmailScheme))


export default authRouter;