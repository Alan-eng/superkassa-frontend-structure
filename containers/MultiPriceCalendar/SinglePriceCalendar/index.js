// @flow

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import searchFormActions from '../../../actions/searchFormActions';
import { type Travellers, type SearchSegment } from '../../../reducers/searchForm';
import PriceCalendarHelper from '../../../lib/SinglePriceCalendar';
import Month from './Month';
import CurrentMonthName from './CurrentMonthName';
import styles from './index.css';

type Props = {
    segmentNumber: number,
    segmentData: SearchSegment,
    selectDate: Function,
    travellers: Travellers,
    intl: intlShape,
};

type State = {
    calendar: { [string]: { [string]: { [string]: { weekDay: number,
        price: number, dateStr: string, } } } },
    maximum: number,
    minimum: number,
    marginLeft: number,
    fromTitle: string,
    toTitle: string,
    currentMonthName: string;
};

const mapDispatchToProps = dispatch => ({
    selectDate: (date: Date | null, segmentNumber: number): void => {
        if (date) {
            dispatch(searchFormActions.searchFormDateChange(date, segmentNumber));
        }
    },
});

class SinglePriceCalendar extends React.Component<void, Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            calendar: {},
            maximum: 0,
            minimum: 0,
            marginLeft: 0,
            fromTitle: '',
            toTitle: '',
            currentMonthName: '',
        };
        this.monthsSlidePrev = this.monthsSlidePrev.bind(this);
        this.monthsSlideNext = this.monthsSlideNext.bind(this);
        this.getCurrentMonthName = this.getCurrentMonthName.bind(this);
    }

    state: State;

    getCurrentMonthName: Function;
    getCurrentMonthName() {
        let name = '';
        const childNodes = this.monthsWrapper.childNodes;
        if (childNodes) {
            childNodes.forEach((childNode) => {
                if (childNode.childNodes[1] && childNode.childNodes[1].childNodes[0]) {
                    const caption = childNode.childNodes[1].childNodes[0];
                    if (caption.style && typeof caption.style === 'object') {
                        if (typeof childNode.offsetLeft === 'number' && typeof childNode.offsetWidth === 'number') {
                            if (this.state.marginLeft <= childNode.offsetLeft &&
                                this.state.marginLeft
                                    >= (childNode.offsetLeft - childNode.offsetWidth)) {
                                name = caption.innerText;
                                caption.style.display = 'none';
                            } else {
                                caption.style.display = 'block';
                            }
                        }
                    }
                }
            });
        }
        return name;
    }

    monthsSlideNext: Function;
    monthsSlideNext() {
        const childNodes = this.monthsWrapper.childNodes;
        if (childNodes) {
            let monthsWidth = 0;
            childNodes.forEach((childNode) => {
                if (typeof childNode.offsetWidth === 'number') {
                    monthsWidth += childNode.offsetWidth;
                }
            });
            if (monthsWidth > this.monthsWrapper.offsetWidth) {
                this.setState({
                    marginLeft: this.state.marginLeft - 200,
                    currentMonthName: this.getCurrentMonthName(),
                });
            }
        }
    }

    monthsSlidePrev: Function;
    monthsSlidePrev() {
        this.setState({
            marginLeft: this.state.marginLeft >= 0 ? 0 : this.state.marginLeft + 200,
            currentMonthName: this.getCurrentMonthName(),
        });
    }

    props: Props;
    lastFrom: string | null = null;
    lastTo: string | null = null;
    monthsWrapper: HTMLBaseElement;

    render() {
        const segFrom = this.props.segmentData.from;
        const segTo = this.props.segmentData.to;
        if (!segFrom || !segTo) {
            return null;
        }
        const from = segFrom.city_code ? segFrom.city_code : null;
        const to = segTo.city_code ? segTo.city_code : null;
        if (!from || !to) {
            return null;
        }
        const fromTitle = segFrom.name ? segFrom.name : from;
        const toTitle = segTo.name ? segTo.name : to;

        if (this.lastFrom !== from || this.lastTo !== to) {
            this.lastFrom = from;
            this.lastTo = to;
            const adult = this.props.travellers.adult;
            const child = this.props.travellers.child;
            const infant = this.props.travellers.infant;

            PriceCalendarHelper.getList(from, to, adult, child, infant, null, null)
                .then((rawCalendar) => {
                    const calendar = {};
                    let minimum = null;
                    let maximum = null;
                    Object.keys(rawCalendar).forEach((dateStr) => {
                        const dateObj = new Date(Date.parse(dateStr));
                        const calYear = dateObj.getFullYear();
                        const calMonth = 1 + dateObj.getMonth();
                        const calDay = dateObj.getDate();
                        const weekDay = dateObj.getDay();
                        const price = rawCalendar[dateStr];
                        if (!calendar[calYear]) {
                            calendar[calYear] = {};
                        }
                        if (!calendar[calYear][calMonth]) {
                            calendar[calYear][calMonth] = {};
                        }
                        if (!calendar[calYear][calMonth][calDay]) {
                            calendar[calYear][calMonth][calDay] = {
                                weekDay,
                                price,
                                dateStr,
                            };
                        }
                        if (minimum === null || minimum > price) {
                            minimum = price;
                        }
                        if (maximum === null || maximum < price) {
                            maximum = price;
                        }
                    });
                    minimum = minimum || 0;
                    maximum = maximum || minimum;
                    this.setState({ fromTitle, toTitle, calendar, maximum, minimum });
                });

            return null;
        }

        const { formatMessage } = this.props.intl;
        const marginLeft = { marginLeft: `${this.state.marginLeft}px` };
        const maxFillHeight = 68;
        const graphHeight = maxFillHeight + 32;
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <div className={styles.calendar}>
                <div className={styles.caption}>
                    {this.state.fromTitle}&nbsp;&mdash;&nbsp;{this.state.toTitle}
                </div>
                <button
                    className={styles.prevButton}
                    type="button"
                    onClick={this.monthsSlidePrev}
                    disabled={false}
                >
                    <img
                        src="/static/images/prev.svg"
                        alt={formatMessage({ id: 'site.calendar.prevMonth' })}
                    />
                </button>
                <button
                    className={styles.nextButton}
                    type="button"
                    onClick={this.monthsSlideNext}
                    disabled={false}
                >
                    <img
                        src="/static/images/next.svg"
                        alt={formatMessage({ id: 'site.calendar.nextMonth' })}
                    />
                </button >
                <div className={styles.wrapper}>
                    <div
                        className={styles.months}
                        style={marginLeft}
                        ref={(element) => { this.monthsWrapper = element; }}
                    >
                        {Object.keys(this.state.calendar).map(calYear => (
                            Object.keys(this.state.calendar[calYear]).map(calMonth => (
                                <Month
                                    key={`${calYear}-${calMonth}`}
                                    graphHeight={graphHeight}
                                    maxFillHeight={maxFillHeight}
                                    calYear={+calYear}
                                    calMonth={+calMonth}
                                    month={this.state.calendar[calYear][calMonth]}
                                    segmentNumber={this.props.segmentNumber}
                                    selectDate={this.props.selectDate}
                                    maximum={this.state.maximum}
                                    minimum={this.state.minimum}
                                />
                            ))
                        ))}
                    </div>
                    <CurrentMonthName
                        name={this.state.currentMonthName}
                    />
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
}

export default connect(undefined, mapDispatchToProps)(injectIntl(SinglePriceCalendar));
