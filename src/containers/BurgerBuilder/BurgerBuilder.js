import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad  : 0.5,
    cheese : 0.4,
    meat   : 1.3,
    bacon  : 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients  : {
            salad  : 0,
            bacon  : 0,
            cheese : 0,
            meat   : 0
        },
        totalPrice   : 4,
        purchaseable : false,
        purchaseMode : false,
        loading      : false
    };

    updatePurchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchaseable: sum > 0 ? true : false});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddition + oldPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseHandler(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 1) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseHandler(updatedIngredients);
    };

    purchaseModeHandler = () => {
        this.setState({purchaseMode: true});
    };

    modalClosedHandler = () => {
        this.setState({purchaseMode: false});
    };

    purchaseContinueHandler = () => {
        // alert('You Continue!!!');
        this.setState({loading: true});
        const order = {
            ingredients    : this.state.ingredients,
            price          : this.state.totalPrice.toFixed(2),
            customer       : {
                name    : 'Novrando Linci',
                address : {
                    street  : 'Ciumbuleuit',
                    zipCode : '414048',
                    city    : 'Bandung'
                },
                email   : 'novrandobilly10@gmail.com'
            },
            deliveryMethod : 'JNE Reg'
        };

        axios
            .post('/orders.json', order)
            .then(() => {
                this.setState({loading: false, purchaseMode: false});
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading: false, purchaseMode: false});
            });
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.modalClosedHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)}
            />
        );

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchaseMode} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuilderControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseModeHandler}
                />
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
