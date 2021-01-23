import React, { useState, useEffect } from 'react';

// components
import Table from '../../components/Table';
import ViewPayment from '../ViewPayment';

// interface
import { IPaymentProps } from './payments';

// actions 
import { getTransfers } from '../../actions/paymentActions';

const configuration = {
  serial: {
    alias: '#',
    width: 'table-col-20',
  },
  id: { alias: 'id' },
  amount: { alias: 'Amount' },
  name: { alias: 'Full Name' },
  bank: { alias: 'Bank' },
  formattedDate: { alias: 'Date' },    
};



function Payments (props: IPaymentProps) {
  const [selected, setSelected] = useState(null);
  const [transfers, setTransfers] =  useState([]);

  useEffect(() => {
    getBankTransfers();
  }, []);

  const getBankTransfers = async () => {
    await getTransfers().then((res: any) => setTransfers(res.data.data))
      .catch(() => props.showMessage('Something went wrong, please try again!', 'error'));
  }

  if (!transfers.length) {
    return (
      <h1>No Records Yet!</h1>
    )
  }
    // returns JSX element
    return (
      <>
        {selected ? (
          <ViewPayment details={selected} />
        ) : (
          <div className="payments__container">
              <Table
                data={transfers}
                config={configuration}
                headers={Object.keys(configuration)}
                onClick={setSelected}
              />
          </div>
        )}
      </>
    )
}

export default Payments;