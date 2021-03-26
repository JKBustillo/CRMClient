import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id)
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

const Client = ({ client }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache) {
            const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_USER });

            cache.writeQuery({
                query: GET_CLIENTS_USER,
                data: {
                    getClientsSeller: getClientsSeller.filter( currentClient => currentClient.id !== id)
                }
            });
        }
    });

    const { id, name, lastName, enterprise, email } = client;

    const confirmDeleteClient = () => {
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
                    const { data } = await deleteClient({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Deleted!',
                        data.deleteCLient,
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        })
    };

    return (
        <tr>
            <td className="border px-4 py-2">{name} {lastName}</td>
            <td className="border px-4 py-2">{enterprise}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmDeleteClient(id)}
                >
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}
 
export default Client;