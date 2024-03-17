import express from "express";
import boardsController from "../controllers/boards-controller.js";
import { authenticate, isEmptyBody, isValidateId, upload } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { boardAddSchema, boardEditSchema } from "../models/Board.js";


const boardRouter = express.Router();

boardRouter.use(authenticate);
boardRouter.post("/", upload.single("background"), isEmptyBody, validateBody(boardAddSchema), boardsController.addBoard);
boardRouter.get("/", boardsController.getAllBoards);
boardRouter.get("/:id", isValidateId, boardsController.getByID);
boardRouter.put("/:id", isValidateId, isEmptyBody, validateBody(boardEditSchema), boardsController.editBoard);


boardRouter.delete("/:id", isValidateId, boardsController.deleteBoard);

export default boardRouter;