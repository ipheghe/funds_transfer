import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Toast from './components/Toast';
import Dashboard from './Pages/Dashboard';
import FundsTransfer from './Pages/FundsTransfer';
import Payments from './Pages/Payments';
import SideNav from './components/SideNav';
import { getBanks, transferFunds } from './actions/paymentActions';

import './App.css';

function App(props: any) {

  const [transfers, setTransfers] = useState<Array<{}>>([]);
  const [banks, setBanks] = useState<Array<{}>>([]);
  const [message, setMessage] = useState('');
  const [className, setClassName] = useState('');

  useEffect( () => {

    getList();
  }, [])

  const getList = async () => {
    const response = await getBanks();
    if (response.data.status === 'Success') {
    
      setBanks(response.data.data)
    }
    return response;
  }

  const handleSubmit = async (payload: any): Promise<any> => {
    await transferFunds(payload)
    .then((response: any) => {
      if (response?.data?.status === 'Success') {
        const findBank: any = banks.find((item:any)=> item.code === payload.selectedBank);
        const newDate = new Date(response.data.data.createdAt).toDateString();
        const newTransfers = [...transfers, { ...response.data.data, name: payload.fullName, bank: findBank.name, formattedDate: newDate }];
        setTransfers(newTransfers);
        showMessage('Funds Transfered Successfully', 'success')
      } 
    }).catch(() => showMessage('Something went wrong, please try again!', 'error'));

  }

  /**
   * This method shows toast message
   *
   * @param {string} message - message
   * @param {string} className - className
   * @return {void}  null
   */
  const showMessage = (message: string, className: string) => {
    setMessage(message);
    setClassName(className);
    hideMessage();
  };

  /**
   * This method hides toast message
   *
   * @return {void}  null
   */
  const hideMessage = () => {
    setTimeout(() => {
      setMessage('');
      setClassName('');
    }, 3000);
  };


  // returns JSX element
  return (
    <Router>
      <div className="App">
        <SideNav />
        <div style={{ width: '100%' }}>
          {message && <Toast message={message} className={className} />}
          <Switch>
          <Route
              path="/transfer"
              render={props => (
                <FundsTransfer
                  {...props}
                  banks={banks}
                  handleSubmit={handleSubmit}
                  showMessage={showMessage}
                />
              )}
            />
            <Route
              path="/payments"
              render={props => (
                <Payments
                  {...props}
                  transfers={transfers}
                />
              )}
            />
            <Route  exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
