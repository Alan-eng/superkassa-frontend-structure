import React, { Component } from 'react';
// import './App.css';
// import styled from 'styled-components';
import style from './index.css';

// import Selector from './Selector'

import ContactInfoRow from './ContactInfoRow/ContactInfoRow';
import PassportDataRow from './PassportDataRow/PassportDataRow';
import TransferFromRow from './TransferFromRow/TransferFromRow';
import InsuarenceRow from './InsuarenceRow/InsuarenceRow';
import PaymentRow from './PaymentRow/PaymentRow';

// контейнер-центровщик
// const ContainerCenter = styled.section` 
// width: 1024px;
// margin: auto;
// `;

class OrderInfo extends Component {
  render() {
    return (
      <div style={{backgroundColor: '#DFF0F9'}}>
        <section className={style.containerCenter}>
          <ContactInfoRow />
          <PassportDataRow />
          <TransferFromRow />
          <InsuarenceRow />
          <PaymentRow />
        </section>
      </div>
    );
  }
}

export default OrderInfo;
