import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';

const BEST_SELLERS = gql`
    query bestSellers {
        bestSellers {
            seller {
                name
                email
            }
            total
        }
    }
`;

const BestSellers = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS);

    useEffect(() => {
        startPolling(1000);

        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);

    if (loading) return 'Loading';

    console.log(data.bestSellers);

    const graphSeller = [];

    data.bestSellers.map((seller, index) => {
        graphSeller[index] = {
            ...seller.seller[0],
            total: seller.total
        };
    });

    console.log(graphSeller);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>

            <BarChart
                className="mt-6"
                width={600}
                height={500}
                data={graphSeller}
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
        </Layout>
    );
}
 
export default BestSellers;