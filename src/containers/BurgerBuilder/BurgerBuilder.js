import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
   const [ purchaseMode, setPurchaseMode ] = useState(false);

   const dispatch = useDispatch();

   const ing = useSelector(state => state.burgerBuilder.ingredients);
   const prc = useSelector(state => state.burgerBuilder.totalPrice);
   const err = useSelector(state => state.burgerBuilder.error);
   const isAuthenticated = useSelector(state => state.auth.token !== null);

   const onAddIngredient = ingredientName => dispatch(actions.addIngredients(ingredientName));
   const onRemoveIngredient = ingredientName => dispatch(actions.removeIngredients(ingredientName));
   const onInitIngredient = useCallback(() => dispatch(actions.initIngredients()), [ dispatch ]);
   const onInitPurchase = () => dispatch(actions.purchaseInit());
   const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

   useEffect(
      () => {
         onInitIngredient();
      },
      [ onInitIngredient ]
   );

   const updatePurchaseHandler = ingredients => {
      const sum = Object.keys(ingredients)
         .map(key => {
            return ingredients[key];
         })
         .reduce((sum, el) => {
            return sum + el;
         }, 0);

      return sum > 0;
   };

   const purchaseModeHandler = () => {
      if (isAuthenticated) {
         setPurchaseMode(true);
      } else {
         onSetAuthRedirectPath('/checkout');
         props.history.push('/auth');
      }
   };

   const modalClosedHandler = () => {
      setPurchaseMode(false);
   };

   const purchaseContinueHandler = () => {
      onInitPurchase();
      props.history.push('/checkout');
   };

   const disabledInfo = {
      ...ing
   };

   for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
   }

   let orderSummary = null;

   let burger =
      err ? <p>Ingredients can't be loaded</p> :
      <Spinner />;

   if (ing) {
      burger = (
         <Auxiliary>
            <Burger ingredients={ing} />
            <BuilderControls
               ingredientAdded={ingName => onAddIngredient(ingName)}
               ingredientRemoved={ingName => onRemoveIngredient(ingName)}
               disabled={disabledInfo}
               price={prc}
               purchaseable={updatePurchaseHandler(ing)}
               isAuth={isAuthenticated}
               ordered={purchaseModeHandler}
            />
         </Auxiliary>
      );

      orderSummary = (
         <OrderSummary
            ingredients={ing}
            purchaseCancel={modalClosedHandler}
            purchaseContinue={purchaseContinueHandler}
            price={prc}
         />
      );
   }

   return (
      <Auxiliary>
         <Modal show={purchaseMode} modalClosed={modalClosedHandler}>
            {orderSummary}
         </Modal>
         {burger}
      </Auxiliary>
   );
};

export default withErrorHandler(BurgerBuilder, axios);
