import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidityHandler } from '../../../shared/utility';

class ContactData extends Component {
   state = {
      orderForm   : {
         name           : {
            elementType   : 'input',
            elementConfig : {
               type        : 'text',
               placeholder : 'Your Name'
            },
            value         : '',
            validation    : {
               required : true
            },
            valid         : false,
            touched       : false
         },
         street         : {
            elementType   : 'input',
            elementConfig : {
               type        : 'text',
               placeholder : 'Street'
            },
            value         : '',
            validation    : {
               required : true
            },
            valid         : false,
            touched       : false
         },
         zipCode        : {
            elementType   : 'input',
            elementConfig : {
               type        : 'text',
               placeholder : 'Postal Code'
            },
            value         : '',
            validation    : {
               required  : true,
               minLength : 5,
               maxLength : 5
            },
            valid         : false,
            touched       : false
         },
         city           : {
            elementType   : 'input',
            elementConfig : {
               type        : 'text',
               placeholder : 'City'
            },
            value         : '',
            validation    : {
               required : true
            },
            valid         : false,
            touched       : false
         },
         email          : {
            elementType   : 'input',
            elementConfig : {
               type        : 'email',
               placeholder : 'Your Email'
            },
            value         : '',
            validation    : {
               required : true
            },
            valid         : false,
            touched       : false
         },
         deliveryMethod : {
            elementType   : 'select',
            elementConfig : {
               options : [
                  { value: 'fastest', displayVal: 'Fastest' },
                  { value: 'cheapest', displayVal: 'Cheapest' }
               ]
            },
            value         : 'fastest',
            validation    : {},
            valid         : true
         }
      },
      formIsValid : false
   };

   onChangeHandler = (event, inputIdentifier) => {
      const updatedOrderElement = updateObject(this.state.orderForm[inputIdentifier], {
         value   : event.target.value,
         valid   : checkValidityHandler(event.target.value, this.state.orderForm[inputIdentifier].validation),
         touched : true
      });

      const updatedOrderForm = updateObject(this.state.orderForm, {
         [inputIdentifier] : updatedOrderElement
      });

      let formIsValid = true;
      for (let key in updatedOrderForm) {
         formIsValid = updatedOrderForm[key].valid && formIsValid;
      }
      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
   };

   orderHandler = (event) => {
      event.preventDefault();

      const formData = {};
      for (let key in this.state.orderForm) {
         formData[key] = this.state.orderForm[key].value;
      }

      const order = {
         ingredients : this.props.ing,
         price       : this.props.prc,
         orderData   : formData,
         userId      : this.props.userId
      };

      this.props.onOrderBurger(order, this.props.token);
   };

   render () {
      const formElement = [];
      for (let key in this.state.orderForm) {
         formElement.push({
            id    : key,
            setup : this.state.orderForm[key]
         });
      }

      let form = (
         <form onSubmit={this.orderHandler}>
            {formElement.map((elem) => {
               return (
                  <Input
                     invalid={!elem.setup.valid}
                     shouldValidate={elem.setup.validation}
                     changed={(event) => this.onChangeHandler(event, elem.id)}
                     key={elem.id}
                     elementType={elem.setup.elementType}
                     touched={elem.setup.touched}
                     elementConfig={elem.setup.elementConfig}
                     value={elem.setup.value}
                  />
               );
            })}

            <Button btnType='Success' disabled={!this.state.formIsValid}>
               ORDER NOW
            </Button>
         </form>
      );

      if (this.props.loading) {
         form = <Spinner />;
      }
      return (
         <div className={classes.ContactData}>
            <h4>Enter your contact details here</h4>
            {form}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      ing     : state.burgerBuilder.ingredients,
      prc     : state.burgerBuilder.totalPrice,
      loading : state.order.loading,
      token   : state.auth.token,
      userId  : state.auth.userId
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
