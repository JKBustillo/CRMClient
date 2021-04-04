import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const UPDATE_ORDER = gql`
    mutation updateOrder($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
            state
        }
    }
`;

const DELETE_ORDER = gql`
    mutation deleteOrder($id: ID!) {
        deleteOrder(id: $id)
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

const Order = ({ order }) => {
    const { id, total, client: { name, lastName, email, telephone }, state, client } = order;

    const [updateOrder] = useMutation(UPDATE_ORDER);
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(cache) {
            const { getOrdersSeller } = cache.readQuery({ query: GET_ORDERS });

            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getOrdersSeller: getOrdersSeller.filter( currentClient => currentClient.id !== id)
                }
            });
        }
    });

    const [orderState, setOrderState] = useState(state);
    const [divClass, setDivClass] = useState('');

    useEffect(() => {
        if (orderState) setOrderState(orderState);
        orderClass();
    }, [orderState]);

    const orderClass = () => {
        if (orderState === "PENDING") {
            setDivClass('border-yellow-500');
        } else if (orderState === "COMPLETED") {
            setDivClass('border-green-500');
        } else {
            setDivClass('border-red-800');
        }
    };

    const changeOrderState = async newState => {
        try {
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        state: newState,
                        client: client.id
                    }
                }
            });

            setOrderState(data.updateOrder.state);
        } catch (error) {
            console.log(error);
        }
    };

    const confirmDeleteOrder = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deleteOrder({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Deleted!',
                        data.deleteOrder,
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    return (
        <div className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg border-t-4 ${divClass}`}>
            <div>
                <p className="font-bold text-gray-800">Client: {`${name} ${lastName}`}</p>

                { email && (
                    <p className="flex items-center my-2">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {email}
                    </p>
                )}

                { telephone && (
                    <p className="flex items-center my-2">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {telephone}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10">Order state: </h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus: border-blue-500 uppercase text-xs font-bold"
                    value={orderState}
                    onChange={e => changeOrderState(e.target.value)}
                >
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Order summary</h2>
                { order.order.map(article => (
                    <div
                        key={article.id}
                        className="mt-4"
                    >
                        <p className="text-sm text-gray-600">Product: {article.name}</p>
                        <p className="text-sm text-gray-600">Amount: {article.amount}</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">Total:
                    <span className="font-light"> $ {total}</span>
                </p>

                <button
                    className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold"
                    onClick={() => confirmDeleteOrder()}
                >
                    Delete order

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Order;