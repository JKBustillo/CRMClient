import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';
import OrderSummary from '../components/orders/OrderSummary';
import Total from '../components/orders/Total';
import OrderContext from '../context/orders/OrderContext';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NEW_ORDER = gql`
    mutation newOrder($input: OrderInput) {
        newOrder(input: $input) {
            id
        }
    }
`;

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

const NewOrder = () => {
    const [message, setMessage] = useState(null);
    const orderContext = useContext(OrderContext);

    const { client, products, total } = orderContext;

    const router = useRouter();

    const [newOrder] = useMutation(NEW_ORDER, {
        update(cache, { data: { newOrder } }) {
            const { getOrdersSeller } = cache.readQuery({ query: GET_ORDERS });

            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getOrdersSeller: [...getOrdersSeller, newOrder]
                }
            });
        }
    });

    const validateOrder = () => {
        return !products.every(product => product.amount > 0) || total === 0 || client.length === 0 ? " opacity-50 cursor-not-allowed " : "";
    };

    const createNewOrder = async () => {
        const order = products.map(({ stock, __typename, ...product }) => product);

        try {
            const { data } = await newOrder({
                variables: {
                    input: {
                        client: client.id,
                        total,
                        order
                    }
                }
            });

            router.push('/orders');

            Swal.fire(
                'Success!',
                'Order registered successfully!',
                'success'
            );
        } catch (error) {
            setMessage(error.message);

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        );
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New order</h1>

            { message && showMessage() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignClient />
                    <AssignProducts />
                    <OrderSummary />
                    <Total />

                    <button
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
                        onClick={() => createNewOrder()}
                    >Register order</button>
                </div>

            </div>
        </Layout>
    );
}
 
export default NewOrder;