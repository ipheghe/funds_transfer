import axios from 'axios';
import dotEnv from 'dotenv';
import {
  handleErrorMessage,
  handleSuccessMessage
} from '../utils/messageHandler';

dotEnv.config();

const headers = {
  headers: {
    Authorization: `Bearer ${process.env.testKey}`,
    'Content-Type': 'application/json'
  }
}

/**
 * @description Payment controller that houses different methods
 * 
 * @return {void} null
 */
export default class PaymentController {
    /**
     * @description Add a main/parent Location
     *
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @return {object} status message
     */
    static verifyPayment(req, res) {     
      const { number, code } = req.query;

      if (!number || !code) {
        return handleErrorMessage(res, 400, 'Invalid resource')
      
      }

      return axios.get(`${process.env.paystackUrl}/bank/resolve?account_number=${number}&bank_code=${code}`, headers)
      .then(response => {
        // handle success
        handleSuccessMessage(res, response.status, response.data.data, 'Account verified successfully!')
      })
        .catch(err => handleErrorMessage(res, 500, err));
    }

    /**
     * @description Get list of banks in Nigeria
     *
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @return {object} status message
     */
      static getBanks(req, res) {  
        const { country, perPage } = req.query;
        
        return axios.get(`${process.env.paystackUrl}/bank/?country=${country || 'nigeria'}&perPage=${perPage || 100}`, headers)
        .then(response => {
          // handle success
          handleSuccessMessage(res, response.status, response.data.data, 'Bank list fetched successfully!')
        })
          .catch(err => handleErrorMessage(res, 500, err));
      }

    static createRecepient(req, res) {     
      const { name, type, account_number,  bank_code, currency } = req.body;
      if (!name || !type || !account_number || !bank_code || !currency) {
        return handleErrorMessage(res, 400, 'Invalid resource')
      }
      return axios.post(`${process.env.paystackUrl}/transferrecipient`, req.body, headers)
      .then(response => {
        // handle success
        handleSuccessMessage(res, response.status, response.data.data, 'Account verified successfully!')
      })
        .catch(err => handleErrorMessage(res, 500, err));
    }

    static transfer(req, res) {    
      const { source, amount, recipient,  reason } = req.body;
      if (!source || !amount || !recipient) {
        return handleErrorMessage(res, 400, 'Invalid resource')
      }
      
      return axios.post(`${process.env.paystackUrl}/transfer`, req.body, headers)
      .then(response => {
        // handle success
        handleSuccessMessage(res, response.status, response.data.data, 'Account verified successfully!')
      })
        .catch(err => handleErrorMessage(res, 500, err));
    }
  }