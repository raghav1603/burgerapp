import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/ChekoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchsedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchsedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary
        //         {/* <CheckoutSummary
        //             ingredients={this.props.ings}
        //             checkoutCancelled={this.checkoutCancelledHandler}
        //             checkoutContinued={this.checkoutContinuedHandler} /> */}
        // {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */ }
        // {/* we didnt use component here because we wanted to send props , so using render  */ }

        // {/* <Route
        //             path={this.props.match.path + '/contact-data'}
        //             component={ContactData}
        //         /> */}


    }
}
const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        purchased: state.order.purchased
    }
}
export default connect(mapStatetoProps)(Checkout)