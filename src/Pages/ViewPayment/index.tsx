import React from 'react';

// interface
import { IViewTransferProps } from './viewPayment';

// styles
import './viewPayment.scss';

function ViewPayment (props: IViewTransferProps) {
    const { name, amount, bank, formattedDate } = props.details;

    // returns JSX element
    return (
        <div className="view__container">
            <div className="view__subcontainer">
                <h3>Transaction Details</h3>
                <div className="div-block">
                    <p className="view-text bold">Beneficiary Name: </p>
                    <p className="view-text">{name}</p>
                </div>
                <div className="div-block">
                    <p className="view-text bold">Amount Transfered: </p>
                    <p className="view-text">{amount}</p>
                </div>
                <div className="div-block">
                    <p className="view-text bold">Beneficiary Bank: </p>
                    <p className="view-text">{bank}</p>
                </div>
                <div className="div-block">
                    <p className="view-text bold">Transaction Date: </p>
                    <p className="view-text">{formattedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewPayment;