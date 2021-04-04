import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';  

const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            id
            name
            price
            stock
        }
    }
`;

const AssignProducts = () => {
    const [products, setProducts] = useState([]);

    const { data, loading, error } = useQuery(GET_PRODUCTS);

    const orderContext = useContext(OrderContext);
    const { addProducts } = orderContext;

    useEffect(() => {
        addProducts(products);
    }, [products]);

    const selectProduct = product => {
        setProducts(product);
    };

    if (loading) return null;

    const { getProducts } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2. Choose or search for the products</p>
            <Select
                className="mt-3"
                options={getProducts}
                isMulti={true}
                onChange={(option) => selectProduct(option)}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.name} - ${options.stock} left in stock`}
            />
        </>
    );
}
 
export default AssignProducts;