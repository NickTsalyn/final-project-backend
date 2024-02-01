import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import "dotenv/config";

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
    res.status(404).json({message: "Not found"})
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
})

export default app