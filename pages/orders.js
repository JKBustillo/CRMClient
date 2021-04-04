import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const Orders = () => {
    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

                <Link href="/newOrder">
                    <a className="bg-blue-800 py-2 px-5 mt-3 mb-3 inline-block text-white rounded text-sm uppercase font-bold hover:bg-gray-800">New Order</a>
                </Link>
            </Layout>
        </div>
    )
}
 
export default Orders;