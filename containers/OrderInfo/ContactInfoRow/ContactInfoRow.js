import React from 'react';
// import styled from 'styled-components';
import InputEmail from '../../../components/Alan/InputFields/InputEmail';
import InputTelephone from '../../../components/Alan/InputFields/InputTelephone';
import styles from './ContactInfoRow.css';

// const Wrapper = styled.section`
// padding-left: 32px;
// padding-right: 32px;
// padding-top: 42px;
// `
// const FlexContainer = styled.section`
// justify-content: space-between;
// display: flex;
// flex-wrap: wrap;
// align-items: center;
// `;

// const Title = styled.h1` 
// margin: 0;
// margin-bottom: 20px;
// font-weight: 300;
// text-align: left;
// font-size: 28px;
// color: #003267;
// `;

// const Note = styled.div` 
// flex: 1;
// color: #003267;
// font-size: 14px;
// text-align: left;
// margin-left: 20px;
// `;



const ContactInfoRow = () => {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Контактная информация для заказа</h1>
            <section className={styles.flexContainer}>
                <InputEmail> E-mail </InputEmail>
                <InputTelephone> Телефон </InputTelephone>
                <div className={styles.note}> На e-mail мы высылаем маршрутную квитанцию. По телефону информируем о возможных изменениях в расписании рейсов.  </div>
            </section>
        </section>)
}

export default ContactInfoRow;