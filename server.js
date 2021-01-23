import express from 'express';
import cors from 'cors';
import open from 'open';
import winston from 'winston';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import paymentRoute from './server/routes/paymentRoutes';

dotEnv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/build/'));
app.use(paymentRoute);

app.listen(port, err => {
  err ? winston.log(err) : open(`http://localhost:${port}`);
});

app.all('*', (req, res) => res.status(404).send({
    message: 'Oops! 404. Page not Found',
  }));
  
