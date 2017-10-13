import React from 'react';
import style from './Checkbox.css';

//styled - это полноценный компонент Реакта, и у него вызываем функцию button с помощью синтаксиса шаблонной строки, тоже самое, что при мпомощи скобок, только после вызова строка преобразуется к массиву
// когда устанавилваем primary property - добавляем еще немного CSS
//все вендорные префиксы будут выставлены автоматически, так что не нужно даже о них думать

const CheckedCheckboxSVG = <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"
xmlnsXlink="http://www.w3.org/1999/xlink">
    <desc>Created using Figma</desc>
    <g transform="translate(4749 848)">
        <path fill="#05213F" d="M-4749-848h18v18h-18z" />
        <clippath id="a" clipRule="evenodd">
            <path d="M-5665-1370h1024V452h-1024v-1822z" fill="#FFF" />
        </clippath>
        <g clipPath="url(#a)">
            <path d="M-5665-1370h1024V452h-1024v-1822z" fill="#DFF0F9" />
            <use xlinkHref="#b" transform="matrix(1 0 0 -1 -5657 -646)" fill="#01BDEA"
            fillOpacity=".08" />
            <use xlinkHref="#c" transform="translate(-4749 -848)" fill="#2CBBEC" />
            <use xlinkHref="#d" transform="matrix(-1 0 0 1 -4736 -841)" fill="#FFF"
            />
        </g>
    </g>
    <defs>
        <path id="b" d="M0 2C0 .895.895 0 2 0h1004c1.1 0 2 .895 2 2v212c0 1.105-.9 2-2 2H2c-1.105 0-2-.895-2-2V2z"
        />
        <path id="c" fillRule="evenodd" d="M0 1c0-.552.448-1 1-1h16c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V1z"
        />
        <path id="d" d="M1.06-1.06c-.585-.586-1.535-.586-2.12 0-.586.585-.586 1.535 0 2.12l2.12-2.12zM5 5L3.94 6.06c.585.586 1.535.586 2.12 0L5 5zm4.06-1.94c.586-.585.586-1.535 0-2.12-.585-.586-1.535-.586-2.12 0l2.12 2.12zm-10.12-2l5 5 2.12-2.12-5-5-2.12 2.12zm7.12 5l3-3L6.94.94l-3 3 2.12 2.12z"
        />
    </defs>
</svg>

// ---------------------------------------------------


class Checkbox extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false
        }
    }

    render() {
        return (
            <div className={style.label}
            onClick={(e) => this.setState({ checked: !this.state.checked })}>
                {/* <input type='checkbox' style={{ display: 'none' }}></input> */}
            {this.state.checked ? <span classname={style.emptyCheckbox}/> : CheckedCheckboxSVG}
            <span style={{marginLeft: '10px'}}>360 P</span>
            </div>
        )
    }
}

export default Checkbox