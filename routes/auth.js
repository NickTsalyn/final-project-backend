import express from "express";

import { isEmptyBody, authenticate, upload, resizeAvatar } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupScheme, userSigninScheme, userHelpMailScheme } from "../models/User.js";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupScheme), authController.signup);
authRouter.post("/signin", isEmptyBody, validateBody(userSigninScheme), authController.signin);
authRouter.post("/signout", authenticate, authController.signout);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.patch("/avatar", upload.single('avatar'), resizeAvatar, authenticate, authController.updateAvatar);
authRouter.post("/needHelp", authenticate, isEmptyBody, validateBody(userHelpMailScheme), authController.sendNeedHelp);

// authRouter.get("/verify/:verificationToken")
// authRouter.post("/verify", isEmptyBody, validateBody(userEmailScheme))

export default authRouter;