import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import color from 'colors';
import router from './routes/userRoute.js';
import connectDB from './config/Db.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDB()

app.use('/api', router)


const PORT  = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`.bgWhite)
})
