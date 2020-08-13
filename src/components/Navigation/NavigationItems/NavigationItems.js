import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationElement from './NavigationElement/NavigationElement';

const navigationItems = props => {
   return (
      <ul className={classes.NavigationItems}>
         <NavigationElement link='/' exact>
            Burger Builder
         </NavigationElement>
         <NavigationElement link='/orders'>Orders</NavigationElement>
      </ul>
   );
};

export default navigationItems;
