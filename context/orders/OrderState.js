import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    PRODUCTS_AMOUNT
} from '../../types/';

const OrderState = ({children}) => {
    const initialState = {
        client: {},
        products: [],
        total: 0
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    const addClient = client => {
        console.log(client);

        dispatch({
            type: SELECT_CLIENT,
            payload: client
        });
    };

    const addProducts = products => {
        console.log(products);

        dispatch({
            type: SELECT_PRODUCT,
            payload: products
        });
    };

    return (
        <OrderContext.Provider
            value={{
                addClient,
                addProducts
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
 
export default OrderState;