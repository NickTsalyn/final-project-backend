import express from "express";

import { authenticate } from "../middlewares/index.js";


const userRouter = express.Router();

userRouter.get("/current", authenticate);


export default userRouter;