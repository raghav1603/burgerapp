import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modals/Modals'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount() {
        this.props.onInitIngredient()
        // axios.get('https://burger-app-f455e.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({ ingredient: res.data })
        //     })
        //     .catch(err => {
        //         this.setState({ error: true })
        //     })
    }
    updatePurchaseState(ingredient) {
        // const purchaseable = { ...this.state.ingredient }
        const sum = Object.keys(ingredient)
            .map(key => {
                return ingredient[key]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0

    }

    purcaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }


    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push("/checkout")
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;
        let orderSummary = null
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        isPurchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purcaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredient={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        return (
            <Aux>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));