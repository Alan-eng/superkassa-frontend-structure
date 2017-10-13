// import styled from 'styled-components';
import style from './Input.css';
import React from 'react';


class InputBonuses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            value: '50' //то что мы вводим в Input
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLabelStyle = this.handleLabelStyle.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleLabelStyle() { // метод добавляет инлайновые стили для заголовка поля Input
        let labelStyleOnFocus = { top: '8px', fontSize: '12px', color: '#01BDEA' }
        if (this.state.focused) {
            return labelStyleOnFocus
        } 
        if (this.state.value.length > 0) {
            return labelStyleOnFocus
        } else { return {} }
    }

    render() {
        let borderStyleOnFocus = { outline: '2px solid #01BDEA' }
        return (
            <div className={style.wrapperFixed}>
                <input className={style.styledInput} 
                type='text' style={this.state.focused ? borderStyleOnFocus : {}} 
                onFocus={(e) => this.setState({ focused: !this.state.focused })} 
                onBlur={(e) => this.setState({ focused: !this.state.focused })} 
                value={this.state.value} onChange={this.handleChange} />

                <label className={style.label}
                style={this.handleLabelStyle()} 
                onFocus={(e) => this.setState({ focused: !this.state.focused })} 
                onBlur={(e) => this.setState({ focused: !this.state.focused })}>{this.props.children}</label>
            </div>
        )
    }
}

export default InputBonuses 