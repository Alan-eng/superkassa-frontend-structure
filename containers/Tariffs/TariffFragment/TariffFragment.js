// @flow

import React from 'react';
import moment from 'moment';
/* eslint-disable import/extensions */
import List from 'sk.react.ui/src/components/List/index.jsx';
import ListItem from 'sk.react.ui/src/components/List/ListItem/index.jsx';
/* eslint-enable import/extensions */
import CityInformation from './CityInformation';
import FlightTime from './FlightTime';
import FlightInfo from './FlightInfo';
import FlightStop from './FlightStop';
import Brand from './Brand';
import styles from './tariff-fragment.css';

type Props = {
    fragment: {
        flights: Array<{[string]: any}>,
        depCode: string,
        depTime: string,
        depDate: string,
        arrCode: string,
        arrTime: string,
        arrDate: string,
        brands: Array<{[string]: any}>,
        id: string,
        gdsString: string,
    },
    selectedFragmentId: string,
    selectRecommendation: Function,
    className?: string,
}

const TariffFragment = (props: Props): React.Element<*> => {
    const depDate = moment(`${props.fragment.depDate} ${props.fragment.depTime}`);
    const arrDate = moment(`${props.fragment.arrDate} ${props.fragment.arrTime}`);
    const flights = [];
    const rootClass = `${styles.root} ${props.className || ''}`;

    /* eslint-disable react/no-array-index-key */
    props.fragment.flights.forEach((flight, index) => {
        flights.push(<ListItem key={`flight${index}`}><FlightInfo flight={flight} /></ListItem>);

        if (index < props.fragment.flights.length - 1) {
            flights.push((
                <ListItem key={`flightStop${index}`} listItemClass={styles.stop}>
                    <FlightStop flight1={flight} flight2={props.fragment.flights[index + 1]} />
                </ListItem>
            ));
        }
    });
    /* eslint-enable react/no-array-index-key */

    return (
        <List listClass={rootClass}>
            <ListItem listItemClass={styles.departure}>
                <CityInformation portCode={props.fragment.depCode} />
                <FlightTime date={depDate} />
            </ListItem>
            {flights}
            <ListItem listItemClass={styles.arrival}>
                <CityInformation portCode={props.fragment.arrCode} />
                <FlightTime date={arrDate} />
            </ListItem>
            <ListItem listItemClass={styles.tariffsWrapper}>
                <List listClass={styles.tariffs}>
                    {props.fragment.brands.map(brand => (
                        <ListItem key={brand.id} listItemClass={styles.tariff}>
                            <Brand
                                brand={brand}
                                gds={props.fragment.gdsString}
                                selectedFragmentId={props.selectedFragmentId}
                                onSelect={props.selectRecommendation}
                            />
                        </ListItem>
                    ))}
                </List>
            </ListItem>
        </List>
    );
};

TariffFragment.defaultProps = {
    className: '',
};

export default TariffFragment;
