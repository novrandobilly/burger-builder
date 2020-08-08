import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    const SDClass = [
        classes.SideDrawer,
        props.show ? classes.Open : classes.Closed
    ].join(' ');

    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={SDClass}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;
