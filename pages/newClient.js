import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NEW_CLIENT = gql`
    mutation newClient($input: ClientInput) {
        newClient(input: $input) {
            id
            name
            lastName
            enterprise
            email
            telephone
        }
    }
`;

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

const NewClient = () => {
    const router = useRouter();

    const [newClient] = useMutation(NEW_CLIENT, {
        update(cache, { data: { newClient } }) {
            const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_USER });

            cache.writeQuery({
                query: GET_CLIENTS_USER,
                data: {
                    getClientsSeller: [...getClientsSeller, newClient]
                }
            });
        }
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            enterprise: '',
            email: '',
            telephone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Client's name is required"),
            lastName: Yup.string()
                .required("Client's lastname is required"),
            email: Yup.string()
                .email('Email is not valid')
                .required("Client's email is required"),
            enterprise: Yup.string()
                .required("Enterprise is required")
        }),
        onSubmit: async values => {
            const { name, lastName, enterprise, email, telephone } = values;

            try {
                const { data } = await newClient({
                    variables: {
                        input: {
                            name,
                            lastName,
                            enterprise,
                            email,
                            telephone
                        }
                    }
                });

                console.log(data.newClient);
                router.push('/');
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                        </div>

                        { formik.touched.name && formik.errors.name && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.name}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            />
                        </div>

                        { formik.touched.lastName && formik.errors.lastName && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.lastName}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.enterprise}
                            />
                        </div>

                        { formik.touched.enterprise && formik.errors.enterprise && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.enterprise}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>

                        { formik.touched.email && formik.errors.email && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telephone}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                            value="Register client"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
}
 
export default NewClient;