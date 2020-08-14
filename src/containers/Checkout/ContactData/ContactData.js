import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Postal Code'
            },
            value: '',
            validation: {
               required: true,
               minLength: 5,
               maxLength: 5
            },
            valid: false,
            touched: false
         },
         city: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'City'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your Email'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [ { value: 'fastest', displayVal: 'Fastest' }, { value: 'cheapest', displayVal: 'Cheapest' } ]
            },
            value: 'fastest',
            validation: {},
            valid: true
         }
      },
      formIsValid: false,
      loading: false
   };

   onChangeHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
         ...this.state.orderForm
      };

      const updatedOrderElement = {
         ...updatedOrderForm[inputIdentifier]
      };

      updatedOrderElement.value = event.target.value;
      updatedOrderElement.valid = this.checkValidityHandler(updatedOrderElement.value, updatedOrderElement.validation);
      updatedOrderElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedOrderElement;
      let formIsValid = true;
      for (let key in updatedOrderForm) {
         formIsValid = updatedOrderForm[key].valid && formIsValid;
      }
      console.log(formIsValid);
      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
   };

   checkValidityHandler = (value, rules) => {
      let isValid = true;

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid;
      }

      return isValid;
   };

   orderHandler = event => {
      event.preventDefault();
      this.setState({ loading: true });
      const formData = {};
      for (let key in this.state.orderForm) {
         formData[key] = this.state.orderForm[key].value;
      }

      const order = {
         ingredients: this.props.ing,
         price: this.props.prc,
         orderData: formData
      };

      axios
         .post('/orders.json', order)
         .then(() => {
            this.setState({ loading: false });
            this.props.history.push('/');
         })
         .catch(err => {
            console.log(err);
            this.setState({ loading: false });
         });
   };

   render () {
      const formElement = [];
      for (let key in this.state.orderForm) {
         formElement.push({
            id: key,
            setup: this.state.orderForm[key]
         });
      }

      let form = (
         <form onSubmit={this.orderHandler}>
            {formElement.map(elem => {
               return (
                  <Input
                     invalid={!elem.setup.valid}
                     shouldValidate={elem.setup.validation}
                     changed={event => this.onChangeHandler(event, elem.id)}
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

      if (this.state.loading) {
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

const mapStateToProps = state => {
   return {
      ing: state.ingredients,
      prc: state.totalPrice
   };
};

export default connect(mapStateToProps)(ContactData);
