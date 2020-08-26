import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
   const [
      sideDrawer,
      setSideDrawer
   ] = useState(false);

   const sideDrawerClosedHandler = () => {
      setSideDrawer(false);
   };

   const toggleSideDrawerHandler = () => {
      setSideDrawer(prevState => ({ sideDrawer: !prevState.sideDrawer }));
   };

   return (
      <Auxiliary>
         <Toolbar toggleSideDrawer={toggleSideDrawerHandler} isAuth={props.isAuthenticated} />
         <SideDrawer
            closed={sideDrawerClosedHandler}
            show={sideDrawer}
            isAuth={props.isAuthenticated}
         />
         <main className={classes.Content}>{props.children}</main>
      </Auxiliary>
   );
};

const mapStateToProps = state => {
   return {
      isAuthenticated : state.auth.token !== null
   };
};

export default connect(mapStateToProps)(Layout);
