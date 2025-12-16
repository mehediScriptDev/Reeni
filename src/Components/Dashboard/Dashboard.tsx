import React, { useState } from 'react';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // 0 = borrowed, 1 = lent
  const activeTab = selectedIndex === 0 ? 'borrowed' : 'lent';

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


  const TableHeader = () => {
    const toFromHeader = activeTab === 'lent' ? 'কাকে' : 'কার থেকে';
    const ferotHeader = activeTab === 'lent' ? 'ফেরত দিবে' : 'ফেরত দিবো';

    return (
      <thead className="bg-gray-200 border border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">টাকার পরিমাণ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{toFromHeader}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">নেওয়ার তারিখ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{ferotHeader}</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">অবস্থা</th>
        </tr>
      </thead>
    );
  };

  return (
    <div className=" ">
      <div className="max-w-4xl mx-auto mt-6 lg:mt-12 border border-gray-200">
        <div className="bg-white rounded-lg relative pt-6">
          {/* Tabs positioned above card with diamond pointer */}
          <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-6 md:z-10">
            <Tabs selectedIndex={selectedIndex} onSelect={(idx) => setSelectedIndex(idx)}>
              <TabList className="flex items-center gap-2 md:gap-3 justify-center overflow-x-auto px-4 md:px-0 w-full md:w-auto">
                <Tab
                  className={`inline-flex items-center justify-center whitespace-nowrap relative px-4 py-2 text-sm md:px-6 md:py-2.5 font-medium rounded-lg focus:outline-none transition-colors cursor-pointer ${selectedIndex===0 ? 'bg-gray-200 text-white' : 'bg-gray-200 text-gray-700'}`}
                  style={selectedIndex === 0 ? { backgroundColor: '#1f7fb3', color: '#ffffff' } : undefined}
                >
                  আমি ধার নিয়েছি
                </Tab>

                <Tab
                  className={`inline-flex items-center justify-center whitespace-nowrap relative px-4 py-2 text-sm md:px-6 md:py-2.5 font-medium rounded-lg focus:outline-none transition-colors cursor-pointer ${selectedIndex===1 ? 'bg-gray-200 text-white' : 'bg-gray-200 text-gray-700'}`}
                  style={selectedIndex === 1 ? { backgroundColor: '#1f7fb3', color: '#ffffff' } : undefined}
                >
                  আমি ধার দিয়েছি
                </Tab>
              </TabList>
            </Tabs>
          </div>
          <div className="p-6">
            {/* Mobile: card list */}
            <div className="md:hidden space-y-3">
              {activeTab === 'lent' &&
                lentItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs text-gray-500">টাকার পরিমাণ</div>
                        <div className="text-lg font-medium text-gray-900">{item.item}</div>
                      </div>
                      <div className="text-sm text-gray-600">{item.status}</div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>
                        <div className="text-xs text-gray-500">কাকে</div>
                        <div>{item.toFrom}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">নেওয়ার তারিখ</div>
                        <div>{item.dueDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">ফেরত</div>
                        <div>{item.returnDate || '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">অবস্থা</div>
                        <select
                          value={item.status === 'Returned' ? 'returned' : 'not_returned'}
                          onChange={(e) => updateReturnedFlag('lent', item.id, e.target.value === 'returned')}
                          className="mt-1 bg-gray-200 border border-gray-300 w-full px-3 py-1 text-sm rounded "
                        >
                          <option value="returned">ফেরত দিয়েছি</option>
                          <option value="not_returned">ফেরত দেইনি</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'borrowed' &&
                borrowedItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs text-gray-500">টাকার পরিমাণ</div>
                        <div className="text-lg font-medium text-gray-900">{item.item}</div>
                      </div>
                      <div className="text-sm text-gray-600">{item.status}</div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>
                        <div className="text-xs text-gray-500">কার থেকে</div>
                        <div>{item.toFrom}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">নেওয়ার তারিখ</div>
                        <div>{item.dueDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">ফেরত</div>
                        <div>{item.returnDate || '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">অবস্থা</div>
                        <select
                          value={item.status === 'Returned' ? 'returned' : 'not_returned'}
                          onChange={(e) => updateReturnedFlag('borrowed', item.id, e.target.value === 'returned')}
                          className="mt-1 w-full px-3 py-1 text-sm rounded bg-gray-200 border border-gray-300"
                        >
                          <option value="returned">ফেরত দিয়েছি</option>
                          <option value="not_returned">ফেরত দেইনি</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Desktop/tablet: regular table */}
            <div className="hidden md:block overflow-x-auto">
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
                              <option value="returned">ফেরত দিয়েছি</option>
                              <option value="not_returned">ফেরত দেইনি</option>
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
                              <option value="returned">ফেরত দিয়েছি</option>
                              <option value="not_returned">ফেরত দেইনি</option>
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
    </div>
  );
};

export default Dashboard;