import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuBtn from '../Toolbar/MenuBtn/MenuBtn';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <MenuBtn toggle={props.toggleSideDrawer} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;
