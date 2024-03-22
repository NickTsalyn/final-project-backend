import express from "express";
import tasksController from "../controllers/tasks-controller.js";
import validateBody from "../decorators/validateBody.js";
import { taskAddSchema, taskChangeColumnSchema, taskEditSchema } from "../models/Task.js";
import { isEmptyBody, authenticate, isValidateId } from "../middlewares/index.js";

const tasksRouter = express.Router();

tasksRouter.use(authenticate);
tasksRouter.post('/:id', isValidateId, isEmptyBody, validateBody(taskAddSchema), tasksController.addTask);
tasksRouter.get('/', tasksController.getAllTasks);
tasksRouter.put('/:id', isValidateId, isEmptyBody, validateBody(taskEditSchema), tasksController.editTask);
tasksRouter.patch('/:id', isValidateId, isEmptyBody, validateBody(taskChangeColumnSchema), tasksController.changeColumn);
tasksRouter.delete('/:id', isValidateId, tasksController.deleteTask);



tasksRouter.patch('/:id/:columnId', isValidateId, isEmptyBody, tasksController.dndUpdate);

export default tasksRouter;