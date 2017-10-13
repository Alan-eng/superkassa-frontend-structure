// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.css';

type Props = {
    graphHeight: number,
    graphFillHeight: number,
    calYear: number,
    calMonth: number,
    calDay: number,
    price: number,
    weekDay: number,
    segmentNumber: number,
    selectDate: Function,
};

class Day extends React.Component<void, Props, void> {

    constructor(props: Props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick: Function;
    onClick() {
        const assignedDate = new Date(
            this.props.calYear,
            this.props.calMonth - 1,
            this.props.calDay,
        );
        const segmentNumber = this.props.segmentNumber;
        return this.props.selectDate(assignedDate, segmentNumber);
    }

    props: Props;

    render() {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className={styles.day} onClick={this.onClick}>
                <div className={styles.graph} style={{ height: `${this.props.graphHeight}px` }}>
                    <div className={styles.graphMix}>
                        <div className={styles.graphText}>
                            {this.props.price}
                        </div>
                        <div className={styles.graphFill} style={{ height: `${this.props.graphFillHeight}px` }} />
                    </div>
                </div>
                <div className={styles.dayweek}>
                    <div className={styles.dayText}>
                        {this.props.calDay}
                    </div>
                    <div className={styles.weekText}>
                        <FormattedMessage id={`site.dates.days.short.${this.props.weekDay}`} />
                    </div>
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}

export default Day;
