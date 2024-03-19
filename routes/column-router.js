import express from "express";
import { authenticate, isEmptyBody, isValidateId } from "../middlewares/index.js";
import columnController from "../controllers/column-controller.js";
import validateBody from "../decorators/validateBody.js";
import { columnAddSchema, columnEditSchema } from "../models/Column.js";

const columnRouter = express.Router();

columnRouter.use(authenticate);
columnRouter.post("/:id", isValidateId, isEmptyBody, validateBody(columnAddSchema), columnController.addColumn);
columnRouter.get("/", columnController.getAllColumns);
columnRouter.get("/:id", isValidateId, columnController.getColumnByID);
columnRouter.put("/:id", isValidateId, isEmptyBody, validateBody(columnEditSchema), columnController.editColumn);
columnRouter.delete("/:id", isValidateId, columnController.deleteColumn);

export default columnRouter;
