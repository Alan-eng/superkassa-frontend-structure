import React from 'react';
// import superkassa from './superkassa.svg';
// import styled from 'styled-components';
import style from './PaymentLogo.css';

const superkassa = <svg width='35' height='18' viewBox='0 0 35 18' xmlns='http://www.w3.org/2000/svg'
xmlnsXlink='http://www.w3.org/1999/xlink'>
    <desc>Created using Figma</desc>
    <use xlinkHref='#superkassa1' fill='#2D9CDB' />
    <use xlinkHref='#superkassa2' transform='translate(18.46 .1)' fill='#FF2F52' />
    <defs>
        <path id='superkassa1' fillRule='evenodd' d='M3.733 17.564c-1.18-.29-2.148-.692-2.906-1.207-.293-.216-.504-.44-.633-.672-.13-.233-.194-.53-.194-.896 0-.5.155-.93.465-1.296.31-.365.672-.548 1.085-.548.224 0 .44.034.646.1.207.066.466.19.776.373.706.38 1.408.655 2.105.82.698.167 1.486.25 2.364.25 1.017 0 1.788-.146 2.313-.436.526-.29.788-.718.788-1.282.002-.382-.244-.71-.735-.983-.49-.275-1.425-.545-2.803-.81-1.705-.35-3.04-.764-4.005-1.245-.965-.482-1.64-1.05-2.028-1.706C.58 7.373.387 6.58.387 5.65c0-1.06.327-2.024.98-2.887.656-.863 1.556-1.54 2.7-2.03C5.215.246 6.503 0 7.933 0 9.19 0 10.31.133 11.29.398c.983.266 1.878.68 2.688 1.245.31.216.53.444.658.685.13.24.194.535.194.884 0 .497-.15.93-.452 1.294-.302.365-.66.548-1.072.548-.224 0-.43-.03-.62-.087-.19-.058-.457-.187-.8-.386-.088-.05-.333-.177-.738-.385-.405-.207-.878-.373-1.42-.498-.543-.124-1.134-.186-1.77-.186-.88 0-1.586.162-2.12.486-.533.324-.8.75-.8 1.282 0 .316.094.573.284.772.19.2.543.394 1.06.585.516.19 1.282.386 2.3.585 1.652.348 2.953.768 3.9 1.257.947.49 1.62 1.06 2.015 1.706.396.647.595 1.41.595 2.29 0 1.095-.32 2.063-.956 2.9-.638.84-1.53 1.486-2.674 1.942-1.146.457-2.477.685-3.992.685-1.378 0-2.657-.145-3.837-.436z'
        />
        <path id='superkassa2' fillRule='evenodd' d='M16.044 15.685c0 .548-.215 1.03-.646 1.444-.43.414-.94.62-1.524.62-.638 0-1.223-.264-1.757-.796l-7.363-7.27v5.876c0 .697-.216 1.25-.646 1.656-.43.407-1.017.61-1.757.61-.723 0-1.295-.203-1.717-.61C.21 16.81 0 16.256 0 15.56V2.24C0 1.56.21 1.018.633.61 1.055.204 1.627 0 2.35 0c.74 0 1.327.204 1.758.61.43.407.646.95.646 1.63V7.72l7.26-7.046C12.46.224 12.97 0 13.538 0c.568 0 1.068.204 1.498.61.43.407.646.884.646 1.432 0 .548-.25 1.054-.75 1.52L9.638 8.564l5.736 5.676c.447.416.67.897.67 1.445z'
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

const PaymentLogoSuperkassa = (props) => {
    return (
        <div className={props.checked ? style.containerChecked : style.container} checked={props.checked} onClick={() => props.handleChecked('superkassa')} >
            {superkassa}
        <div style={{marginTop: '20px'}}> Офисы Суперкассы </div>
        {props.checked === true ? <div style={{marginTop: '30px'}}>Сбор 350 Р</div> : ''}
    </div>
    )
}

export default PaymentLogoSuperkassa