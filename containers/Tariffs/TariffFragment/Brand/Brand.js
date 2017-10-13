// @flow

import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import type { SyntheticInputEvent } from 'flow';
/* eslint-disable import/extensions */
import List from 'sk.react.ui/src/components/List/index.jsx';
import ListItem from 'sk.react.ui/src/components/List/ListItem/index.jsx';
/* eslint-enable import/extensions */
import LuggageIcon from '../../../../components/Icons/LuggageIcon';
import CarryonIcon from '../../../../components/Icons/CarryonIcon';
import styles from './brand.css';

type Props = {
    brand: {
        title: string,
        totalWithCommission: number,
        carryon?: string | null,
        baggage: string,
        id: string,
        miles?: number | string,
        changeable: string,
        refundable: string,
    },
    gds: string,
    selectedFragmentId: string,
    className?: string,
    onSelect: Function,
    intl: intlShape,
}

const getRefundChangeStyle = (status: string): string => {
    switch (status) {
        case 'yes':
            return styles.allow;
        case 'fee':
            return styles.fee;
        case 'no':
        default:
            return styles.disallow;
    }
};

const Brand = (props: Props): React.Element<*> => {
    const price = props.intl.formatNumber(props.brand.totalWithCommission, { style: 'decimal' });
    const selected = props.selectedFragmentId === props.brand.id;

    return (
        <label
            htmlFor={`${props.brand.id}`}
            className={`${styles.root} ${props.className || ''}`}
        >
            <div className={`${styles.brandInfo} ${selected ? styles.selected : ''}`}>
                <h4>{props.brand.title}</h4>
                <div className={styles.price}>
                    <FormattedMessage id="tariffs.price" values={{ price }} />
                </div>
                <hr />
                <div className={styles.infoList}>
                    <div className={styles.luggage}>
                        {props.brand.carryon ?
                            <CarryonIcon baggage={props.brand.carryon} /> : null}
                        <LuggageIcon baggage={props.brand.baggage} />
                    </div>
                    <List listClass={styles.options}>
                        <ListItem
                            listItemClass={getRefundChangeStyle(props.brand.refundable)}
                        >
                            <FormattedMessage id="tariffs.refund" />
                        </ListItem>
                        <ListItem
                            listItemClass={getRefundChangeStyle(props.brand.changeable)}
                        >
                            <FormattedMessage id="tariffs.change" />
                        </ListItem>
                        {props.brand.miles !== undefined ?
                            <ListItem><FormattedMessage id="tariffs.miles" /></ListItem> : null}
                    </List>
                </div>
            </div>
            <input
                type="radio"
                id={`${props.brand.id}`}
                name={props.brand.id}
                checked={selected}
                onChange={(event: SyntheticInputEvent): void => {
                    props.onSelect(event, props.gds);
                }}
                value={props.brand.id}
            />
        </label>
    );
};

Brand.defaultProps = {
    className: '',
    carryon: null,
};

export default injectIntl(Brand);
