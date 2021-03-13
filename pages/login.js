import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const AUTH = gql`
    mutation userAuth($input: AuthInput) {
        userAuth(input: $input) {
            token
        }
    }
`;

const Login = () => {
    const [message, setMessage] = useState(null);

    const router = useRouter();

    const [userAuth] = useMutation(AUTH);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email is not valid')
                .required('Email is required'),
            password: Yup.string()
                .required("Password can't be empty")
        }),
        onSubmit: async values => {
            const { email, password } = values;

            try {
                const { data } = await userAuth({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });

                const { token } = data.userAuth;

                localStorage.setItem('token', token);

                router.push('/');
            } catch (error) {
                setMessage(error.message);

                setTimeout(() => {
                    setMessage(null);
                }, 4000);
            }
        }
    });

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    };

    return (
        <Layout>
            <h1 className="text-center text-2xl text-white font-light">Login</h1>

            { message && showMessage() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                id="password"
                                placeholder={"Password"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>

                        { formik.touched.password && formik.errors.password && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        )}

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                            value="Log In"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
}
 
export default Login;