import './App.css'
import React, {useState} from 'react';
import CustomerService from './services/Customer';
import CustomerUpdate from './CustomerUpdate';

const Message = ({message, isPositive}) => {

    let tyyli = "";

    if(isPositive === true) {
        tyyli ="positive";
    }
    else {
        tyyli = "negative";
    }

    return (
        <div className={tyyli}>
            {message}
        </div>
    )
}

export default Message;