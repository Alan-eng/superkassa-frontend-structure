// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';
import References from '../../../lib/References';
import TariffFragment from '../TariffFragment';
import { timeIntervalFromInterval } from '../../../utils/dates';
import styles from './tariff-segment.css';

type Props = {
    segment: {
        depCode: string,
        arrCode: string,
        inFlightTimeObj: { hours: number, minutes: number },
        fragments: Array<{
            flights: Array<{[string]: any}>,
            gdsString: string,
            depTimestamp: number,
            arrTimestamp: number,
            depCode: string,
            depTime: string,
            depDate: string,
            arrCode: string,
            arrTime: string,
            arrDate: string,
            brands: Array<{[string]: any}>,
            id: string,
            gdsString: string,
        }>,
    },
    selectedFragments: {[string]: string},
    selectRecommendation: Function,
};

const TariffSegment = (props: Props): React.Element<*> => {
    const references = new References();
    const from = references.getCityNameByPortCode(props.segment.depCode);
    const to = references.getCityNameByPortCode(props.segment.arrCode);
    const fragments = [];

    props.segment.fragments.forEach((fragment, index) => {
        const fragmentClasses = [];
        if (index === 0) {
            fragmentClasses.push(styles.fragmentFirst);
        }
        if (index === props.segment.fragments.length - 1) {
            fragmentClasses.push(styles.fragmentLast);
        }

        fragments.push(<TariffFragment
            className={fragmentClasses.join(' ')}
            key={fragment.gdsString}
            fragment={fragment}
            selectedFragmentId={props.selectedFragments[fragment.gdsString]}
            selectRecommendation={props.selectRecommendation}
        />);

        if (index < props.segment.fragments.length - 1) {
            const timeInterval = timeIntervalFromInterval(
                props.segment.fragments[index + 1].depTimestamp - fragment.arrTimestamp);

            fragments.push((
                <div
                    key={`${fragment.gdsString}Stop`}
                    className={styles.stop}
                >
                    <FormattedMessage
                        id="tariffs.transferTime"
                        values={timeInterval}
                    />
                </div>
            ));
        }
    });

    return (
        <section>
            <div>
                <h2 className={styles.route}>{from} — {to}</h2>
                <time className={styles.routeTime}>
                    <FormattedMessage id="tariffs.inFlightTime" values={props.segment.inFlightTimeObj} />
                </time>
            </div>
            {fragments}
        </section>
    );
};

export default TariffSegment;
