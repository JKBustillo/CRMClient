import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_CLIENT = gql`
    query getClient($id: ID!) {
        getClient(id:$id) {
            name
            lastName
            email
            enterprise
            telephone
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            name
        }
    }
`;

const editClient = () => {
    const router = useRouter();
    const { query: { pid } } = router;

    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id: pid
        }
    });

    const [updateClient] = useMutation(UPDATE_CLIENT);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Client's name is required"),
        lastName: Yup.string()
            .required("Client's lastname is required"),
        email: Yup.string()
            .email('Email is not valid')
            .required("Client's email is required"),
        enterprise: Yup.string()
            .required("Enterprise is required")
    });

    if (loading) return 'Loading...';

    const { getClient } = data;

    const updateClientInfo = async values => {
        const { name, lastName, email, enterprise, telephone } = values;

        try {
            const { data } = await updateClient({
                variables: {
                    id: pid,
                    input: {
                        name,
                        lastName,
                        email,
                        enterprise,
                        telephone
                    }
                }
            });

            Swal.fire(
                'Client updated!',
                'Client info has been updated successfully.',
                'success'
            );

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={getClient}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            updateClientInfo(values);
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="lastName"
                                            placeholder={"Last Name"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.lastName}
                                        />
                                    </div>

                                    { props.touched.lastName && props.errors.lastName && (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.lastName}</p>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enterprise">
                                            Enterprise
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="enterprise"
                                            placeholder={"Enterprise"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.enterprise}
                                        />
                                    </div>

                                    { props.touched.enterprise && props.errors.enterprise && (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.enterprise}</p>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="email"
                                            id="email"
                                            placeholder={"Email address"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                    </div>

                                    { props.touched.email && props.errors.email && (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                                            Telephone
                                        </label>
                                        <input
                                            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="tel"
                                            id="telephone"
                                            placeholder={"Telephone"}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.telephone}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                                        value="Edit client"
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
 
export default editClient;