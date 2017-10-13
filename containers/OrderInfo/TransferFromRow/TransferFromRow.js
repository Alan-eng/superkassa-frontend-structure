import React from 'react';
// import styled from 'styled-components';

import Checkbox from '../../../components/Alan/Checkbox/Checkbox';
import Input from '../../../components/Alan/InputFields/PresentationalComponent/Input';
import Selector from '../../../components/Alan/Selector/index';
import ArrivalTable from '../../../components/Alan/InputFields/ArrivalTable';

import style from './TransferFromRow.css'

//styled - это полноценный компонент Реакта, и у него вызываем функцию button с помощью синтаксиса шаблонной строки, тоже самое, что при мпомощи скобок, только после вызова строка преобразуется к массиву
// когда устанавилваем primary property - добавляем еще немного CSS
//все вендорные префиксы будут выставлены автоматически, так что не нужно даже о них думать

const IconCar = () => {
    return (
        <svg width='21' height='18' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'>
            <desc>Created using Figma</desc>
            <use xlinkHref='#IconCar' fill='#003267' />
            <use xlinkHref='#IconCar' fill='#01BDEA' fillOpacity='.24' />
            <defs>
                <path id='IconCar' d='M2.286 6.75L4 1.687h12.57l1.716 5.063h-16zm14.285 5.625c-.453 0-.89-.178-1.21-.494-.322-.316-.503-.745-.503-1.193 0-.447.18-.876.502-1.193.32-.316.757-.494 1.21-.494.456 0 .892.178 1.214.494.32.317.502.746.502 1.194 0 .447-.18.876-.502 1.193-.322.317-.758.495-1.213.495zm-12.57 0c-.455 0-.89-.178-1.212-.494-.322-.316-.502-.745-.502-1.193 0-.447.18-.876.502-1.193C3.108 9.178 3.545 9 4 9c.455 0 .89.178 1.212.494.322.317.502.746.502 1.194 0 .447-.18.876-.502 1.193-.32.317-.757.495-1.212.495zm14.194-11.25C17.966.472 17.326 0 16.57 0H4c-.754 0-1.394.472-1.623 1.125L0 7.875v9c0 .298.12.584.335.796.214.21.505.33.808.33h1.143c.303 0 .594-.12.808-.33.214-.21.335-.497.335-.795V15.75h13.713v1.125c0 .298.12.584.335.796.214.21.505.33.808.33h1.143c.302 0 .592-.12.807-.33.214-.21.334-.497.334-.795v-9l-2.376-6.75z'
                />
            </defs>
        </svg>)
}

// ---------------------------------------------------

// const Label = styled.div`  
// margin-left: 1em;
// `;


// const Wrapper = styled.section`
// border-radius: 3px;
// padding-left: 32px;
// padding-right: 32px;
// background-color: #B1E4F6;
// margin-bottom: 8px;
// box-sizing:border-box;
// `

// const ContainerFlex = styled.div`
// display: flex;
// justify-content: space-between;
// padding-bottom: 14px;
// padding-top: 14px;
// color: #1A5488;
// cursor: pointer;
// `

// const Container = styled.div`
// border: 4px;
// max-height: 0px;
// overflow: hidden;
// transition: max-height 0.5s cubic-bezier(.525,.66,.495,1.4);  
// color: #1A5488;
// `

// const ContainerFlexMargin = styled.div`
// width: 100%;
// margin-bottom: 8px;
// display: flex;
// justify-content: space-between;;
// &:first-child {
//     margin-top: 10px;
// }
// &:last-child {
//     padding-bottom: 16px;
// }
// `


class TransferFromRow extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true
        }
    }


    render() {
        return (<div>
            <section className={style.wrapper}>
                <div className={style.containerFlex} onClick={(e) => this.setState({ collapsed: !this.state.collapsed })}>
                    <div style={{ display: 'flex' }}>
                        <IconCar />
                        <div className={style.label}>Добавить трансфер в Джон Ф.Кеннеди 1 октября</div>
                    </div>
                    <Checkbox />
                </div>
                <div className={style.container} style={this.state.collapsed ? {} : { maxHeight: '260px' }}>
                    <div className={style.containerFlexMargin}>
                        <Selector />
                        {/* <Input> Адрес назначения </Input>
                        <Input> Примечания </Input> */}
                    </div>
                    <div className={style.containerFlexMargin}>
                        <Input> Время подачи </Input>
                        <ArrivalTable> Надпись на табличке для встречи </ArrivalTable>
                        <Input> Адрес назначения </Input>
                        <Input> Примечания </Input>
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default TransferFromRow