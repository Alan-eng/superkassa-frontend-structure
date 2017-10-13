// @flow

import React from 'react';
import moment from 'moment';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Calendar from '../../../components/Calendar';
import SearchFormTypeSelect from '../../../components/Form/SeachFormTypeSelect';
import { withDropDown } from '../../../hoc';
import type { DayValues } from '../../../components/Calendar/';
import type { DropDownShape } from '../../../hoc/withDropDown';
import type { FormType } from '../../../reducers/searchForm';
import styles from './rt-calendar.css';

type Props = {
    select: Function,
    changeFormType: Function,
    values: DayValues,
    dropDown: DropDownShape,
    formType: FormType,
    intl: intlShape,
}

type State = {
    currentStep: number,
}

class RtCalendar extends React.Component<void, Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentStep: 0,
        };
        this.formatValues = this.formatValues.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    state: State;

    onSelect: Function;
    onSelect(date: Date): void {
        if (this.props.formType === 'ow') {
            this.props.select(date, 0);
            this.props.dropDown.hideDropDown();
            return;
        }

        const values = this.props.values;
        if (this.state.currentStep === 0) {
            this.props.select(date, 0);
            if (values.length === 2 && date > values[1]) {
                this.props.select(null, 1);
            }
        } else if (date < values[0]) {
            this.props.select(date, 0);
            this.props.select(values[0], 1);
        } else {
            this.props.select(date, 1);
        }

        this.setState({ currentStep: this.state.currentStep + 1 }, () => {
            if (this.state.currentStep === 2) {
                this.setState({ currentStep: 0 });
                this.props.dropDown.hideDropDown();
            }
        });
    }

    formatValues: Function;
    formatValues(): string {
        const values = this.props.values;
        const format = this.props.formType === 'ow' ?
            'D MMMM' : 'D MMM';

        return values
            .map(date => moment(date).format(format))
            .join('&nbsp;&mdash;&nbsp;');
    }

    props: Props;

    render() {
        const { values, formType, changeFormType } = this.props;
        const { showDropDown, isShowed, dropDown } = this.props.dropDown;
        const formatMessage = this.props.intl.formatMessage;
        const valueMessage = this.formatValues();
        const labelClass = valueMessage ? styles.label : styles.noActive;
        const formTypeLabels = {
            rt: formatMessage({ id: 'searchForm.formType.rt.label' }),
            ow: formatMessage({ id: 'searchForm.formType.ow.label' }),
        };

        const dropDownElement = dropDown((
            <div>
                <SearchFormTypeSelect
                    id="SearchFormType"
                    formType={formType}
                    labels={formTypeLabels}
                    change={changeFormType}
                    className={styles.formTypeSelect}
                />
                <Calendar
                    select={this.onSelect}
                    values={values}
                />
            </div>
        ));

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

export default injectIntl(withDropDown(RtCalendar));
