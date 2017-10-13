// @flow

import React from 'react';
// import { type, Item } from './selectorTypes';
// import ArrowDown from './arrowdown.svg';
import Dropdown from './Dropdown';
import styles from './style.css';

const ArrowDown = <svg width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"
xmlnsXlink="http://www.w3.org/1999/xlink">
    <desc>Created using Figma</desc>
    <use xlinkHref="#ArrowDown" transform="matrix(-1 0 0 1 12 0)"
    fill="#003267" />
    <defs>
        <path id="ArrowDown" fillRule="evenodd" d="M11.334.794c-.396-.428-1.072-.428-1.468 0L6 4.974 2.134.793C1.738.366 1.062.366.666.794l-.038.04c-.354.384-.354.975 0 1.36L6 8l5.372-5.807c.354-.384.354-.975 0-1.36l-.038-.04z"
        />
    </defs>
</svg>

type Props = {
    label: string,
    items: Array<Item>,
    id: number,
    isDisabled: boolean,
    isDropdownVisible: boolean,
}

type State = {
    label?: string,
    items?: Array<Item>,
    id?: number,
    isDisabled?: boolean,
    isDropdownVisible?: boolean,
    text: string,
}


class Selector extends React.Component<void, Props, State> {

    constructor(props: Props) {
        super(props);
        let label = this.props.label ? this.props.label : 'Выберите';
        let id = this.props.id ? this.props.id : 0;
        let isDisabled = this.props.isDisabled ? this.props.isDisabled : false;
        let isDropdownVisible = this.props.isDropdownVisible ? this.props.isDropdownVisible : false;
        let items = this.props.items;
        let text = '-';
        if (!items) {
            label = 'Список';
            items = [{ id: 0, text: '###' }];
            id = 0;
            isDisabled = true;
            isDropdownVisible = false;
            id = -1; // @FIXME(2017-10-11|kaa): whats happen if no list
        } else {
            items.forEach(function (item) {
                if (item.id === id) {
                    text = item.text;
                }
            });
        }
        this.state = { label, text, isDisabled, isDropdownVisible, items, id };
        this.setId = this.setId.bind(this);
        this.dropdownTrigger = this.dropdownTrigger.bind(this);
        this.dropdownHide = this.dropdownHide.bind(this);
    }

    state: State;
    props: Props;

    dropdownTrigger: Function;
    dropdownTrigger() {
        this.setState({
            isDropdownVisible: !this.state.isDropdownVisible,
        });
    }

    dropdownHide: Function;
    dropdownHide(e) {
        if (this.state.isDropdownVisible) {
            this.setState({ isDropdownVisible: false });
            console.log('--==HIDE Dropdown==--');
        }
    }

    setId: Function;
    setId(id: number) {
        let newText = '###';
        this.state.items.forEach(function (item) {
            console.log(id, item);
            if (item.id.toString() === id.toString()) {
                newText = item.text;
            }
        });
        this.setState({
            id,
            text: newText,
            isDropdownVisible: false,
        });
    }

    render() {
        // console.log('isDropdownVisible:', this.state.isDropdownVisible);
        const { label, text, isDisabled, isDropdownVisible, items, id } = this.state;
        return (
            <div className={styles.selector}>
                <div className={isDisabled ? styles.disabledarrow : styles.arrow}>
                    <object data={ArrowDown} title="Select please!" />
                </div>
                <div className={styles.leftSide}>
                    <div className={styles.label}>
                        {label}
                    </div>
                    <div className={isDisabled ? styles.disabledtext : styles.text}>
                        {text}
                    </div>
                </div>
                <button
                    className={isDisabled ? styles.disabledcommand : styles.command}
                    onClick={this.dropdownTrigger}
                />
                {(!isDropdownVisible || isDisabled) ? null : (
                    <Dropdown
                        id={id}
                        items={items}
                        dropDownHide={this.dropDownHide}
                        setId={this.setId}
                    />
                )}
            </div>
        );
    }
}

export default Selector;
