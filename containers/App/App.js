// @flow

import React from 'react';
import moment from 'moment';
// Необходимо импортировать все локали, кроме английской,
// которые поддерживает сайт
import 'moment/locale/ru';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import References from '../../lib/References';
import siteActions from '../../actions/siteActions';
import { withLocales } from '../../hoc';

import Layout from '../../components/Layout/Layout';
import FullscreenProgressBar from '../../components/FullscreenProgressBar/FullscreenProgressBar';
import GlobalError from '../../components/GlobalError';

import RecoverPasswordPage from '../../pages/RecoverPasswordPage';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import QueryPage from '../../pages/QueryPage';
import TariffsPage from '../../pages/TariffsPage/TariffsPage';
import OrderPage from '../../pages/OrderPage';
import ClientPage from '../../pages/ClientPage';


type DefaultProps = {
    history: null,
}

type Props = {
    locale: string,
    messages: {},
    history?: {
        listen: Function,
    },
    siteMenuHide: Function,
    updateSiteConfig: Function,
    setPreviousLocation: Function,
    showProgress: boolean,
    location: {[string]: any} & { pathname: string },
    isInitialized: boolean,
    globalError: string | null,
}

type SiteState = {
    baseUrl: string,
    messages: {},
    locale: string,
}

type State = {
    site: SiteState
}

const mapStateToProps = (state: State): SiteState => Object.assign({}, state.site);
const mapDispatchToProps = dispatch => ({
    siteMenuHide: ():void => { dispatch(siteActions.siteMenuHide()); },
    updateSiteConfig: (config): void => { dispatch(siteActions.updateSiteConfig(config)); },
    setPreviousLocation: (location: {[string]: any}): void => {
        dispatch(siteActions.setPreviousLocation(location));
    },
});

class App extends React.Component<DefaultProps, Props, void> {
    static defaultProps = {
        history: null,
    };

    constructor(props: Props) {
        super(props);

        if (!['/login', '/recover-password'].includes(props.location.pathname)) {
            props.setPreviousLocation(props.location);
        }

        if (props.history) {
            props.history.listen((location) => {
                if (!['/login', '/recover-password'].includes(location.pathname)) {
                    props.setPreviousLocation(location);
                }

                props.siteMenuHide();
            });
        }
        moment.locale(this.props.locale);
    }

    componentDidMount() {
        if (window) {
            if (!window.appConfig) {
                throw new ReferenceError('window.appConfig is undefined');
            }

            this.props.updateSiteConfig(window.appConfig);
        }

        References.create();
    }

    componentWillUnmount() {
        References.unsubscribe();
    }

    render() {
        if (this.props.isInitialized === false) {
            return null;
        }

        return (
            <IntlProvider
                locale={this.props.locale}
                messages={this.props.messages}
            >
                <div>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/recover-password" component={RecoverPasswordPage} />
                            <Route path="/q/:searchQuery" component={QueryPage} />
                            <Route path="/tariffs/:taskId/:variantId/:searchCode?" component={TariffsPage} />
                            <Route path="/order_wip/:orderId?" component={OrderPage} />
                            <Route path="/client_wip/:orderId?" component={ClientPage} />
                        </Switch>
                    </Layout>
                    {this.props.showProgress ? <FullscreenProgressBar /> : null}
                    {this.props.globalError ? <GlobalError /> : null}
                </div>
            </IntlProvider>
        );
    }
}

export default withLocales(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(App)), 'site');
