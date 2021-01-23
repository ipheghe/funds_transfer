import express from 'express';
import cors from 'cors';
import path from 'path'
import open from 'open';
import winston from 'winston';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import paymentRoute from './server/routes/paymentRoutes';

dotEnv.config();
const apiUrl = process.env.NODE_ENV === 'development' ? `http://localhost:${port}` : 'https://ovie-payment.herokuapp.com';

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/build/'));
// app.get('*', (req, res) => res
//   .sendFile(path.join( __dirname, './build/index.html')));

app.use(paymentRoute);

app.listen(port, err => {
  err ? winston.log(err) : open(apiUrl);
});

app.all('*', (req, res) => res.status(404).send({
    message: 'Oops! 404. Page not Found',
  }));
  
