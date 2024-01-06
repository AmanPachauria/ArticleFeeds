import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO)
        .then( () => {
            console.log('Connected to MongoDB!');
        })
        .catch( (err) => {
            console.log(err);
        });

const app = express();

app.listen(3000, ()=> {
    console.log('Server is running on port 3000!');
})

app.use(express.json());
app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);

app.use( (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
