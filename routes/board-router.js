import express from "express";

import { authenticate, isEmptyBody } from "../middlewares/index.js";
import boardsController from "../controllers/boards-controller.js"

const boardRouter = express.Router();
boardRouter.use(authenticate);

boardRouter.get("/", boardsController.getAllBoards)

boardRouter.post("/add", isEmptyBody, boardsController.addBoard)

boardRouter.patch("/edit/:id", isEmptyBody, boardsController.editBoardById)

boardRouter.delete("/remove/:id", boardsController.deleteBoard)

export default boardRouter;