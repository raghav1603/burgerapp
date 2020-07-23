import * as actionTypes from '../actions/actionsTypes'
import { updatedObject } from '../utility.js'
const initalState = {
    ingredient: null,
    totalPrice: 4.0,
    error: false
}
const INGREDIENT_PRICE = {
    salad: 0.8,
    meat: 1.2,
    bacon: 0.6,
    cheese: 0.4,

}

const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredient[action.ingredientName] + 1 }
    const updatedIngredients = updatedObject(state.ingredient, updatedIngredient)
    const updatedState = {
        ingredient: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
    return updatedObject(state, updatedState);

}
const removeIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredient[action.ingredientName] - 1 }
    const updatedIngredients = updatedObject(state.ingredient, updatedIngredient)
    const updatedState = {
        ingredient: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    }
    return updatedObject(state, updatedState);

}
const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredient: {
            salad: action.ingredient.salad,
            bacon: action.ingredient.bacon,
            meat: action.ingredient.meat,
            cheese: action.ingredient.cheese
        },
        totalPrice: 4,
        error: false
    })
}
const fetchIngredientFailed = (state, action) => (updatedObject(state, { error: true }))

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);

        //     // ingredient: action.ingredient, // this will sync with firebase resulting in bad ordering of ingredients (salad is at bottom)
        //     ingredient: {
        //         salad: action.ingredient.salad,
        //         bacon: action.ingredient.bacon,
        //         meat: action.ingredient.meat,
        //         cheese: action.ingredient.cheese
        //     },
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action)

        default: return state;
    }
}

export default reducer