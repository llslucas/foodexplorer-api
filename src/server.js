import 'dotenv/config.js';
import 'express-async-errors/index.js';
import AppError from './utils/AppError.js';
import express from 'express';
import routes from './routes/index.js';
import { UPLOADS_FOLDER } from './configs/upload.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use("/files", express.static(UPLOADS_FOLDER));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(routes);

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message 
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));