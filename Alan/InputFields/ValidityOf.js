// import styled from 'styled-components';
import React from 'react';
import style from './Input.css';

// const Wrapper = styled.div`
// position: relative;
// flex: 1;
// border-radius: 0 0 3px 0;
// background: #FFFFFF;
// margin-left: 2px;
// `
// const StyledInput = styled.input`
// height: 64px;
// box-sizing: border-box;
// width: 100%;
// border: none;
// font-size: 16px;
// color: #0F3166;
// padding-left: 10px;
// padding-top: 15px;
// position: relative;
// background: none;
// z-index: 1;
// `
// const Label = styled.label`
// color: #9BADC2;
// position: absolute;
// top: 36px;
// left: 10px;
// transition: all .2s ease-out;
// `


class ValidityOf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            value: '', // то что мы вводим в Input
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLabelStyle = this.handleLabelStyle.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleLabelStyle() { // метод добавляет инлайновые стили для заголовка поля Input
        const labelStyleOnFocus = { top: '8px', fontSize: '12px', color: '#01BDEA' };
        if (this.state.focused) {
            return labelStyleOnFocus;
        }
        if (this.state.value.length > 0) {
            return labelStyleOnFocus;
        } return {};
    }

    render() {
        const borderStyleOnFocus = { outline: '2px solid #01BDEA' };
        return (
            <div className={style.wrapper}>
                <input
                    className={style.styledInput}
                    type="text"
                    style={this.state.focused ? borderStyleOnFocus : {}}
                    onFocus={() => this.setState({ focused: !this.state.focused })}
                    onBlur={() => this.setState({ focused: !this.state.focused })}
                    value={this.state.value}
                    onChange={this.handleChange}
                />

                <label
                    className={style.label}
                    style={this.handleLabelStyle()}
                    onFocus={() => this.setState({ focused: !this.state.focused })}
                    onBlur={() => this.setState({ focused: !this.state.focused })}
                >{this.props.children}</label>
            </div>
        );
    }
}

export default ValidityOf;
