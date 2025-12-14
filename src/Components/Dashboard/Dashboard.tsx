import React, { useState } from 'react';

interface LentItem {
  id: string;
  item: string;
  toFrom: string;
  dueDate: string;
  returnDate: string;
  status: 'Active' | 'Overdue';
}

interface BorrowedItem {
  id: string;
  item: string;
  toFrom: string;
  dueDate: string;
  returnDate: string;
  status: 'Returned' | 'Overdue' | 'Active';
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lent' | 'borrowed'>('lent');

  const [lentItems, setLentItems] = useState<LentItem[]>([
    {
      id: '1',
      item: 'Camera',
      toFrom: 'Alex',
      dueDate: '2024-05-15',
      returnDate: '',
      status: 'Active'
    },
    {
      id: '2',
      item: 'Overdue',
      toFrom: 'Alex',
      dueDate: '2024-05-15',
      returnDate: '',
      status: 'Overdue'
    }
  ]);

  const [borrowedItems] = useState<BorrowedItem[]>([
    {
      id: '1',
      item: '$50',
      toFrom: 'Sarah',
      dueDate: '2024-05-01',
      returnDate: '2024-05-20',
      status: 'Returned'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-500 text-white';
      case 'Returned':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const updateLentStatus = (id: string, status: LentItem['status']) => {
    setLentItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
  };

  const sendReminder = (to: string, item: string) => {
    // Placeholder for real reminder logic
    alert(`Reminder sent to ${to} about ${item}`);
  };

  const TableHeader = () => (
    <thead className="bg-gray-50 border-b">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To/From</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
      </tr>
    </thead>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow relative">
          {/* Tabs positioned centered above the card (overlapping) */}
          <div className="absolute left-1/2 -top-4 transform -translate-x-1/2 z-10 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('lent')}
              className={`px-4 py-2 text-sm font-semibold rounded-t-md focus:outline-none ${
                activeTab === 'lent'
                  ? 'bg-white border-t border-l border-r border-gray-200 shadow'
                  : 'bg-blue-50 text-gray-600'
              }`}
            >
              I Lent (Rent Out)
            </button>

            <button
              onClick={() => setActiveTab('borrowed')}
              className={`px-4 py-2 text-sm font-semibold rounded-t-md focus:outline-none ${
                activeTab === 'borrowed'
                  ? 'bg-white border-t border-l border-r border-gray-200 shadow'
                  : 'bg-blue-50 text-gray-600'
              }`}
            >
              I Borrowed (Rent In)
            </button>
          </div>

          <div className="pt-6 px-6 pb-3 border-b bg-blue-50">
            {/* spacer header to allow tabs to overlap without being inside */}
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full table-auto">
              <TableHeader />
              <tbody className="divide-y divide-gray-200">
                {activeTab === 'lent' &&
                  lentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.item}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.toFrom}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.dueDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.returnDate || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {item.status === 'Overdue' ? (
                          <div className="flex gap-2">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-500 text-white rounded">Overdue</span>
                            <button
                              onClick={() => sendReminder(item.toFrom, item.item)}
                              className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              Send Reminder
                            </button>
                          </div>
                        ) : (
                          <select
                            value={item.status}
                            onChange={(e) => updateLentStatus(item.id, e.target.value as LentItem['status'])}
                            className="px-2 py-1 text-sm border rounded bg-white"
                          >
                            <option value="Active">Active</option>
                            <option value="Overdue">Overdue</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}

                {activeTab === 'borrowed' &&
                  borrowedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.item}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.toFrom}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.dueDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.returnDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className={`px-3 py-1 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                          {item.status}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;