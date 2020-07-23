 import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const setIngredient = (ingredient) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredient: ingredient
    }
}

export const fetch_ingredient_failed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-app-f455e.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredient(res.data))
            })
            .catch(err => {
                dispatch(fetch_ingredient_failed())
            })

    }
}