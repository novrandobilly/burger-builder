import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
   let transformedIngredients = Object.keys(props.ingredients)
      .map((ing) => {
         return [
            ...Array(props.ingredients[ing])
         ].map((_, index) => {
            return <BurgerIngredients type={ing} key={ing + index} />;
         });
      })
      .reduce((rootEl, currEl) => {
         return rootEl.concat(currEl);
      }, []);

   if (!transformedIngredients.length) {
      transformedIngredients = <p>Please insert something delicioso...</p>;
   }

   return (
      <div className={classes.Burger}>
         <BurgerIngredients type='bread-top' />
         {transformedIngredients}
         <BurgerIngredients type='bread-bottom' />
      </div>
   );
};

export default burger;
