import style from './Input.css';
import React from 'react';

class DocumentNumber extends React.Component {
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
                    onFocus={e => this.setState({ focused: !this.state.focused })}
                    onBlur={e => this.setState({ focused: !this.state.focused })}
                    value={this.state.value}
                    onChange={this.handleChange}
                />

                <label
                    className={style.label}
                    style={this.handleLabelStyle()}
                    onFocus={e => this.setState({ focused: !this.state.focused })}
                    onBlur={e => this.setState({ focused: !this.state.focused })}
                >{this.props.children}</label>
            </div>
        );
    }
}

export default DocumentNumber;
