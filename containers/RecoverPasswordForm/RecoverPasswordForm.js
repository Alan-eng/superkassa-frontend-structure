// @flow

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';
import type { History, Location } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import type { SyntheticEvent } from 'flow';
/* eslint-disable import/extensions */
import Form from 'sk.react.ui/src/components/Form/index.jsx';
import Button from 'sk.react.ui/src/components/Button/index.jsx';
/* eslint-enable import/extensions */
import LabeledInput from '../../components/Form/LabeledInput/LabeledInput';
import { userActions } from '../../actions/index';
import styles from './recover-password-form.css';

type Props = {
    intl: intlShape,
    userRecoverPassword: Function,
    userRecoverPasswordClear: Function,
    recoverPwdError: ?string,
    recoverPwdSuccess: ?string,
    history: History,
    previousLocation: Location,
};
type State = {
    email: string | null,
};

const mapStateToProps = state => ({
    recoverPwdError: state.user.recoverPwdError,
    recoverPwdSuccess: state.user.recoverPwdSuccess,
    previousLocation: state.site.previousLocation,
});
const mapDispatchToProps = dispatch => ({
    userRecoverPassword: (email: string): void => {
        dispatch(userActions.userRecoverPassword(email));
    },
    userRecoverPasswordClear: (): void => {
        dispatch(userActions.userRecoverPasswordClear());
    },
});

class RecoverPasswordForm extends React.Component<void, Props, State> {
    constructor(props: Props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    state = { email: null };

    componentDidMount() {
        if (window) {
            window.addEventListener('keydown', this.keyDown);
        }
    }

    componentWillUnmount() {
        if (window) {
            window.removeEventListener('keydown', this.keyDown);
        }
    }

    onSubmit: Function;
    onSubmit(event: SyntheticEvent): void {
        this.props.userRecoverPassword(this.state.email);
        event.preventDefault();
    }

    onChangeEmail: Function;
    onChangeEmail(event: SyntheticEvent): void {
        this.setState(Object.assign({}, this.state, { email: event.target.value }));
    }

    keyDown: Function;
    keyDown(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            const pathname = this.props.previousLocation ?
                this.props.previousLocation.pathname : '/';
            const state = this.props.previousLocation && this.props.previousLocation.state ?
                this.props.previousLocation.state : undefined;

            this.props.history.push(pathname, state);
        }
    }

    redirectToLogin: Function;
    redirectToLogin():void {
        this.props.userRecoverPasswordClear();
        this.props.history.push('/login');
    }

    render(): React.Element<*> {
        const { intl, recoverPwdError, recoverPwdSuccess } = this.props;
        const formatMessage: Function = intl.formatMessage;
        const previousLocation = this.props.previousLocation || '/';

        let error = '';
        if (recoverPwdError) {
            error = formatMessage({
                id: recoverPwdError === 'email' ?
                    'site.pages.recoverPwd.errorEmail' : 'site.pages.recoverPwd.errorGlobal',
            });
        }

        if (recoverPwdSuccess) {
            return <Redirect to="/login" />;
        }

        return (
            <Form formClass={styles.root} submit={this.onSubmit}>
                <p className={styles.title}><FormattedMessage id="site.pages.recoverPwd.title" /></p>
                <p className={styles.subtitle}><FormattedMessage id="site.pages.recoverPwd.subtitle" /></p>
                <LabeledInput
                    className={styles.inputRow}
                    type="email"
                    name="email"
                    id="userEmail"
                    label={formatMessage({ id: 'site.pages.recoverPwd.email' })}
                    onChange={this.onChangeEmail}
                    error={error}
                    required
                    autoFocus
                />
                <Button
                    buttonClass={styles.submitBtn}
                    size="big"
                    type="submit"
                >
                    <FormattedMessage id="site.pages.recoverPwd.recoverBtn" />
                </Button>
                <button className={styles.returnToLoginBtn} onClick={this.redirectToLogin}>
                    <FormattedMessage id="site.pages.recoverPwd.returnLink" />
                </button>

                <Link to={previousLocation} className={styles.closeButton}>
                    <img src="/static/images/close-grey.svg" alt="" />
                </Link>
            </Form>
        );
    }
}

export default withRouter(injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordForm)));
