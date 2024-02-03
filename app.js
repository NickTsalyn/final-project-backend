import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger/swagger-options.js';

import authRouter from './routes/auth.js';
// import userRouter from './routes/user.js';

dotenv.config()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/lobsters/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/api/')
app.use('/api/users', authRouter)
app.use((req, res) => {
    res.status(404).json({message: "Not found"})
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
})

export default app

// https://task-pro-backend-a1c2.onrender.com           для запитів на бек 