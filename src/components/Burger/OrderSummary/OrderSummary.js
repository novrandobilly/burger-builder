import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
   const ingredientSummary = Object.keys(props.ingredients).map((key, index) => {
      return (
         <li key={key.concat(index)}>
            <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
         </li>
      );
   });
   return (
      <Auxiliary>
         <h3>Your Order</h3>
         <p>Delicios Burger with the following ingredients</p>
         <ul>{ingredientSummary}</ul>
         <p>
            <strong>Total Price: {props.price}</strong>
         </p>
         <p>Continue to Checkout?</p>
         <Button btnType='Danger' clicked={props.purchaseCancel}>
            CANCEL
         </Button>
         <Button btnType='Success' clicked={props.purchaseContinue}>
            CONTINUE
         </Button>
      </Auxiliary>
   );
};

export default OrderSummary;
