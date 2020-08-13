import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationElement.module.css';

const navigationElement = props => {
   return (
      <li className={classes.NavigationElement}>
         <NavLink activeClassName={classes.active} exact={props.exact} to={props.link}>
            {props.children}
         </NavLink>
      </li>
   );
};

export default navigationElement;
