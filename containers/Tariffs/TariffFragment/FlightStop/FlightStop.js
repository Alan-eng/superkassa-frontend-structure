// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { timeIntervalFromInterval } from '../../../../utils/dates';
import References from '../../../../lib/References';
import styles from './flight-stop.css';

type Flight = {
    depTimestamp: number,
    depCode: string,
    arrTimestamp: number,
    arrCode: string,
}
type Props = {
    flight1: Flight,
    flight2: Flight,
}

const FlightStop = (props: Props): React.Element<*> => {
    const references = new References();
    const timeInterval = timeIntervalFromInterval(
        props.flight2.depTimestamp - props.flight1.arrTimestamp);

    return (
        <span className={styles.root}>
            <span>
                {references.getPortName(props.flight1.arrCode)},&nbsp;
                {references.getCityNameByPortCode(props.flight1.arrCode)}.
            </span>
            &nbsp;
            <FormattedMessage
                id="tariffs.transferTime"
                values={timeInterval}
                tagName="time"
            />
        </span>
    );
};

export default FlightStop;
