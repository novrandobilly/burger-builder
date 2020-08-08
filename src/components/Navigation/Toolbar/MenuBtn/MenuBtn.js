import React from 'react';

import classes from './MenuBtn.module.css';

const menuBtn = (props) => {
    return (
        <div className={classes.MobileOnly}>
            <span className={classes.HamburgerIcon} onClick={props.toggle}>
                <div />
                <div />
                <div />
            </span>
        </div>
    );
};

export default menuBtn;
