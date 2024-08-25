import financialRecordRouter from './routes/financialRecords';
import express from 'express';
import dotenv from 'dotenv'
import { dbConnection } from './helpers/dbConnection';
import cors from 'cors';
import path from 'path';

const CLIENT_PATH = path.resolve(path.join(__dirname, '..', '..', 'client', 'build'));

dotenv.config();

const PORT = process.env.PORT || 8081;

const app = express();
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(cors());
app.use('/financial-records', financialRecordRouter);

dbConnection();

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))

