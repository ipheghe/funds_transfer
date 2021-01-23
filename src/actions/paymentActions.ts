import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://ovie-payment.herokuapp.com';

export const getBanks = async () => {
    return await axios.get(`${apiUrl}/api/v1/banks`);
};

export const verifyAccount = async ({ number, code}: any) => {
    return await axios.get(`${apiUrl}/api/v1/verify?number=${number}&code=${code}`);
};

export const getTransfers = async () => {
    return await axios.get(`${apiUrl}/api/v1/transfer`);
};

export const transferFunds = async (payload: any) => {
    const data = {
        type: 'nuban',
        name : payload.fullName,
        "account_number": payload.accountNumber,
        "bank_code": payload.selectedBank,
        "currency": "NGN"
    }

    const response = await axios.post(`${apiUrl}/api/v1/recepient`, data);
    if (response.data.status === 'Success') {
        const data2 = {
            source: "balance",
            amount: payload.amount,
            recipient: response.data.data.recipient_code,
            reason: "For Flex"
          }
        return await axios.post(`${apiUrl}/api/v1/transferfunds`, data2);
    } else {
        return {
            data: {
                data: {
                    message: 'Recipient not available'
                }
            }
        }
    }
};

