import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';

const BEST_CLIENTS = gql`
    query bestClients {
        bestClients {
            client {
                name
                enterprise
            }
            total
        }
    }
`;

const BestClients = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CLIENTS);

    useEffect(() => {
        startPolling(1000);

        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);

    if (loading) return 'Loading';

    console.log(data.bestClients);

    const graphClient = [];

    data.bestClients.map((client, index) => {
        graphClient[index] = {
            ...client.client[0],
            total: client.total
        };
    });

    console.log(graphClient);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Best Clients</h1>
            <ResponsiveContainer
                width={'99%'}
                height={550}
            >
                <BarChart
                    className="mt-6"
                    width={600}
                    height={500}
                    data={graphClient}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
}
 
export default BestClients;