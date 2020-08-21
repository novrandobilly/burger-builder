import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
   state = {
      purchaseMode: false,
   };

   componentDidMount() {
      this.props.onInitIngredient();
   }

   updatePurchaseHandler = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map((key) => {
            return ingredients[key];
         })
         .reduce((sum, el) => {
            return sum + el;
         }, 0);

      return sum > 0;
   };

   purchaseModeHandler = () => {
      if (this.props.isAuthenticated) {
         this.setState({ purchaseMode: true });
      } else {
         this.props.onSetAuthRedirectPath('/checkout');
         this.props.history.push('/auth');
      }
   };

   modalClosedHandler = () => {
      this.setState({ purchaseMode: false });
   };

   purchaseContinueHandler = () => {
      this.props.onInitPurchase();
      this.props.history.push('/checkout');
   };

   render() {
      const disabledInfo = {
         ...this.props.ing,
      };

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] < 1;
      }

      let orderSummary = null;

      let burger = this.props.err ? (
         <p>Ingredients can't be loaded</p>
      ) : (
         <Spinner />
      );

      if (this.props.ing) {
         burger = (
            <Auxiliary>
               <Burger ingredients={this.props.ing} />
               <BuilderControls
                  ingredientAdded={(ingName) =>
                     this.props.onAddIngredient(ingName)
                  }
                  ingredientRemoved={(ingName) =>
                     this.props.onRemoveIngredient(ingName)
                  }
                  disabled={disabledInfo}
                  price={this.props.prc}
                  purchaseable={this.updatePurchaseHandler(this.props.ing)}
                  isAuth={this.props.isAuthenticated}
                  ordered={this.purchaseModeHandler}
               />
            </Auxiliary>
         );

         orderSummary = (
            <OrderSummary
               ingredients={this.props.ing}
               purchaseCancel={this.modalClosedHandler}
               purchaseContinue={this.purchaseContinueHandler}
               price={this.props.prc}
            />
         );
      }

      return (
         <Auxiliary>
            <Modal
               show={this.state.purchaseMode}
               modalClosed={this.modalClosedHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </Auxiliary>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      ing: state.burgerBuilder.ingredients,
      prc: state.burgerBuilder.totalPrice,
      err: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      onAddIngredient: (ingredientName) =>
         dispatch(actions.addIngredients(ingredientName)),
      onRemoveIngredient: (ingredientName) =>
         dispatch(actions.removeIngredients(ingredientName)),
      onInitIngredient: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path) =>
         dispatch(actions.setAuthRedirectPath(path)),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
