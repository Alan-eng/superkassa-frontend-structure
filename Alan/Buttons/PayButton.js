import style from './PayButton.css';
import React from 'react';

const PayButton = (props) => {
 return <button className={style.payButton}>{props.children}</button>
}

export default PayButton