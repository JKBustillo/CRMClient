import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <Layout>
            <h1 className="text-center text-2xl text-white font-light">Register</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Last name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                            value="Register"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
}
 
export default Register;