import express from "express";
import { authenticate, isEmptyBody, isValidateId, upload } from "../middlewares/index.js";
import boardsController from "../controllers/boards-controller.js";


const boardRouter = express.Router();
boardRouter.use(authenticate);

boardRouter.get("/", boardsController.getAllBoards);
boardRouter.get("/:id", isValidateId, boardsController.getByID);
boardRouter.post("/", upload.single("backgroundURL"), isEmptyBody, boardsController.addBoard);
boardRouter.patch("/:id", isValidateId, isEmptyBody, boardsController.editBoardById);
boardRouter.delete("/:id", isValidateId, boardsController.deleteBoard);


export default boardRouter;