// @flow

import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import TravellersInput from '../../../components/Form/TravellersInput';
import ServiceClassSelect from '../../../components/Form/ServiceClassSelect';
import { withDropDown } from '../../../hoc';
import { SearchForm } from '../../../lib/SearchForm';
import type { DropDownShape } from '../../../hoc/withDropDown';
import type { Travellers, ServiceClass } from '../../../reducers/searchForm';
import styles from './travellers-with-service-class.css';

type Props = {
    travellers: Travellers,
    serviceClass: ServiceClass,
    intl: intlShape,
    changeTravellers: Function,
    changeServiceClass: Function,
    dropDown: DropDownShape,
};


const TravellersWithCabinClass = (props: Props): React.Element<*> => {
    const {
        travellers,
        changeTravellers,
        changeServiceClass,
        serviceClass,
    } = props;

    const { formatMessage, formatHTMLMessage } = props.intl;
    const travellersLabels = {
        adult: formatMessage({ id: 'searchForm.travellers.adults.label' }),
        child: formatMessage({ id: 'searchForm.travellers.children.label' }),
        infant: formatHTMLMessage({ id: 'searchForm.travellers.infants.label' }),
    };
    const serviceClassLabels = {
        economy: formatMessage({ id: 'searchForm.serviceClass.economy.label' }),
        business: formatMessage({ id: 'searchForm.serviceClass.business.label' }),
    };

    const {
        isShowed,
        showDropDown,
        dropDown,
    } = props.dropDown;
    const dropDownElement = dropDown((
        <div className={styles.panel}>
            <TravellersInput
                className={styles.bordered}
                id="searchFormTravellers"
                travellers={travellers}
                labels={travellersLabels}
                onChange={changeTravellers}
            />
            <ServiceClassSelect
                id="searchFormServiceClass"
                serviceClass={serviceClass}
                labels={serviceClassLabels}
                change={changeServiceClass}
            />
        </div>
    ));

    return (
        <div className={styles.root}>
            <button
                type="button"
                className={`${styles.labeledButton} ${isShowed ? styles.hasDropDown : ''}`}
                onClick={showDropDown}
                onFocus={showDropDown}
            >
                <span className={styles.label}>{formatMessage({ id: 'searchForm.travellers.label' })}</span>
                {SearchForm.formatTravellersWithServiceClassText(
                    travellers,
                    serviceClass,
                    formatMessage)
                }
            </button>
            {dropDownElement}
        </div>
    );
};

export default injectIntl(withDropDown(TravellersWithCabinClass));
