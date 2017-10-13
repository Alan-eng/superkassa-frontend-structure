// @flow

import React from 'react';
import References from '../../../../lib/References';
import styles from './city-information.css';

type Props = {
    portCode: string,
}

const CityInformation = (props: Props): React.Element<*> => {
    const references = new References();

    return (
        <span>
            <h3 className={styles.airport}>
                {references.getPortName(props.portCode)},&nbsp;
                <span className={styles.iata}>{props.portCode}</span>
            </h3>
            <span className={styles.city}>
                {references.getCityNameByPortCode(props.portCode)},&nbsp;
                {references.getCountryNameByPortCode(props.portCode)}
            </span>
        </span>
    );
};

export default CityInformation;
