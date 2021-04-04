import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';   

const GET_CLIENTS_USER = gql`
    query getClientsSeller{
        getClientsSeller {
            id
            name
            lastName
            enterprise
            email
        }
    }
`;

const AssignClient = () => {
    const [client, setClient] = useState([]);

    const orderContext = useContext(OrderContext);
    const { addClient } = orderContext;

    const { data, loading, error } = useQuery(GET_CLIENTS_USER);

    useEffect(() => {
        addClient(client);
    }, [client]);

    const selectClient = client => {
        setClient(client);
    };

    if (loading) return null;

    const { getClientsSeller } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1. Assign a client to the order</p>
            <Select
                className="mt-3"
                options={getClientsSeller}
                onChange={(option) => selectClient(option)}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.name} ${options.lastName}`}
            />
        </>
    );
}
 
export default AssignClient;