// @flow

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';
/* eslint-disable import/extensions */
import Form from 'sk.react.ui/src/components/Form/index.jsx';
import Button from 'sk.react.ui/src/components/Button/index.jsx';
/* eslint-enable import/extensions */
import TravellersWithServiceClass from '../TravellersWithServiceClass';
import searchFormActions from '../../../actions/searchFormActions';
import DestinationAutocomplete from '../../../components/Form/DestinationAutocomplete';
import CloseButton from '../../../components/Buttons/CloseButton';
import OwCalendar from '../OwCalendar';
import { SearchForm as SearchFormHelper } from '../../../lib/SearchForm';
import type { ServiceClass, Travellers, SearchSegment, FormType } from '../../../reducers/searchForm';
import type { Locale } from '../../../reducers/site';
import styles from './complex-search-form.css';

type Props = {
    locale: Locale,
    changeTravellers: Function,
    changeServiceClass: Function,
    changeOrigin: Function,
    changeDestination: Function,
    changeFormType: Function,
    selectDate: Function,
    addSegment: Function,
    removeLastSegment: Function,
    travellers: Travellers,
    serviceClass: ServiceClass,
    intl: intlShape,
    segments: Array<SearchSegment>,
    maxSegmentsCount: number,
    // eslint-disable-next-line react/no-unused-prop-types
    formType: FormType,
    history: {
        push: Function,
    },
};
type State = {
    hasErrors: boolean,
};


const getMinDate = (segments: Array<SearchSegment>, currentIndex: number): Date | null => {
    const searchSegments = segments.slice(0, currentIndex);
    let minDate = null;

    searchSegments.forEach((segment) => {
        if (segment.dateFrom instanceof Date) {
            minDate = segment.dateFrom;
        }
    });

    return minDate;
};
const getMaxDate = (segments: Array<SearchSegment>, currentIndex: number): Date | null => {
    for (let i = currentIndex + 1; i < segments.length; i += 1) {
        if (segments[i].dateFrom instanceof Date) {
            return segments[i].dateFrom;
        }
    }

    return null;
};

const mapStateTopProps = state => ({
    ...state.searchForm,
    locale: state.site.locale,
    maxSegmentsCount: state.site.maxSegmentsCount,
});

const mapDispatchToProps = dispatch => ({
    changeOrigin: (item: {[string]: any}, index: number): void => {
        dispatch(searchFormActions.searchFormDestinationChange('from', item, index));
    },
    changeDestination: (item: {[string]: any}, index: number): void => {
        dispatch(searchFormActions.searchFormDestinationChange('to', item, index));
    },
    changeTravellers: (type: string, value: number): void => {
        dispatch(searchFormActions.searchFormTravellersChange(type, value));
    },
    changeServiceClass: (value: ServiceClass): void => {
        dispatch(searchFormActions.searchFormServiceClassChange(value));
    },
    selectDate: (date: Date | null, index: number): void => {
        dispatch(searchFormActions.searchFormDateChange(date, index));
    },
    changeFormType: (): void => {
        dispatch(searchFormActions.searchFormTypeChange('rt'));
    },
    addSegment: (): void => {
        dispatch(searchFormActions.searchFormAddSegment());
    },
    removeLastSegment: (): void => {
        dispatch(searchFormActions.searchFormRemoveLastSegment());
    },
});


class ComplexSearchForm extends React.Component<void, Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { hasErrors: false };
        this.onSubmit = this.onSubmit.bind(this);
        this.changeTravellers = this.changeTravellers.bind(this);
        this.changeServiceClass = this.changeServiceClass.bind(this);
        this.hideErrors = this.hideErrors.bind(this);
    }

    state: State;

    componentDidMount() {
        if (window) {
            window.addEventListener('click', this.hideErrors);
        }
    }

    componentWillUnmount() {
        if (window) {
            window.removeEventListener('click', this.hideErrors);
        }
    }

    onSubmit: Function;
    onSubmit(event) {
        event.preventDefault();
        if (SearchFormHelper.validate(this.props)) {
            this.props.history.push(`/q/${SearchFormHelper.getSearchCode(this.props)}`);
        } else {
            this.setState({ hasErrors: true });
        }
    }

    hideErrors: Function;
    hideErrors() {
        this.setState({ hasErrors: false });
    }

    changeTravellers: Function;
    changeTravellers(type: string, value: number): void {
        this.props.changeTravellers(type, value);
    }

    changeServiceClass: Function;
    changeServiceClass(event: Event & { target: HTMLInputElement }): void {
        this.props.changeServiceClass(event.target.value);
    }

    props: Props;

    render() {
        const {
            travellers,
            serviceClass,
            locale,
            changeOrigin,
            changeDestination,
            segments,
            maxSegmentsCount,
        } = this.props;
        const { formatMessage } = this.props.intl;

        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        /* eslint-disable react/no-array-index-key */
        return (
            <Form
                formClass={`${styles.root} ${this.state.hasErrors ? styles.hasErrors : ''}`}
                submit={this.onSubmit}
            >
                {segments.map((segment, index) => (
                    <div className={styles.row} key={index}>
                        <DestinationAutocomplete
                            initialValue={segment.from}
                            className={styles.origin}
                            inputClass={styles.originInput}
                            id={`searchFormOrigin${index}`}
                            label={formatMessage({ id: 'searchForm.origin.label' })}
                            locale={locale}
                            select={(item) => { changeOrigin(item, index); }}
                        />
                        <DestinationAutocomplete
                            initialValue={segment.to}
                            className={styles.destination}
                            inputClass={styles.destinationInput}
                            id={`searchFormDestination${index}`}
                            label={formatMessage({ id: 'searchForm.destination.label' })}
                            locale={locale}
                            select={(item) => { changeDestination(item, index); }}
                        />
                        <OwCalendar
                            select={(date) => { this.props.selectDate(date, index); }}
                            minDate={getMinDate(segments, index)}
                            maxDate={getMaxDate(segments, index)}
                            value={segment.dateFrom}
                        />
                        {index > 1 && index === segments.length - 1 ?
                            <CloseButton
                                className={styles.removeSegmentButton}
                                onClick={this.props.removeLastSegment}
                            />
                            : null}
                    </div>
                ))}
                <div className={styles.row}>
                    <Button
                        buttonClass={styles.addSegmentButton}
                        type="button"
                        putpose="default"
                        size="big"
                        action={this.props.addSegment}
                        disabled={segments.length >= maxSegmentsCount}
                    >
                        {segments.length < maxSegmentsCount ?
                            <FormattedMessage id="searchForm.addSegment" /> :
                            <FormattedMessage id="searchForm.maxSegmentsCountReached" />}
                    </Button>
                    <TravellersWithServiceClass
                        travellers={travellers}
                        serviceClass={serviceClass}
                        changeTravellers={this.changeTravellers}
                        changeServiceClass={this.changeServiceClass}
                    />
                    <Button
                        buttonClass={styles.submitButton}
                        type="submit"
                        purpose="danger"
                        size="big"
                    ><FormattedMessage id="searchForm.searchBtn" /></Button>
                </div>
                <button
                    type="button"
                    className={styles.changeFormTypeBtn}
                    onClick={this.props.changeFormType}
                >
                    <img src="/static/images/route_simple.svg" alt="" />
                    <FormattedMessage id="searchForm.selectSimpleFormType" />
                </button>
                {
                    this.state.hasErrors ?
                        <span
                            className={styles.error}
                            onClick={(event) => { event.stopPropagation(); }}
                            role="alert"
                        >
                            <FormattedMessage id="searchForm.error" />
                        </span> : null
                }
            </Form>
        );
        /* eslint-enable react/no-array-index-key */
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
}

export default withRouter(
    connect(mapStateTopProps, mapDispatchToProps)(injectIntl(ComplexSearchForm)));

