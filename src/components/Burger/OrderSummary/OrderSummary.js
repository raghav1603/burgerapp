import React from 'react';
import Aux from '../../../hoc/Auxi'
import Button from '../../UI/Button/Button'


const orderSummary = (props) => {
    let ingredients = Object.keys(props.ingredient).map((igKey) => {
        return <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> : {props.ingredient[igKey]}
        </li>
    })
    return (< Aux >
        <h3>Your Order:</h3>
        <p>Your Burger Includes</p>
        <ul>
            {ingredients}
        </ul>
        <p><strong>TOTAL PRICE : $  {props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux >
    )

}

export default orderSummary;