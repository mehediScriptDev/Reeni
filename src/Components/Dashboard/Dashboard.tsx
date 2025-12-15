import React, { useState } from 'react';

interface LentItem {
  id: string;
  item: string;
  toFrom: string;
  dueDate: string;
  returnDate: string;
  status: 'Active' | 'Overdue' | 'Returned';
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
  const [activeTab, setActiveTab] = useState<'lent' | 'borrowed'>('borrowed');

  const [lentItems, setLentItems] = useState<LentItem[]>([
    {
      id: '1',
      item: '৳5,000',
      toFrom: 'অ্যালেক্স',
      dueDate: '2024-05-15',
      returnDate: '',
      status: 'Active'
    },
    {
      id: '2',
      item: '৳200',
      toFrom: 'রাহুল',
      dueDate: '2024-05-10',
      returnDate: '',
      status: 'Overdue'
    }
  ]);

  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([
    {
      id: '1',
      item: '$50',
      toFrom: 'সারা',
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

  const displayStatus = (status: string) => {
    switch (status) {
      case 'Active':
        return 'সক্রিয়';
      case 'Overdue':
        return 'মেয়াদোত্তীর্ণ';
      case 'Returned':
        return 'ফেরত হয়েছে';
      default:
        return status;
    }
  };

  const updateLentStatus = (id: string, status: LentItem['status']) => {
    setLentItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
  };

  const updateReturnedFlag = (list: 'lent' | 'borrowed', id: string, returned: boolean) => {
    const today = new Date().toISOString().slice(0, 10);
    if (list === 'lent') {
      setLentItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: returned ? 'Returned' : 'Overdue', returnDate: returned ? today : '' } : it))
      );
    } else {
      setBorrowedItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: returned ? 'Returned' : 'Overdue', returnDate: returned ? today : '' } : it))
      );
    }
  };

  const sendReminder = (to: string, item: string) => {
    // Placeholder for real reminder logic — show Bangla alert for now
    alert(`রিমাইন্ডার পাঠানো হয়েছে ${to}-কে ${item} সম্পর্কিত`);
  };

  const TableHeader = () => {
    const toFromHeader = activeTab === 'lent' ? 'কাকে' : 'কার থেকে';
    const ferotHeader = activeTab === 'lent' ? 'ফেরত দেবে' : 'ফেরত দিবো';

    return (
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">টাকার পরিমাণ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{toFromHeader}</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">নির্ধারিত তারিখ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{ferotHeader}</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">অবস্থা</th>
        </tr>
      </thead>
    );
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow relative">
          {/* Tabs positioned centered above the card (overlapping) */}
          <div className="absolute left-1/2 -top-8 transform -translate-x-1/2 z-10 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('borrowed')}
              className={`px-8 py-3 text-lg font-semibold rounded-md focus:outline-none transition-shadow duration-150 ${
                activeTab === 'borrowed'
                  ? 'bg-white border border-gray-200 shadow'
                  : 'bg-white border border-transparent text-gray-500 shadow-sm'
              }`}
            >
              আমি ধার নিয়েছি
            </button>

            <button
              onClick={() => setActiveTab('lent')}
              className={`px-8 py-3 text-lg font-semibold rounded-md focus:outline-none transition-shadow duration-150 ${
                activeTab === 'lent'
                  ? 'bg-white border border-gray-200 shadow'
                  : 'bg-white border border-transparent text-gray-500 shadow-sm'
              }`}
            >
              আমি ধার দিয়েছি
            </button>
          </div>

          <div className="pt-10 px-6 pb-3 border-b bg-blue-50" />

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
                        <div className="flex items-center gap-3">
                          <select
                            value={item.status === 'Returned' ? 'returned' : 'not_returned'}
                            onChange={(e) => updateReturnedFlag('lent', item.id, e.target.value === 'returned')}
                            className="px-3 py-1 text-sm border rounded bg-white"
                          >
                            <option value="returned">ফেরত</option>
                            <option value="not_returned">ফেরত নয়</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}

                {activeTab === 'borrowed' &&
                  borrowedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.item}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.toFrom}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.dueDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.returnDate || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <select
                            value={item.status === 'Returned' ? 'returned' : 'not_returned'}
                            onChange={(e) => updateReturnedFlag('borrowed', item.id, e.target.value === 'returned')}
                            className="px-3 py-1 text-sm border rounded bg-white"
                          >
                            <option value="returned">ফেরত</option>
                            <option value="not_returned">ফেরত নয়</option>
                          </select>
                        </div>
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