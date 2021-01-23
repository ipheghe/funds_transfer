import React, { useState } from 'react';

// components
import Table from '../../components/Table';
import ViewPayment from '../ViewPayment';

// interface
import { IPaymentProps } from './payments';

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

  if (!props.transfers.length) {
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
                data={props.transfers}
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