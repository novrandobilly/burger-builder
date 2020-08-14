import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/action';

class BurgerBuilder extends Component {
   state = {
      purchaseMode: false,
      loading: false,
      error: false
   };

   componentDidMount () {
      // axios
      //    .get('https://burgerbuilder-nvn.firebaseio.com/ingredients.json')
      //    .then(response => {
      //       const ingredientsDB = {
      //          ...response.data
      //       };
      //       this.setState({ ingredients: ingredientsDB });
      //    })
      //    .catch(error => {
      //       this.setState({ error });
      //    });
   }

   updatePurchaseHandler = ingredients => {
      const sum = Object.keys(ingredients)
         .map(key => {
            return ingredients[key];
         })
         .reduce((sum, el) => {
            return sum + el;
         }, 0);

      return sum > 0;
   };

   purchaseModeHandler = () => {
      this.setState({ purchaseMode: true });
   };

   modalClosedHandler = () => {
      this.setState({ purchaseMode: false });
   };

   purchaseContinueHandler = () => {
      this.props.history.push('/checkout');
   };

   render () {
      //   console.log(this.props);
      const disabledInfo = {
         ...this.props.ing
      };

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] < 1;
      }

      let orderSummary = null;

      let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

      if (this.props.ing) {
         burger = (
            <Auxiliary>
               <Burger ingredients={this.props.ing} />
               <BuilderControls
                  ingredientAdded={ingName => this.props.onAddIngredient(ingName)}
                  ingredientRemoved={ingName => this.props.onRemoveIngredient(ingName)}
                  disabled={disabledInfo}
                  price={this.props.prc}
                  purchaseable={this.updatePurchaseHandler(this.props.ing)}
                  ordered={this.purchaseModeHandler}
               />
            </Auxiliary>
         );

         orderSummary = (
            <OrderSummary
               ingredients={this.props.ing}
               purchaseCancel={this.modalClosedHandler}
               purchaseContinue={this.purchaseContinueHandler}
               price={this.props.prc.toFixed(2)}
            />
         );
      }
      if (this.state.loading) {
         orderSummary = <Spinner />;
      }

      return (
         <Auxiliary>
            <Modal show={this.state.purchaseMode} modalClosed={this.modalClosedHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </Auxiliary>
      );
   }
}

const mapStateToProps = state => {
   return {
      ing: state.ingredients,
      prc: state.totalPrice
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onAddIngredient: ingredientName =>
         dispatch({
            type: actionType.ADD_INGREDIENT,
            ingredientName: ingredientName
         }),
      onRemoveIngredient: ingredientName =>
         dispatch({
            type: actionType.REMOVE_INGREDIENT,
            ingredientName: ingredientName
         })
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
