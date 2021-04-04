import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';
import OrderContext from '../context/orders/OrderContext';

const NewOrder = () => {
    const orderContext = useContext(OrderContext);
    
    const {  } = orderContext;

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New order</h1>

            <AssignClient />

            <AssignProducts />
        </Layout>
    );
}
 
export default NewOrder;