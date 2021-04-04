import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_CLIENTS_USER = gql`
    query getUser {
        getUser {
            id
            name
            lastName
        }
    }
`;

const Header = () => {
    const router = useRouter();

    const { data, loading } = useQuery(GET_CLIENTS_USER);

    if (loading) return null;

    if (!data) {
        return router.push('/login');
    }

    const { name, lastName } = data.getUser;

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="flex justify-between mb-5">
            <p className="mr-2">Hola, {name} {lastName}</p>

            <button
                onClick={() => logout()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Log Out
            </button>
        </div>
    );
}
 
export default Header;