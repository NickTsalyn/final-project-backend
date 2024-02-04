import express from "express";

import validateBody from "../decorators/validateBody.js";
import tasksController from "../controllers/tasks-controller.js";
import { taskAddSchema, taskEditSchema } from "../models/Task.js";
import { isEmptyBody, authenticate, isValidateId } from "../middlewares/index.js";


const tasksRouter = express.Router();

tasksRouter.use(authenticate);

tasksRouter.get('/', tasksController.getAll);
tasksRouter.post('/', isEmptyBody, validateBody(taskAddSchema), tasksController.addTask);
tasksRouter.patch('/:id', isValidateId, isEmptyBody, validateBody(taskEditSchema), tasksController.editTask);
tasksRouter.delete('/:id', isValidateId, tasksController.deleteTask);


export default tasksRouter;