// src/app.ts
import express from 'express';
import authRoutes from './routes/authroutes';
import userRoutes from './routes/userroutes';
import connectDB from "./config/db";
import dotenv from "dotenv";
import { loggerMiddleware } from './middlewares/loggermiddleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
