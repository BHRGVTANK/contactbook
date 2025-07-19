import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import MongodbConnect from './config/DBconnect.js';
import AuthRoutes from './routes/AuthRoutes.js';

dotenv.config();
MongodbConnect();

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', AuthRoutes);

export default app;
