import React from 'react';
// import webmoney from './webmoney.svg';
// import styled from 'styled-components';
import style from './PaymentLogo.css';


const webmoneyIcon = <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'
xmlnsXlink='http://www.w3.org/1999/xlink'>
    <desc>Created using Figma</desc>
    <use xlinkHref='#webmoneyIcon1' fill='#0073B8' />
    <use xlinkHref='#webmoneyIcon2' transform='translate(16.18 14.592)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon3' transform='translate(19.56 22.768)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon4' transform='translate(12.79 6.415)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon5' transform='translate(21.44 5.157)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon6' transform='translate(27.84 19.874)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon7' transform='translate(30.97 27.17)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon8' transform='translate(32.35 11.698)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon9' transform='translate(29.34 4.528)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon10' transform='translate(35.49 18.742)' fill='#0073B8'
    />
    <use xlinkHref='#webmoneyIcon11' transform='translate(24.83 12.327)' fill='#0073B8'
    />
    <defs>
        <path id='webmoneyIcon1' fillRule='evenodd' d='M19.813 0c3.134 0 6.144.755 8.777 2.013.376.25.877.377 1.254.63l-1.88 1.634-2.76-2.893-4.64 4.15-2.758-3.018-8.65 7.8 5.516 6.162-2.132 1.887 5.517 6.163-2.13 1.887 7.898 8.805 4.64-4.277 4.012 4.654c-.753.63-1.63 1.258-2.633 1.76-2.884 1.637-6.27 2.643-9.906 2.643C8.904 40 0 30.943 0 20-.123 9.057 8.78 0 19.814 0z'
        />
        <path id='webmoneyIcon2' fillRule='evenodd' d='M0 4.277L4.765 0l4.263 4.78-4.765 4.277L0 4.277z'
        />
        <path id='webmoneyIcon3' fillRule='evenodd' d='M0 4.277L4.765 0l4.263 4.78-4.765 4.277L0 4.277z'
        />
        <path id='webmoneyIcon4' fillRule='evenodd' d='M0 4.277L4.765 0l4.263 4.78-4.765 4.277L0 4.277z'
        />
        <path id='webmoneyIcon5' fillRule='evenodd' d='M0 3.27L3.636 0 6.77 3.648 3.26 6.792 0 3.27z'
        />
        <path id='webmoneyIcon6' fillRule='evenodd' d='M0 3.27L3.51 0l3.26 3.648-3.51 3.144L0 3.27z'
        />
        <path id='webmoneyIcon7' fillRule='evenodd' d='M0 3.145L3.51 0l3.26 3.522-3.51 3.27L0 3.145z'
        />
        <path id='webmoneyIcon8' fillRule='evenodd' d='M0 2.138L2.382 0l2.132 2.39-2.257 2.138L0 2.138z'
        />
        <path id='webmoneyIcon9' fillRule='evenodd' d='M0 2.138L2.382 0l2.132 2.39-2.382 2.138L0 2.138z'
        />
        <path id='webmoneyIcon10' fillRule='evenodd' d='M0 2.138L2.382 0l2.132 2.39-2.382 2.138L0 2.138z'
        />
        <path id='webmoneyIcon11' fillRule='evenodd' d='M0 3.27L3.51 0l3.26 3.648-3.635 3.144L0 3.27z'
        />
    </defs>
</svg>

// const Container = styled.div` 
// padding-top: 28px;
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


const PaymentLogoWebmoney = (props) => {
    return (
        <div className={props.checked ? style.containerChecked : style.container} checked={props.checked} onClick={() => props.handleChecked('webMoney')} >
            {webmoneyIcon}
        {/* <object type="image/svg+xml" data={webmoney} style={style.iconStyle}>Your browser does not support SVGs</object> */}
        <div style={{marginTop: '20px'}}> Webmoney </div>
        {props.checked === true ? <div style={{marginTop: '30px'}}>Сбор 350 Р</div> : ''}
    </div>
    )
}

export default PaymentLogoWebmoney