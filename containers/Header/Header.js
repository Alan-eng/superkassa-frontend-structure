// @flow

import React from 'react';
import type { Children } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Component } from 'flow';
import Logo from '../../components/Logo';
import HeaderMenu from '../../components/HeaderMenu';
import siteActions from '../../actions/siteActions';
import styles from './header.css';


type Props = {
    children?: Children,
    location: {
        pathname: string,
    },
    user: {
        email?: string, // eslint-disable-line react/no-unused-prop-types
    },
    contacts: {
        phone: string, // eslint-disable-line react/no-unused-prop-types
        supportEmail: string, // eslint-disable-line react/no-unused-prop-types
    },
    siteMenuHide: Function,
    siteMenuShow: Function,
    isShowSiteMenu: boolean,
}

const mapsStoreToProps = store => ({
    user: store.user,
    contacts: store.site.contacts,
    isShowSiteMenu: store.site.isShowSiteMenu,
});
const mapsDispatchToProps = dispatch => ({
    siteMenuShow: ():void => { dispatch(siteActions.siteMenuShow()); },
    siteMenuHide: ():void => { dispatch(siteActions.siteMenuHide()); },
});


const Header = (props: Props) => {
    let logo: Component;
    if (props.location.pathname === '/') {
        logo = <Logo className={styles.logo} />;
    } else {
        logo = <Link to="/"><Logo className={styles.logo} /></Link>;
    }

    return (
        <header className={styles.root}>
            {logo}
            {props.children}
            <HeaderMenu
                user={props.user}
                contacts={props.contacts}
                isShowSiteMenu={props.isShowSiteMenu}
                showMenu={props.siteMenuShow}
                hideMenu={props.siteMenuHide}
            />
        </header>
    );
};

Header.defaultProps = {
    children: null,
};

export default withRouter(connect(mapsStoreToProps, mapsDispatchToProps)(Header));
