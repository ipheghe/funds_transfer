import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// components
import Toast from './components/Toast';
import Dashboard from './Pages/Dashboard';
import FundsTransfer from './Pages/FundsTransfer';
import Payments from './Pages/Payments';
import SideNav from './components/SideNav';

// actions
import { getBanks } from './actions/paymentActions';

//interface
import { IBanks } from './Pages/FundsTransfer/fundsTransfer';

import './App.css';

function App() {

  const [banks, setBanks] = useState<Array<IBanks>>([]);
  const [message, setMessage] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    getBankList();
  },[])

  const getBankList = async () => {
    await getBanks().then((response) => setBanks(response.data.data))
      .catch(() => showMessage('Error fetching bank list!', 'error'));
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
        <div className="app__subcontainer" style={{ width: '100%' }}>
          {message && <Toast message={message} className={className} />}
          <Switch>
          <Route
              path="/transfer"
              render={props => (
                <FundsTransfer
                  {...props}
                  banks={banks}
                  showMessage={showMessage}
                />
              )}
            />
            <Route
              path="/payments"
              render={props => (
                <Payments
                  {...props}
                  showMessage={showMessage}
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
