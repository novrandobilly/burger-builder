import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const MyOrders = props => {
   const { token, userId, onFetchOrders } = props;
   useEffect(
      () => {
         onFetchOrders(token, userId);
      },
      [ token, userId, onFetchOrders ]
   );

   let orders = <Spinner />;
   if (!props.loading) {
      orders = props.orders.map(order => {
         return (
            <Order key={order.id} ingredients={order.ingredients} price={order.price.toFixed(2)} />
         );
      });
   }
   return <div>{orders}</div>;
};

const mapStateToProps = state => {
   return {
      orders  : state.order.orders,
      loading : state.order.loading,
      token   : state.auth.token,
      userId  : state.auth.userId
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MyOrders, axios));
