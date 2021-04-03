import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            name
            price
            stock
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput) {
        updateProduct(id: $id, input: $input) {
            name
        }
    }
`;

const editProduct = () => {
    const router = useRouter();
    const { query: { pid } } = router;

    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id: pid
        }
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Product's name is required"),
        price: Yup.number()
            .integer('Price must be a number')
            .positive("Price must be a positive number")
            .required("Product's price is required"),
        stock: Yup.number()
            .integer("Stock must be a number")
            .positive("Stock must be a positive number")
            .required("Stock is required")
    });

    if (loading) return 'Loading...';

    if (!data) {
        setTimeout(() => {
            router.push('/products');
        }, 2000);

        return 'Not found.';
    }

    const { getProduct } = data;

    const updateProductInfo = async values => {
        const { name, price, stock } = values;

        try {
            const { data } = await updateProduct({
                variables: {
                    id: pid,
                    input: {
                        name,
                        price,
                        stock
                    }
                }
            });

            Swal.fire(
                'Product updated!',
                'Product info has been updated successfully.',
                'success'
            );

            router.push('/products');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Edit product</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={getProduct}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            updateProductInfo(values);
                        }}
                    >
                        { props => {
                            return (
                               
                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="name"
                                            placeholder={"Name"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                        />
                                    </div>

                                    { props.touched.name && props.errors.name && (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                            Stock
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="number"
                                            id="stock"
                                            placeholder={"Stock"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.stock}
                                        />
                                    </div>

                                    { props.touched.stock && props.errors.stock && (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.stock}</p>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Price
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="price"
                                            placeholder={"Price"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.price}
                                        />
                                    </div>

                                    { props.touched.price && props.errors.price && (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.price}</p>
                                        </div>
                                    )}

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                                        value="Edit product"
                                    />
                                </form> 
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}
 
export default editProduct;