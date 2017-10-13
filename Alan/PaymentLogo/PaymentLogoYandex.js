import React from 'react';
// import yandex from './yandexMoney.svg';
// import styled from 'styled-components';
import style from './PaymentLogo.css';

const yandexIcon = <svg width='36' height='48' viewBox='0 0 36 48' xmlns='http://www.w3.org/2000/svg'
xmlnsXlink='http://www.w3.org/1999/xlink'>
    <desc>Created using Figma</desc>
    <use xlinkHref='#yandexIcon1' fill='#FFCF01' />
    <use xlinkHref='#yandexIcon2' transform='translate(4.5 19.712)' fill='#D3AB07' />
    <use xlinkHref='#yandexIcon3' transform='translate(14.54 17.44)' />
    <defs>
        <path id='yandexIcon1' d='M0 23.726c0-2.737.18-4.38 5.76-8.578C10.26 11.68 24.84 0 24.84 0v19.71H36V48H3.42C1.44 48 0 46.357 0 44.532V23.726z'
        />
        <path id='yandexIcon2' d='M20.34 0v11.316L0 25.37l25.74-8.397V0h-5.4z' />
        <path id='yandexIcon3' d='M.936 1.54C2.196.08 3.816-.465 4.896.447c1.08.913.72 2.555-.36 4.015-1.26 1.46-2.88 2.01-3.96 1.096-.9-.73-.72-2.555.36-4.015z'
        />
    </defs>
</svg>


// const Container = styled.div` 
// padding-top: 18px;
// fontSize: 16px;
// color: #254A78;
// width: 128px;
// height: 128px;
// background-color: rgba(255, 255, 255, 0.4);
// background: ${props => props.checked === true ? 'white' : '#EDF6FB'};
// border: ${props => props.checked === true ? '2px solid #79D3FC' : '2px solid #CFEDF8'} ;
// box-sizing: border-box;
// border-radius: 4px;
// cursor: pointer;
// `;

const PaymentLogoBankCard = (props) => {
    return (
    <div className={props.checked ? style.containerChecked : style.container} checked={props.checked} onClick={() => props.handleChecked('yandexMoney')} >
        {yandexIcon}
        <div style={{marginTop: '20px'}}> Яндекс Деньги </div>
        {props.checked === true ? <div style={{marginTop: '30px'}}>Сбор 250 Р</div> : ''}
    </div>
    )
}

export default PaymentLogoBankCard