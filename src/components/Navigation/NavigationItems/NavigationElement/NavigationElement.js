import React from 'react';

import classes from './NavigationElement.module.css';

const navigationElement = (props) => {
    return (
        <li className={classes.NavigationElement}>
            <a href={props.link} className={props.active ? classes.active : null}>
                {props.children}
            </a>
        </li>
    );
};

export default navigationElement;
