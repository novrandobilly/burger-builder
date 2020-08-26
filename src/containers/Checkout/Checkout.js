import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
   const checkoutCancelledHandler = () => {
      props.history.goBack();
   };

   const checkoutContinuedHandler = () => {
      props.history.replace('/checkout/contact-data');
   };

   let summary = <Redirect to='/' />;
   if (props.ing) {
      const purchasedRedirect =
         props.purchased ? <Redirect to='/' /> :
         null;
      summary = (
         <div>
            {purchasedRedirect}
            <CheckoutSummary
               ingredients={props.ing}
               checkoutCancelled={checkoutCancelledHandler}
               checkoutContinued={checkoutContinuedHandler}
            />
            <Route path={`${props.match.url}/contact-data`} component={ContactData} />
         </div>
      );
   }
   return summary;
};

const mapStateToProps = state => {
   return {
      ing       : state.burgerBuilder.ingredients,
      purchased : state.order.purchased
   };
};

export default connect(mapStateToProps)(Checkout);
