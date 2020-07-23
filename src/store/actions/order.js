import * as actionTypes from "./actionsTypes";
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(res => {
                // this.setState({ loading: false })

                dispatch(purchaseBurgerSuccess(res.data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })

    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: order
    }
}

export const fetchorderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                } 
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchorderFail(err))
            });
    }
}