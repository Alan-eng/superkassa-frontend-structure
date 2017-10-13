// @flow

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import type { SyntheticInputEvent } from 'flow';
/* eslint-disable import/extensions */
import Form from 'sk.react.ui/src/components/Form/index.jsx';
import Button from 'sk.react.ui/src/components/Button/index.jsx';
/* eslint-enable import/extensions */
import { siteActions, tariffsActions } from '../../actions';
import {
    getTariffsTree,
    getTariffsRecommendations,
    getTariffsSegments,
    getTariffsTravellers,
    getTariffsLandingInfo } from '../../selectors/tariffs';
import ErrorWindow from '../../components/ErrorWindow';
import TariffSegment from './TariffSegment';
import { withLocales } from '../../hoc';
import type { AppState } from '../../reducers';
import type { LandingsInfo } from '../../reducers/tariffs';
import styles from './tariffs.css';

type Props = {
    showProgressBar: Function,
    hideProgressBar: Function,
    fetchTariffs: Function,
    addToCart: Function,
    clearTariffs: Function,
    taskId: string,
    variantId: string,
    isShowProgressBar?: boolean,
    route: {[string]: any} | null,
    recommendations: Array<{[string]: any}>;
    segments: {[string]: any},
    searchCode: string,
    travellers: {
        adult: number,
        child: number,
        infant: number,
    },
    landingInfo: LandingsInfo,
    error: string | null,
};

type State = {
    selectedRecommendation: string,
};

type DefaultProps = {
    isShowProgressBar: boolean,
}

const getId = (fragment: {[string]: any}): string => Object.keys(fragment.ids)[0];

const mapStateToProps = (state: AppState) => ({
    recommendations: getTariffsRecommendations(state),
    segments: getTariffsSegments(state),
    travellers: getTariffsTravellers(state),
    route: getTariffsTree(state),
    landingInfo: getTariffsLandingInfo(state),
    error: state.tariffs.error,
});

const mapDispatchToProps = dispatch => ({
    showProgressBar: (): void => dispatch(siteActions.showingSitePropgressBar(true)),
    hideProgressBar: (): void => dispatch(siteActions.showingSitePropgressBar(false)),
    fetchTariffs: (taskId: string, variantId: string, isShowProgress: boolean): void =>
        dispatch(tariffsActions.fetchTariffs(taskId, variantId, isShowProgress)),
    addToCart: (elements: Array<{[string]: any}>): void =>
        dispatch(siteActions.createCart(elements)),
    clearTariffs: (): void => dispatch(tariffsActions.clearTariffs()),
});


class Tariffs extends React.Component<DefaultProps, Props, State> {
    static defaultProps = {
        isShowProgressBar: true,
    };

    constructor(props: Props) {
        super(props);

        this.selectRecommendation = this.selectRecommendation.bind(this);
        this.findSelectedFragments = this.findSelectedFragments.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            selectedRecommendation: props.variantId,
        };
    }

    state: State;

    componentDidMount(): void {
        const {
            taskId,
            variantId,
            showProgressBar,
            fetchTariffs,
            isShowProgressBar } = this.props;

        showProgressBar();
        fetchTariffs(taskId, variantId, isShowProgressBar);
    }

    componentWillUnmount(): void {
        this.props.hideProgressBar();
        this.props.clearTariffs();
    }

    onSubmit: Function;
    async onSubmit(event: SyntheticInputEvent) {
        event.preventDefault();

        const recommendationToCart = this.props.recommendations.find(recommendation =>
            getId(recommendation) === this.state.selectedRecommendation);

        if (!recommendationToCart) {
            throw new Error('Recommendation to cart from tariffs page not found');
        }

        const landingInfo = this.props.landingInfo;

        const toCart = {
            type: 'flight',
            line: 0,
            id: getId(recommendationToCart),
            segments: this.props.segments,
            recommendations: [recommendationToCart],
            search_info: {
                search: this.props.searchCode,
                tasks: { avia: [this.props.taskId] },
                travellers: this.props.travellers,
                partner_id: landingInfo.partnerInfo && landingInfo.partnerInfo.id,
                partner_source: landingInfo.partnerInfo && landingInfo.partnerInfo.source,
                partner_marker: landingInfo.partnerInfo && landingInfo.partnerInfo.marker,
                partner_code: landingInfo.partnerInfo && landingInfo.partnerInfo.code,
                agency_group_id: landingInfo.agencyGroupId,
                backend_branch: landingInfo.backendBranch,
                landing_timestamp: landingInfo.landingTimestamp,
                is_organic: !landingInfo.landingTimestamp,
            },
        };

        this.props.showProgressBar();
        this.props.addToCart([toCart]);
    }

    findSelectedFragments: Function;
    findSelectedFragments(): {[string]: string} {
        const recommendationId = this.state.selectedRecommendation;
        const selectedRecommendation = this.props.recommendations.find(recommendation =>
            getId(recommendation) === recommendationId);
        const selectedFragments = {};

        if (!selectedRecommendation) {
            return {};
        }

        Object.keys(selectedRecommendation.fragments)
            .forEach((gds) => {
                selectedFragments[gds] = Object.keys(selectedRecommendation.fragments[gds].ids)[0];
            });

        return selectedFragments;
    }

    selectRecommendation: Function;
    selectRecommendation(event: SyntheticInputEvent, gds: string): void {
        const selectedFragments = this.findSelectedFragments();
        selectedFragments[gds] = event.target.value;
        const selectedRecommendation = this.props.recommendations.filter(recommendation =>
            Object.keys(recommendation.fragments)
                .every((fragmentGds) => {
                    const id = Object.keys(recommendation.fragments[fragmentGds].ids)[0];

                    return selectedFragments[fragmentGds] === id;
                }))[0];

        if (selectedRecommendation) {
            const id = Object.keys(selectedRecommendation.ids)[0];
            this.setState({ selectedRecommendation: id });
        }
    }

    props: Props;

    render() {
        const { route } = this.props;

        if (this.props.error) {
            return (<ErrorWindow
                error="tariffs.error.message"
                btnText="tariffs.error.btnText"
                url={`/q/${this.props.searchCode}`}
            />);
        }

        if (route === null) {
            return null;
        }

        const selectedFragments = this.findSelectedFragments();

        /* eslint-disable react/no-array-index-key */
        return (
            <div className={styles.root}>
                <Form submit={this.onSubmit}>
                    {route.map((segment, index) => (<TariffSegment
                        key={index}
                        segment={segment}
                        selectedFragments={selectedFragments}
                        selectRecommendation={this.selectRecommendation}
                    />))}
                    <div className={styles.submitButtonWrapper}>
                        <Button
                            type="submit"
                            size="big"
                            buttonClass={styles.submitButton}
                        >
                            <FormattedMessage id="tariffs.issueTickets" />
                        </Button>
                    </div>
                </Form>
            </div>
        );
        /* eslint-enable react/no-array-index-key */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLocales(Tariffs, 'tariffs'));
