import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidityHandler } from '../../shared/utility';

const Auth = props => {
   const [ controls, setControls ] = useState({
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
   });

   const [ isSignUp, setIsSignUp ] = useState(true);

   const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;
   useEffect(
      () => {
         if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
         }
      },
      [ onSetAuthRedirectPath, buildingBurger, authRedirectPath ]
   );

   const inputChangeHandler = (event, controlName) => {
      const updatedControls = updateObject(controls, {
         [controlName] : updateObject(controls[controlName], {
            value   : event.target.value,
            valid   : checkValidityHandler(event.target.value, controls[controlName].validation),
            touched : true
         })
      });
      setControls(updatedControls);
   };

   const submitHandler = event => {
      event.preventDefault();
      props.onAuthHandler(controls.email.value, controls.password.value, isSignUp);
   };

   const switchAuthHandler = () => setIsSignUp(prevState => !prevState);

   //Converting the controls state above into an array of objects
   const formElement = [];
   for (let key in controls) {
      formElement.push({
         id    : key,
         setup : controls[key]
      });
   }

   //Loop to create element array
   let form = formElement.map(elem => {
      return (
         <Input
            key={elem.id}
            invalid={!elem.setup.valid}
            shouldValidate={elem.setup.validation}
            changed={event => inputChangeHandler(event, elem.id)}
            elementType={elem.setup.elementType}
            touched={elem.setup.touched}
            elementConfig={elem.setup.elementConfig}
            value={elem.setup.value}
         />
      );
   });

   if (props.loading) {
      form = <Spinner />;
   }

   let errorMessage = null;

   if (props.error) {
      errorMessage = <p>{props.error.message}</p>;
   }

   let authRedirect = null;
   if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />;
   }

   return (
      <div className={classes.Auth}>
         {authRedirect}
         {errorMessage}
         <form onSubmit={submitHandler}>
            {form}
            <Button btnType='Success'>
               {
                  isSignUp ? 'Sign Up' :
                  'Sign In'}
            </Button>
         </form>
         <Button clicked={switchAuthHandler} btnType='Danger'>
            Switch to{' '}
            {
               isSignUp ? 'Sign In' :
               'Sign Up'}
         </Button>
      </div>
   );
};

const mapStateToProps = state => {
   return {
      loading          : state.auth.loading,
      error            : state.auth.error,
      isAuthenticated  : state.auth.token !== null,
      authRedirectPath : state.auth.authRedirectPath,
      buildingBurger   : state.burgerBuilder.building
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onAuthHandler         : (email, password, isSignUp) =>
         dispatch(actions.auth(email, password, isSignUp)),
      onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
