import React from 'react';

// interface
import { IInputProps } from './input';

// styles
import './input.scss';

function Input (props: IInputProps) {
    const { name, type, onChange, value, className, placeholder } = props;

    // returns JSX element
    return (
        <input
            {...props}
            className={`input__item ${className}`}
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    )
}

export default Input;