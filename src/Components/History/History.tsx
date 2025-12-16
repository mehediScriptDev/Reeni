import React from 'react';
import { Link } from 'react-router';

const History: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded border border-gray-200 shadow">
            <h2 className="text-2xl font-semibold mb-2">History</h2>
            <p className="text-sm text-gray-600 mb-4">কোনও তথ্য পাওয়া যায়নি।</p>

            <div className="text-sm text-gray-700">
                <p>এখানে আপনি আগের এন্ট্রিগুলো দেখতে পাবেন। এখনো কোনো রেকর্ড নেই।</p>
                <Link to="/add-new" className="inline-block mt-4 px-4 py-2 bg-[#427baa] text-white rounded">নতুন এন্ট্রি যোগ করুন</Link>
            </div>
        </div>
    );
};

export default History;