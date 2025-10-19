import * as bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDb from './config/db.js';
import morgan from 'morgan';
import formRouter from './routes/form.routes.js';
import { TutorFormModel } from './models/tutorform.model.js';
import jwt from 'jsonwebtoken';
import adminRouter from './routes/admin.route.js';

config()
connectDb()

const app = express()
app.use(cors({
    origin: ''
}))
app.use(express.json())
app.use(morgan('dev'))
app.get('/', (request, response) => {
    response
        .status(200)
        .send({
            message: "api working succesfull",
            success: true
        })
})
app.use('/form', formRouter)
app.use('/admin',adminRouter)

app.listen(3000, () => {
    console.log(`server is running on ${3000}`);
})