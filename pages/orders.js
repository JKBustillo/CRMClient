import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Order from '../components/Order';

const GET_ORDERS = gql`
    query getOrdersSeller {
        getOrdersSeller {
            id
            order {
                id
                amount
                name
            }
            client {
                id
                name
                lastName
                email
                telephone
            }
            seller
            total
            state
        }
    }
`;

const Orders = () => {
    const { data, loading, error} = useQuery(GET_ORDERS);

    if (loading) return 'Loading...';
    
    const { getOrdersSeller } = data;

    console.log(data);
    console.log(loading);
    console.log(error);

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

                <Link href="/newOrder">
                    <a className="bg-blue-800 py-2 px-5 mt-3 mb-3 inline-block text-white rounded text-sm uppercase font-bold hover:bg-gray-800 w-full lg:w-auto text-center">New Order</a>
                </Link>

                { getOrdersSeller.length === 0 ? (
                    <p className="mt-5 text-center text-2xl"> No orders yet</p>
                ) : (
                    getOrdersSeller.map(order => (
                        <Order
                            key={order.id}
                            order={order}
                        />
                    ))
                )}
            </Layout>
        </div>
    )
}
 
export default Orders;