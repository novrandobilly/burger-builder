import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map((key, index) => {
            return (
                <li key={key.concat(index)}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>:{' '}
                    {this.props.ingredients[key]}
                </li>
            );
        });
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>Delicios Burger with the following ingredients</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    <strong>Total Price: {this.props.price}</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>
                    CANCEL
                </Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>
                    CONTINUE
                </Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;
