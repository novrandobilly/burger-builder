import React from 'react';

import burgerLogo from '../../assets/Images/LeonardaBurger.png';
import classes from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt='LeonardaBurger' />
        </div>
    );
};

export default logo;
