// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';
import References from '../../../../lib/References';
import { timeIntervalFromInterval } from '../../../../utils/dates';
import styles from './flight-info.css';

type Props = {
    flight: {
        arrTimestamp: number,
        depTimestamp: number,
        company: string,
        num: string,
        airplane: string,
    },
}

const FlightInfo = (props: Props): React.Element<*> => {
    const references = new References();
    const inFlight = timeIntervalFromInterval(
        props.flight.arrTimestamp - props.flight.depTimestamp);

    return (
        <div className={styles.root}>
            <time>
                <FormattedMessage
                    id="tariffs.inFlightTime"
                    values={inFlight}
                />
            </time>
            <div>
                <span className={styles.carrierName}>
                    {references.getAirlineName(props.flight.company)}
                </span>
                &nbsp;•&nbsp;
                {`${props.flight.company}-${props.flight.num}`}
                &nbsp;•&nbsp;
                {references.getAirplaneName(props.flight.airplane)}
            </div>
        </div>
    );
};

export default FlightInfo;
