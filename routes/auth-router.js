import express from "express";
import authController from "../controllers/auth-controller.js";
import { isEmptyBody, authenticate, upload, resizeAvatar } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupScheme, userSigninScheme, userHelpMailScheme, userEditScheme, userChangeThemeSchema } from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupScheme), authController.signup);
authRouter.post("/signin", isEmptyBody, validateBody(userSigninScheme), authController.signin);
authRouter.post("/signout", authenticate, authController.signout);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.put("/edit", authenticate, upload.single('avatar'), resizeAvatar, validateBody(userEditScheme), authController.editProfile);
authRouter.patch("/changeTheme", authenticate, isEmptyBody, validateBody(userChangeThemeSchema), authController.changeTheme);
authRouter.post("/needHelp", authenticate, isEmptyBody, validateBody(userHelpMailScheme), authController.sendNeedHelp);
authRouter.post("/recovery-mail", isEmptyBody, authController.forgotPassword)
authRouter.patch("/reset-password", isEmptyBody, authController.resetPassword)

export default authRouter;