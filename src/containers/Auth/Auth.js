import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidityHandler } from '../../shared/utility';

class Auth extends Component {
   state = {
      controls : {
         email    : {
            elementType   : 'input',
            elementConfig : {
               type        : 'email',
               placeholder : 'Email Address'
            },
            value         : '',
            validation    : {
               required : true,
               isEmail  : true
            },
            valid         : false,
            touched       : false
         },
         password : {
            elementType   : 'input',
            elementConfig : {
               type        : 'password',
               placeholder : 'Password'
            },
            value         : '',
            validation    : {
               required  : true,
               minLength : 6
            },
            valid         : false,
            touched       : false
         }
      },
      isSignUp : true
   };

   componentDidMount () {
      if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
         this.props.onSetAuthRedirectPath();
      }
   }

   inputChangeHandler = (event, controlName) => {
      const updatedControls = updateObject(this.state.controls, {
         [controlName] : updateObject(this.state.controls[controlName], {
            value   : event.target.value,
            valid   : checkValidityHandler(event.target.value, this.state.controls[controlName].validation),
            touched : true
         })
      });
      this.setState({ controls: updatedControls });
   };

   submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuthHandler(
         this.state.controls.email.value,
         this.state.controls.password.value,
         this.state.isSignUp
      );
   };

   switchAuthHandler = () => {
      this.setState((prevState) => {
         return { isSignUp: !prevState.isSignUp };
      });
   };

   render () {
      //Converting the controls state above into an array of objects
      const formElement = [];
      for (let key in this.state.controls) {
         formElement.push({
            id    : key,
            setup : this.state.controls[key]
         });
      }

      //Loop to create element array
      let form = formElement.map((elem) => {
         return (
            <Input
               key={elem.id}
               invalid={!elem.setup.valid}
               shouldValidate={elem.setup.validation}
               changed={(event) => this.inputChangeHandler(event, elem.id)}
               elementType={elem.setup.elementType}
               touched={elem.setup.touched}
               elementConfig={elem.setup.elementConfig}
               value={elem.setup.value}
            />
         );
      });

      if (this.props.loading) {
         form = <Spinner />;
      }

      let errorMessage = null;

      if (this.props.error) {
         errorMessage = <p>{this.props.error.message}</p>;
      }

      let authRedirect = null;
      if (this.props.isAuthenticated) {
         authRedirect = <Redirect to={this.props.authRedirectPath} />;
      }

      return (
         <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
               {form}
               <Button btnType='Success'>
                  {
                     this.state.isSignUp ? 'Sign Up' :
                     'Sign In'}
               </Button>
            </form>
            <Button clicked={this.switchAuthHandler} btnType='Danger'>
               Switch to{' '}
               {
                  this.state.isSignUp ? 'Sign In' :
                  'Sign Up'}
            </Button>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      loading          : state.auth.loading,
      error            : state.auth.error,
      isAuthenticated  : state.auth.token !== null,
      authRedirectPath : state.auth.authRedirectPath,
      buildingBurger   : state.burgerBuilder.building
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      onAuthHandler         : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
      onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
