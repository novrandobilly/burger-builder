import React from 'react';
import classes from './BuilderControls.module.css';
import BuildControlElement from './BuildControlElement/BuildControlElement';

const controls = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'bacon' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' }
];

const builderControls = (props) => {
   return (
      <div className={classes.BuilderControls}>
         <p>
            Current Price: <strong>$ {props.price.toFixed(2)}</strong>{' '}
         </p>
         {controls.map((elem) => {
            return (
               <BuildControlElement
                  type={elem.type}
                  key={elem.label}
                  label={elem.label}
                  added={() => props.ingredientAdded(elem.type)}
                  removed={() => props.ingredientRemoved(elem.type)}
                  disabled={props.disabled[elem.type]}
               />
            );
         })}
         <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>
            {
               props.isAuth ? 'ORDER NOW' :
               'SIGN UP TO ORDER'}
         </button>
      </div>
   );
};

export default builderControls;
