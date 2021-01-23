import React, { useEffect, useState } from 'react';

// components
import Input from '../../components/Input';
import Loader from '../../components/Loader';

// actions 
import { verifyAccount, transferFunds } from '../../actions/paymentActions';

// interface
import { ITransferProps } from './fundsTransfer';

// styles
import './fundsTransfer.scss';

function FundsTransfer (props: ITransferProps) {
    const [values, setValues] = useState({
        amount: 100,
        accountNumber: '',
        fullName: '',
    })
    const [selectedBank, setSelectedBank] = useState('select');
    const [isButtonDisabled, setButtonDisability] = useState(true);
    const [showVerifyButton, setVerifyButtonVisibility] =  useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingTransfer, setLoadingTransfer] = useState(false);

    useEffect(() => {
        if (values.accountNumber && selectedBank !== 'select' && !showVerifyButton) {
            setVerifyButtonVisibility(true);
        }

        if (showVerifyButton && (!values.accountNumber || selectedBank === 'select')) {
            setVerifyButtonVisibility(false);
            setButtonDisability(true);
        }
    }, [values.accountNumber, selectedBank, showVerifyButton])



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        event.preventDefault();
        setSelectedBank(event.target.value);
    }

    const handleClick = async () => {
        setLoadingVerify(true);
        await verifyAccount({ number: values.accountNumber, code: selectedBank })
        .then((res: any) => {
            props.showMessage('Account Verified Successfully', 'success')
            setButtonDisability(false);
            setValues(prev => ({
                ...prev,
                fullName: res.data.data['account_name']
            }))
            setLoadingVerify(false);
        })
        .catch(() =>  {
            props.showMessage('Something went wrong, please try again!', 'error');
            setLoadingVerify(false);
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingTransfer(true);
        if (values.amount < 100 || values.amount > 10000000) {
            props.showMessage('Amount must be greater than or equal to 100 or less than or equal to 10000000!', 'error');
            setLoadingTransfer(false);
        } else {
            await transferFunds({ ...values, selectedBank })
            .then(() => { 
                props.showMessage('Funds Transfered Successfully', 'success');
                setLoadingTransfer(false);

            })
              .catch(() => {
                  props.showMessage('Something went wrong, please try again!', 'error');
                  setLoadingTransfer(false);
            });
        }
    }

    // returns JSX element
    return (
        <div className="funds__container">
            <form onSubmit={handleSubmit} className="funds__form">
                <h3> Funds Transfer</h3>
                <Input
                    name="fullName"
                    type="text"
                    onChange={handleChange}
                    value={values.fullName}
                    placeholder="Full Name"
                    disabled
                />
                <Input
                    name="accountNumber"
                    type="text"
                    onChange={handleChange}
                    value={values.accountNumber}
                    placeholder="Enter Account Number"
                />
                <select value={selectedBank} onChange={handleSelectChange}>
                    <option value="select">Select Bank</option>
                    {props.banks.map((item:any) => (
                        <option value={item.code} key={item.code}>{item.name}</option>
                    ))}
                </select>
                {showVerifyButton && (
                    <button type="button" onClick={handleClick} className="btn-small">
                        { loadingVerify ? <Loader /> : 'Verify Account' }   
                    </button>
                )}
                <Input
                    name="amount"
                    type="number"
                    onChange={handleChange}
                    value={values.amount}
                    placeholder="Enter Amount"
                />
                <button type="submit" disabled={isButtonDisabled || !values.fullName}>
                    { loadingTransfer ? <Loader /> : ' Make Payment' }       
                </button>
            </form>
        </div>
    )
}

export default FundsTransfer;