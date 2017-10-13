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
import RtCalendar from '../RtCalendar';
import { SearchForm as SearchFormHelper } from '../../../lib/SearchForm';
import type { ServiceClass, Travellers, SearchSegment, FormType } from '../../../reducers/searchForm';
import type { Locale } from '../../../reducers/site';
import styles from './simple-search-form.css';

type Props = {
    locale: Locale,
    changeTravellers: Function,
    changeServiceClass: Function,
    changeOrigin: Function,
    changeDestination: Function,
    changeFormType: Function,
    selectDateForRt: Function,
    travellers: Travellers,
    serviceClass: ServiceClass,
    intl: intlShape,
    segments: Array<SearchSegment>,
    formType: FormType,
    history: {
        push: Function,
    },
};
type State = {
    hasErrors: boolean,
};


const mapStateTopProps = state => ({
    ...state.searchForm,
    locale: state.site.locale,
});

const mapDispatchToProps = dispatch => ({
    changeOrigin: (item: {[string]: any}): void => {
        dispatch(searchFormActions.searchFormDestinationChange('from', item, 0));
        dispatch(searchFormActions.searchFormDestinationChange('to', item, 1));
    },
    changeDestination: (item: {[string]: any}): void => {
        dispatch(searchFormActions.searchFormDestinationChange('from', item, 1));
        dispatch(searchFormActions.searchFormDestinationChange('to', item, 0));
    },
    changeTravellers: (type: string, value: number): void => {
        dispatch(searchFormActions.searchFormTravellersChange(type, value));
    },
    changeServiceClass: (value: ServiceClass): void => {
        dispatch(searchFormActions.searchFormServiceClassChange(value));
    },
    selectDateForRt: (date: Date | null, index: number): void => {
        dispatch(searchFormActions.searchFormDateChange(date, index));
    },
    changeFormType: (formType: FormType): void => {
        dispatch(searchFormActions.searchFormTypeChange(formType));
    },
});


class SimpleSearchForm extends React.Component<void, Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { hasErrors: false };
        this.onSubmit = this.onSubmit.bind(this);
        this.changeTravellers = this.changeTravellers.bind(this);
        this.changeServiceClass = this.changeServiceClass.bind(this);
        this.changeFormType = this.changeFormType.bind(this);
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

    changeFormType: Function;
    changeFormType(event: Event & { target: HTMLInputElement }): void {
        if (event.target.value === 'ow') {
            this.props.selectDateForRt(null, 1);
        }
        this.props.changeFormType(event.target.value);
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
            formType,
        } = this.props;
        const { formatMessage } = this.props.intl;
        const dateValues = segments.map(segment => segment.dateFrom).filter(date => date !== null);

        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <Form
                formClass={`${styles.root} ${this.state.hasErrors ? styles.hasErrors : ''}`}
                submit={this.onSubmit}
            >
                <DestinationAutocomplete
                    initialValue={segments[0].from}
                    className={styles.origin}
                    inputClass={styles.originInput}
                    id="searchFormOrigin"
                    label={formatMessage({ id: 'searchForm.origin.label' })}
                    locale={locale}
                    select={changeOrigin}
                />
                <DestinationAutocomplete
                    initialValue={segments[1].from}
                    className={styles.destination}
                    inputClass={styles.destinationInput}
                    id="searchFormDestination"
                    label={formatMessage({ id: 'searchForm.destination.label' })}
                    locale={locale}
                    select={changeDestination}
                />
                <RtCalendar
                    formType={formType}
                    select={this.props.selectDateForRt}
                    changeFormType={this.changeFormType}
                    values={dateValues}
                />
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
                <button
                    type="button"
                    className={styles.changeFormTypeBtn}
                    onClick={() => { this.props.changeFormType('complex'); }}
                >
                    <img src="/static/images/route_complex.svg" alt="" />
                    <FormattedMessage id="searchForm.selectComplexFormType" />
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
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
}

export default withRouter(
        connect(mapStateTopProps, mapDispatchToProps)(injectIntl(SimpleSearchForm)));
