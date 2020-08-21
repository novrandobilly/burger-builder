import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationElement from './NavigationElement/NavigationElement';

const navigationItems = (props) => {
   return (
      <ul className={classes.NavigationItems}>
         <NavigationElement link='/' exact>
            Burger Builder
         </NavigationElement>
         {
            props.isAuthenticated ? <NavigationElement link='/orders'>Orders</NavigationElement> :
            null}
         {
            props.isAuthenticated ? <NavigationElement link='/logout'>Log Out</NavigationElement> :
            <NavigationElement link='/auth'>Auth</NavigationElement>}
      </ul>
   );
};

export default navigationItems;
