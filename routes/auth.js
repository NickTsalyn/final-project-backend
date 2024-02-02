import express from "express";

import { isEmptyBody, authenticate, upload, resizeAvatar } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupScheme, userSigninScheme } from "../models/User.js";
import upload from "../middlewares/upload.js";
import resizeAvatar from "../middlewares/resizeAvatar.js";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupScheme), authController.signup);
authRouter.post("/signin", isEmptyBody, validateBody(userSigninScheme), authController.signin)
authRouter.post("/signout", authenticate, authController.signout)
authRouter.get("/current", authenticate), authController.getCurrent
authRouter.patch("/avatar", upload.single(), resizeAvatar, authenticate, authController.updateAvatar)
// authRouter.get("/verify/:verificationToken")
// authRouter.post("/verify", isEmptyBody, validateBody(userEmailScheme))

export default authRouter;