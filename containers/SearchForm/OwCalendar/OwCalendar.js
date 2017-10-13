// @flow

import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import Calendar from '../../../components/Calendar';
import { withDropDown } from '../../../hoc';
import type { DropDownShape } from '../../../hoc/withDropDown';
import styles from './ow-calendar.css';

type Props = {
    select: Function,
    value: Date | null,
    minDate: Date | null,
    maxDate: Date | null,
    dropDown: DropDownShape,
}

class OwCalendar extends React.Component<void, Props, void> {
    constructor(props: Props) {
        super(props);
        this.formatValue = this.formatValue.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect: Function;
    onSelect(date: Date): void {
        this.props.select(date);
        this.props.dropDown.hideDropDown();
    }

    formatValue: Function;
    formatValue(): string {
        if (this.props.value instanceof Date) {
            return moment(this.props.value).format('D MMMM');
        }

        return '';
    }

    props: Props;

    render() {
        const { value, minDate, maxDate } = this.props;
        const { showDropDown, isShowed, dropDown } = this.props.dropDown;
        const valueMessage = this.formatValue();
        const labelClass = valueMessage ? styles.label : styles.noActive;
        const values = value !== null ? [value] : [];

        const dropDownElement = dropDown((
            <Calendar
                select={this.onSelect}
                values={values}
                {...minDate !== null ? { minDate } : {}}
                {...maxDate !== null ? { maxDate } : {}}
            />
        ), { className: styles.calendarDropDown });

        /* eslint-disable react/no-danger */
        return (
            <div className={styles.root}>
                <button
                    type="button"
                    className={`${styles.labeledButton} ${isShowed ? styles.hasDropDown : ''}`}
                    onClick={showDropDown}
                    onFocus={showDropDown}
                >
                    <span className={labelClass}><FormattedMessage id="searchForm.date.label" /></span>
                    <span dangerouslySetInnerHTML={{ __html: valueMessage }} />
                </button>
                {dropDownElement}
            </div>
        );
        /* eslint-enable react/no-danger */
    }
}

export default withDropDown(OwCalendar);
