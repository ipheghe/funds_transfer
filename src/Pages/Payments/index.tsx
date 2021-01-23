import React, { useState, useEffect } from 'react';

// components
import Table from '../../components/Table';
import ViewPayment from '../ViewPayment';
import Loader from '../../components/Loader';

// interface
import { IPaymentProps } from './payments';
import { IDetails } from '../ViewPayment/viewPayment';

// actions 
import { getTransfers } from '../../actions/paymentActions';

const configuration = {
  serial: {
    alias: '#',
    width: 'table-col-20',
  },
  id: { alias: 'id' },
  amount: { alias: 'Amount(NGN)' },
  name: { alias: 'Full Name' },
  bank: { alias: 'Bank' },
  formattedDate: { alias: 'Date' },    
};



function Payments (props: IPaymentProps) {
  const [selected, setSelected] = useState<IDetails>({
    name: "",
    amount: 0,
    bank: '',
    formattedDate: ''
  });
  const [transfers, setTransfers] =  useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBankTransfers();
  }, []);

  const getBankTransfers = async () => {
    setIsLoading(true);
    await getTransfers().then((res: any) => {
      setTransfers(res.data.data);
      setIsLoading(false);
    })
      .catch(() => {
        props.showMessage('Something went wrong, please try again!', 'error');
        setIsLoading(false);
      });

  }

  if (!transfers.length && !isLoading) {
    return (
      <h1>No Records Yet!</h1>
    )
  }
    // returns JSX element
    return (
      <>
        {selected.name ? (
          <ViewPayment details={selected} />
        ) : (
          <div className="payments__container">
            {isLoading ? <Loader /> : (
              <Table
                data={transfers}
                config={configuration}
                headers={Object.keys(configuration)}
                onClick={setSelected}
              />
            )}
          </div>
        )}
      </>
    )
}

export default Payments;