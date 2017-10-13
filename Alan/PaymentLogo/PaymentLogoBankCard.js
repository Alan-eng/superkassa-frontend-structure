import React from 'react';
// import bankCard from './bankCard.svg';
// import styled from 'styled-components';
import style from './PaymentLogo.css';

const bankCardIcon = <svg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'
xmlnsXlink='http://www.w3.org/1999/xlink'>
    <desc>Created using Figma</desc>
    <use xlinkHref='#bankCardIcon1' fill='#003267' />
    <use xlinkHref='#bankCardIcon2' transform='translate(28 23)' fill='#01BDEA' />
    <use xlinkHref='#bankCardIcon2' transform='translate(31 23)' fill='#E75300' />
    <defs>
        <path id='bankCardIcon1' fillRule='evenodd' d='M0 4c0-2.21 1.79-4 4-4h32c2.21 0 4 1.79 4 4v24c0 2.21-1.79 4-4 4H4c-2.21 0-4-1.79-4-4V4zm4-2h32c1.105 0 2 .895 2 2v5H2V4c0-1.105.896-2 2-2zM2 14v14c0 1.105.896 2 2 2h32c1.105 0 2-.895 2-2V14H2z'
        />
        <path id='bankCardIcon2' d='M4 2c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z'
        />
    </defs>
</svg>

// const Container = styled.div` 
// padding-top: 26px;
// fontSize: 16px;
// width: 128px;
// height: 128px;
// color: #254A78;
// background-color: rgba(255, 255, 255, 0.4);
// background: ${props => props.checked === true ? 'white' : '#EDF6FB'};
// border: ${props => props.checked === true ? '2px solid #79D3FC' : '2px solid #CFEDF8'} ;
// box-sizing: border-box;
// border-radius: 4px;
// cursor: pointer;
// `;

// class PaymentLogoBankCard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             checked: this.props.checked,
//         }
//         // this.handleChange = this.handleChange.bind(this);
//         // this.handleLabelStyle = this.handleLabelStyle.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ value: event.target.value });
//     }

//     render() {
//         return (
//             <div className={props.checked ? style.containerChecked : style.container} checked={this.props.checked} onClick={() => props.handleChecked('bankCard')} >
//                 {bankCardIcon}
//             {/* <object type="image/svg+xml" data={bankCard} style={style.iconStyle}>Your browser does not support SVGs</object> */}
//             <div style={{marginTop: '20px'}}> Банковская карта </div>
//             </div>
//         )
//     }
//  }



 const PaymentLogoBankCard = (props) => {
    return (
        <div className={props.checked ? style.containerChecked : style.container} checked={props.checked} onClick={() => props.handleChecked('bankCard')} >
            {bankCardIcon}
        {/* <object type="image/svg+xml" data={euroset}>Your browser does not support SVGs</object> */}
        <div style={{marginTop: '20px'}}> Банковская карта </div>
    </div>
    )
}



export default PaymentLogoBankCard