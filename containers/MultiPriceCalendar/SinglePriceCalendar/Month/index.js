// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.css';
import Day from './Day';

type Props = {
    graphHeight: number,
    maxFillHeight: number,
    calYear: number,
    calMonth: number,
    month: { [string]: any },
    segmentNumber: number,
    selectDate: Function,
    maximum: number,
    minimum: number,
};

const Month = (props: Props): React.Element<*> => (
    <div className={styles.month}>
        <div className={styles.days}>
            {Object.keys(props.month).map((calDay) => {
                const { weekDay, price } = props.month[calDay];
                const gap = props.maximum - props.minimum;
                const fillFactor = gap > 0 ? (price - props.minimum) / gap : 0;
                const graphFillHeight = Math.ceil(props.maxFillHeight * fillFactor);
                return (
                    <Day
                        key={`${props.calYear}-${props.calMonth}-${+calDay}`}
                        graphHeight={props.graphHeight}
                        graphFillHeight={graphFillHeight}
                        calYear={props.calYear}
                        calMonth={props.calMonth}
                        calDay={+calDay}
                        price={price}
                        weekDay={weekDay}
                        segmentNumber={props.segmentNumber}
                        selectDate={props.selectDate}
                    />
                );
            })}
        </div>
        <div className={styles.monthCaption}>
            <div className={styles.monthCaptionText}>
                <FormattedMessage id={`site.dates.months.full.${props.calMonth - 1}`} />
                {props.calMonth === 1 ? props.calYear : ''}
            </div>
            <div className={styles.monthCaptionLine} />
        </div>
    </div>
);

export default Month;
