import express from "express";

import { isEmptyBody, authenticate, upload, resizeAvatar } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupScheme, userSigninScheme, userHelpMailScheme, userEditScheme } from "../models/User.js";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupScheme), authController.signup);
authRouter.post("/signin", isEmptyBody, validateBody(userSigninScheme), authController.signin);
authRouter.post("/signout", authenticate, authController.signout);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.patch("/edit", authenticate, upload.single('avatar'), resizeAvatar, validateBody(userEditScheme), authController.editProfile);
authRouter.post("/needHelp", authenticate, isEmptyBody, validateBody(userHelpMailScheme), authController.sendNeedHelp);
authRouter.post("/recovery-mail", authenticate, isEmptyBody, authController.forgotPassword)
authRouter.patch("/reset-password", isEmptyBody, authController.resetPassword)


// authRouter.get("/verify/:verificationToken")
// authRouter.post("/verify", isEmptyBody, validateBody(userEmailScheme))

export default authRouter;