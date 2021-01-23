import express from 'express';
import cors from 'cors';
import path from 'path'
import open from 'open';
import winston from 'winston';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import paymentRoute from './server/routes/paymentRoutes';

dotEnv.config();

const port = process.env.PORT || 8000;
const apiUrl = process.env.NODE_ENV === 'development' ? process.env.baseUrl : process.env.productionUrl;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

app.use(paymentRoute);

app.listen(port, err => {
  err ? winston.log(err) : open(apiUrl);
});

app.all('*', (req, res) => res.sendFile(path.join( __dirname, './build/index.html')));