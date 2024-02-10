import express from "express";

import { authenticate, isEmptyBody, isValidateId } from "../middlewares/index.js";
import columnController from "../controllers/column-controller.js";

const columnRouter = express.Router();
columnRouter.use(authenticate);

columnRouter.get("/", columnController.getAllColumns);
columnRouter.get("/:id", isValidateId, columnController.editColumnById);
columnRouter.post("/:boardId/addColumn", isEmptyBody, columnController.addColumn);
columnRouter.patch("/edit/:id", isEmptyBody, columnController.editColumnById);
columnRouter.delete("/remove/:id", columnController.deleteColumn);

export default columnRouter;
