// @flow

import React from 'react';
import styles from './index.css';

type Props = {
    name: string,
};

const CurrentMonthName = (props: Props): React.Element<*> => (
    <div className={styles.currentMonthName}>
        {props.name}
    </div>
);

export default CurrentMonthName;
