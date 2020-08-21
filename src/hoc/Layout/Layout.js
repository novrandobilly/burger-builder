import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
   state = {
      showSideDrawer : false
   };

   sideDrawerClosedHandler = () => {
      this.setState({ showSideDrawer: false });
   };

   toggleSideDrawerHandler = () => {
      this.setState((prevState) => {
         return { showSideDrawer: !prevState.showSideDrawer };
      });
   };

   render () {
      return (
         <Auxiliary>
            <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} isAuth={this.props.isAuthenticated} />
            <SideDrawer
               closed={this.sideDrawerClosedHandler}
               show={this.state.showSideDrawer}
               isAuth={this.props.isAuthenticated}
            />
            <main className={classes.Content}>{this.props.children}</main>
         </Auxiliary>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isAuthenticated : state.auth.token !== null
   };
};

export default connect(mapStateToProps)(Layout);
