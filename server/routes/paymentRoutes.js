
import express from 'express';
import PaymentController from '../controllers/payment'

const paymentRoute = express.Router();

// API route to verify users account number
paymentRoute.get(
  '/api/v1/verify',
  PaymentController.verifyPayment
);

// API route to create recipient
paymentRoute.post(
  '/api/v1/recepient',
  PaymentController.createRecepient
);


// API route to transfer funds
paymentRoute.post(
  '/api/v1/transferfunds',
  PaymentController.transfer
);

// API route to get list of banks
paymentRoute.get(
  '/api/v1/banks',
  PaymentController.getBanks
);

// API route to get list of transfers
paymentRoute.get(
  '/api/v1/transfer',
  PaymentController.getTransfers
);

export default paymentRoute;