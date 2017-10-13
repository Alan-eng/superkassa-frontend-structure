// @flow

import React from 'react';
import { type Item } from '../selectorTypes';
import styles from './style.css';

type Props = {
    id: number,
    items: Array<Item>,
    setId: Function,
    dropdownHide: Function,
}

type State = {
}

class Dropdown extends React.Component<void, Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
        };
        this.onClick = this.onClick.bind(this);
        this.blur = this.blur.bind(this);
    }

    state: State;
    props: Props;

    onClick: Function;
    onClick(e) {
        this.props.setId(e.target.tabIndex);
    }

    blur: Function;
    blur() {
        this.props.dropdownHide();
    }

    render() {
        if (!this.props.items) {
            return null;
        }

        return (
            <ul
                className={styles.root}
                onBlur={this.blur}
            >
                {this.props.items.map((item) => (
                    <li
                        key={`li${item.id}`}
                        className={styles.item}
                        onClick={this.onClick}
                        tabIndex={item.id}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        );
    }

}

export default Dropdown;
