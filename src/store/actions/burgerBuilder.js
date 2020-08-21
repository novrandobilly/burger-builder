import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = ingName => {
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
   };
};

export const removeIngredients = ingName => {
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
   };
};

const setIngredients = ingredients => {
   return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients
   };
};

const fetchIngredientsFailed = () => {
   return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED
   };
};

export const initIngredients = () => {
   return dispatch => {
      axios
         .get('https://burgerbuilder-nvn.firebaseio.com/ingredients.json')
         .then(response => {
            dispatch(setIngredients(response.data));
         })
         .catch(error => {
            dispatch(fetchIngredientsFailed());
         });
   };
};
