import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'


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
                    placeholder: 'Your street'
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
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 6
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'express', displayValue: 'Express' },
                        { value: 'normal', displayValue: 'Normal' },
                    ]
                },
                valid: true,
                validation: {}, // this is only added cause there was an error when rules.required was called on something which is undefined 
                value: 'express' //enter a starting value so that in default case also some value is sent to server or empty string will be sent 
            }
        },
        formIsValid: false,

    }
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order)
    }
    checkValid(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid

        }
        if (rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid
        }
        return isValid
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValid(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIdentifier in updatedForm) {
            isFormValid = updatedForm[inputIdentifier].valid && isFormValid
        }

        this.setState({ orderForm: updatedForm, formIsValid: isFormValid })
    }
    render() {
        const fromElementArray = [];
        for (let key in this.state.orderForm) {
            fromElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    fromElementArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            shouldValidate={formElement.config.validation}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))
                }

                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER NOW!</Button>
            </form>

        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your details</h4>
                {form}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios))