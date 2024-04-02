import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger/swagger-options.js';
import path from "path";

import authRouter from './routes/auth-router.js';
import boardRouter from './routes/board-router.js';
import columnRouter from './routes/column-router.js';
import tasksRouter from './routes/task-router.js';


dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/lobsters/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/users', authRouter);
app.use('/api/boards', boardRouter);
app.use('/api/columns', columnRouter);
app.use('/api/tasks', tasksRouter);

// Код для перевірки авторизації з link.html
const basePath = path.resolve();

app.use(express.static(path.join(basePath, "public")));
app.get("/link", (req, res) => {
  res.sendFile(path.join(basePath, "public", "link.html"));
});
// Код для перевірки авторизації з link.html

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
});

export default app;

// https://task-pro-backend-a1c2.onrender.com           для запитів на бек 