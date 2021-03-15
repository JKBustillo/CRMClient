import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

export default function Home() {
  const router = useRouter();

  const { data, loading } = useQuery(GET_CLIENTS_USER);

  if (loading) return null;

  if (!data.getClientsSeller) {
    router.push('/login');

    return null;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

        <Link href="/newClient">
          <a className="bg-blue-800 py-2 px-5 mt-3 mb-3 inline-block text-white rounded text-sm uppercase font-bold hover:bg-gray-800">New Client</a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Enterprise</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getClientsSeller.map(client => (
              <tr key={client.id}>
                <td className="border px-4 py-2">{client.name} {client.lastName}</td>
                <td className="border px-4 py-2">{client.enterprise}</td>
                <td className="border px-4 py-2">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}