import express from "express";

import { authenticate, isEmptyBody, isValidateId } from "../middlewares/index.js";
import columnController from "../controllers/column-controller.js";

const columnRouter = express.Router();
columnRouter.use(authenticate);

columnRouter.get("/", columnController.getAllColumns);
columnRouter.get("/:id", isValidateId, columnController.editColumnById);
columnRouter.post("/:boardName/addColumn", isEmptyBody, columnController.addColumn);
columnRouter.patch("/:id", isEmptyBody, columnController.editColumnById);
columnRouter.delete("/:id", isValidateId, columnController.deleteColumn);

export default columnRouter;
