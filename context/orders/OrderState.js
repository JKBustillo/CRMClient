import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    PRODUCTS_AMOUNT,
    UPDATE_TOTAL
} from '../../types/';

const OrderState = ({children}) => {
    const initialState = {
        client: {},
        products: [],
        total: 0
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    const addClient = client => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        });
    };

    const addProducts = products => {
        let newState;

        if (state.products.length > 0) {
            newState = products.map(product => {
                const newObject = state.products.find(productState => productState.id === product.id);
                return { ...product, ...newObject };
            });
        } else {
            newState = products;
        }

        dispatch({
            type: SELECT_PRODUCT,
            payload: newState
        });
    };

    const productAmount = newProduct => {
        dispatch({
            type: PRODUCTS_AMOUNT,
            payload: newProduct
        });
    };

    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL
        });
    };

    return (
        <OrderContext.Provider
            value={{
                client: state.client,
                products: state.products,
                total: state.total,
                addClient,
                addProducts,
                productAmount,
                updateTotal
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
 
export default OrderState;