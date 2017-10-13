// @flow

import React from 'react';
import type Moment from 'moment';
import styles from './flight-time.css';

type Props = {
    date: Moment,
}

const FlightTime = (props: Props): React.Element<*> => (
    <time>
        <span className={styles.time}>{props.date.format('HH:mm')}</span>
        <span className={styles.date}>{props.date.format('D MMM, dd')}</span>
    </time>
);

export default FlightTime;
