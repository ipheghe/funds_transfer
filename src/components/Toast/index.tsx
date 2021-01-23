// react lib imports
import React from 'react';

// styles
import './Toast.scss';

import { IToastState } from './toast';

/**
 * This renders the Toast component
 
 * @returns {JSX} JSX
 */
export const Toast = ({ message, className }: IToastState) => (
  <>
    {message && (
      <div className={`toast__container ${className}`}>
        <p>{message}</p>
      </div>
    )}
  </>
);

export default Toast;