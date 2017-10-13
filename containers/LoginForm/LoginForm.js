// @flow

import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import type { SyntheticEvent, Element } from 'flow';
/* eslint-disable import/extensions */
import Form from 'sk.react.ui/src/components/Form/index.jsx';
import Button from 'sk.react.ui/src/components/Button/index.jsx';
/* eslint-enable import/extensions */
import type { History, Location } from 'react-router';
import LabeledInput from '../../components/Form/LabeledInput/LabeledInput';
import styles from './login-form.css';
import { userActions } from '../../actions/index';
import Validation from '../../lib/Validation';

type State = {
    email: ?string,
    password: ?string,
}

/* eslint-disable react/no-unused-prop-types */
type Props = {
    intl: intlShape,
    userLogin: Function,
    userRecoverPasswordClear: Function,
    userRecoverPassword: Function,
    user: {
        email: string,
        error?: 'global' | 'email' | 'password',
        recoverPwdSuccess?: string,
        recoverPwdError?: 'global' | 'email',
    },
    history: History,
    previousLocation: Location,
};
/* eslint-enable */

const mapStateToProps = state => ({
    user: state.user,
    previousLocation: state.site.previousLocation,
});
const mapDispatchToProps = dispatch => ({
    userLogin: (user: string, password: string): void => {
        dispatch(userActions.userLogin(user, password));
    },
    userRecoverPasswordClear: ():void => {
        dispatch(userActions.userRecoverPasswordClear());
    },
    userRecoverPassword: (email: string): void => {
        dispatch(userActions.userRecoverPassword(email));
    },
});


class LoginForm extends React.Component<void, Props, State> {
    constructor(props: Props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.recoverPassword = this.recoverPassword.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.state = {
            email: null,
            password: null,
        };
    }

    state: State;

    componentDidMount() {
        if (window) {
            window.addEventListener('keydown', this.keyDown);
        }
    }

    componentWillUnmount() {
        this.props.userRecoverPasswordClear();
        if (window) {
            window.removeEventListener('keydown', this.keyDown);
        }
    }

    onSubmit: Function;
    onSubmit(event: SyntheticEvent): void {
        this.props.userLogin(this.state.email, this.state.password);
        event.preventDefault();
    }

    onChangeEmail: Function;
    onChangeEmail(event: SyntheticEvent): void {
        if (this.props.user.recoverPwdSuccess &&
            this.props.user.recoverPwdSuccess !== event.target.value) {
            this.props.userRecoverPasswordClear();
        }
        if (this.props.user.recoverPwdError) {
            this.props.userRecoverPasswordClear();
        }
        this.setState(Object.assign({}, this.state, { email: event.target.value }));
    }

    onChangePassword: Function;
    onChangePassword(event: SyntheticEvent): void {
        this.setState(Object.assign({}, this.state, { password: event.target.value }));
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

    recoverPassword: Function;
    recoverPassword(event: SyntheticEvent): void {
        event.preventDefault();
        this.props.userRecoverPassword(this.state.email);
    }

    props: Props;

    render() {
        const { intl, user } = this.props;
        const formatMessage: Function = intl.formatMessage;
        const recoverPwdSuccess = user.recoverPwdSuccess;
        const recoverPwdError = user.recoverPwdError;
        const previousLocation = this.props.previousLocation || '/';

        let globalError: ?Element = null;
        let emailError: string = '';
        let passwordError: string = '';
        let recoverMessage = null;

        // @FIX: Спец. аккаунты пока отправляем на старую версию сайта
        if (user.email) {
            if (user.group === 'users') {
                return <Redirect to={previousLocation} />;
            }

            window.location.replace(`//${window.location.host}/ru`);
        }

        if (user.error) {
            switch (user.error) {
                case 'email':
                    emailError = formatMessage({ id: 'site.pages.login.errorEmail' });
                    break;
                case 'password':
                    passwordError = formatMessage({ id: 'site.pages.login.errorPassword' });
                    break;
                default:
                    globalError = (
                        <p className={styles.error}>
                            <FormattedMessage id="site.pages.login.errorGlobal" />
                        </p>
                    );
            }
        }

        const recoverLink = this.state.email && Validation.isValidEmail(this.state.email) ?
            (
                <a
                    href={undefined}
                    className={styles.recoverPwdLink}
                    onClick={this.recoverPassword}
                >
                    <FormattedMessage id="site.pages.login.recoverPwdLink" />
                </a>
            ) : (
                <Link className={styles.recoverPwdLink} to="/recover-password">
                    <FormattedMessage id="site.pages.login.recoverPwdLink" />
                </Link>
            );

        if (recoverPwdSuccess) {
            recoverMessage = (<p className={styles.success}>
                <FormattedMessage id="site.pages.login.recoverPwdSuccess" />
            </p>);
        }
        if (recoverPwdError) {
            const msgId = recoverPwdError === 'email' ?
                'site.pages.recoverPwd.errorEmail' : 'site.pages.recoverPwd.errorGlobal';
            recoverMessage = (<p className={styles.error}>
                <FormattedMessage id={msgId} />
            </p>);
        }


        return (
            <Form formClass={styles.root} submit={this.onSubmit}>
                <p className={styles.title}><FormattedMessage id="site.pages.login.title" /></p>
                {globalError}
                <LabeledInput
                    className={styles.inputRow}
                    defaultValue={recoverPwdSuccess || ''}
                    type="email"
                    name="email"
                    id="userEmail"
                    label={formatMessage({ id: 'site.pages.login.email' })}
                    onChange={this.onChangeEmail}
                    error={emailError}
                    autoFocus={!recoverPwdSuccess}
                    required
                />
                <LabeledInput
                    className={styles.inputRow}
                    type="password"
                    name="password"
                    id="userPassword"
                    label={formatMessage({ id: 'site.pages.login.password' })}
                    onChange={this.onChangePassword}
                    error={passwordError}
                    autoFocus={!!recoverPwdSuccess}
                    required
                />

                <Button
                    buttonClass={styles.submitBtn}
                    size="big"
                    type="submit"
                >
                    <FormattedMessage id="site.pages.login.loginBtn" />
                </Button>
                { recoverMessage || recoverLink }

                <Link to={previousLocation} className={styles.closeButton}>
                    <img src="/static/images/close-grey.svg" alt="" />
                </Link>
            </Form>
        );
    }
}

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(LoginForm)));
