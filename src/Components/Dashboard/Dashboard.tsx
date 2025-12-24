import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface Transaction {
  id: string;
  amount: string;
  person: string;
  dueDate: string;
  returnDate?: string;
  category: 'lent' | 'borrow';
  returned: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // 0 = borrow, 1 = lent
  const activeTab = selectedIndex === 0 ? 'borrow' : 'lent';

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const normalize = (raw: any): Transaction => {
    const id = raw._id?.$oid || raw._id || raw.id || String(raw._id || Date.now());
    const amountRaw = raw.amount ?? raw.item ?? '';
    const amount = typeof amountRaw === 'number' ? `৳${amountRaw}` : String(amountRaw);
    const person = raw.person || raw.toFrom || raw.from || raw.to || '';
    const dueDate = raw.dueDate || raw.givenDate || raw.date || '';
    const returnDate = raw.returnDate || raw.return_date || '';
    const rawCategory = String(raw.category || raw.type || '').trim().toLowerCase();
    let category: 'lent' | 'borrow' = 'lent';
    if (rawCategory.includes('borrow')) category = 'borrow';
    else if (rawCategory.includes('lend') || rawCategory.includes('lent')) category = 'lent';
    const returned = !!raw.returned || (raw.status && /returned/i.test(raw.status)) || (!!returnDate && returnDate !== '');

    return {
      id: String(id),
      amount: amount,
      person: String(person),
      dueDate: String(dueDate),
      returnDate: String(returnDate || ''),
      category: category as 'lent' | 'borrow',
      returned: Boolean(returned),
    };
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try backend paths: /new-list then /api/new-list
      const tryGet = async (url: string) => axios.get(url, { timeout: 10000 });
      let res;
      try {
        res = await tryGet('/new-list');
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 404 || status === 405) {
          res = await tryGet('/api/new-list');
        } else {
          throw err;
        }
      }

      const data = res.data;
      // accept either an array or a single object
      const arr = Array.isArray(data) ? data : [data];
      const normalized = arr.map(normalize);
      setTransactions(normalized);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const handler = () => fetchTransactions();
    window.addEventListener('reeni:transactionsUpdated', handler as EventListener);
    return () => window.removeEventListener('reeni:transactionsUpdated', handler as EventListener);
  }, []);




  const updateReturnedStatus = (id: string, returned: boolean) => {
    const today = new Date().toISOString().slice(0, 10);
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, returned, returnDate: returned ? today : '' } : t
      )
    );
  };

  const lentItems = transactions.filter((t) => t.category === 'lent');
  const borrowedItems = transactions.filter((t) => t.category === 'borrow');

  useEffect(() => {
    // Debug helper: log active tab and counts to the browser console
    // Helps verify normalization and filtering at runtime
    // Remove or disable in production
    // eslint-disable-next-line no-console
    console.debug('Dashboard debug:', { activeTab, lentCount: lentItems.length, borrowCount: borrowedItems.length });
  }, [transactions, activeTab]);


  const TableHeader = () => {
    const personHeader = activeTab === 'lent' ? 'কাকে' : 'কার থেকে';
    const returnHeader = activeTab === 'lent' ? 'ফেরত দিবে' : 'ফেরত দিবো';

    return (
      <thead className="bg-gray-200 border border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">টাকার পরিমাণ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{personHeader}</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">নেওয়ার তারিখ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{returnHeader}</th>
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
            {loading && <div className="mb-4 text-sm text-gray-600">লোড হচ্ছে…</div>}
            {error && <div className="mb-4 text-sm text-red-600">ত্রুটি: {error}</div>}
            {/* Mobile: card list (only active tab) */}
            <div className="md:hidden space-y-3">
              {(activeTab === 'lent' ? lentItems : borrowedItems).length ? (
                (activeTab === 'lent' ? lentItems : borrowedItems).map((item) => (
                  <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs text-gray-500">টাকার পরিমাণ</div>
                        <div className="text-lg font-medium text-gray-900">{item.amount}</div>
                      </div>
                      <div className="text-sm text-gray-600">{item.returned ? 'ফেরত দিয়েছি' : 'ফেরত দেইনি'}</div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>
                        <div className="text-xs text-gray-500">{activeTab === 'lent' ? 'কাকে' : 'কার থেকে'}</div>
                        <div>{item.person}</div>
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
                          value={item.returned ? 'returned' : 'not_returned'}
                          onChange={(e) => updateReturnedStatus(item.id, e.target.value === 'returned')}
                          className="mt-1 bg-gray-200 border border-gray-300 w-full px-3 py-1 text-sm rounded"
                        >
                          <option value="returned">ফেরত দিয়েছি</option>
                          <option value="not_returned">ফেরত দেইনি</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 bg-white border border-gray-200 rounded text-center text-gray-600">কোনো এন্ট্রি পাওয়া যায়নি</div>
              )}
            </div>

            {/* Desktop/tablet: regular table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto">
                <TableHeader />
                <tbody className="divide-y divide-gray-200">
                  {(activeTab === 'lent' ? lentItems : borrowedItems).length ? (
                    (activeTab === 'lent' ? lentItems : borrowedItems).map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.person}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.dueDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnDate || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <select
                              value={item.returned ? 'returned' : 'not_returned'}
                              onChange={(e) => updateReturnedStatus(item.id, e.target.value === 'returned')}
                              className="px-3 py-1 text-sm border rounded bg-white"
                            >
                              <option value="returned">ফেরত দিয়েছি</option>
                              <option value="not_returned">ফেরত দেইনি</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-600">কোনো এন্ট্রি পাওয়া যায়নি</td>
                    </tr>
                  )}
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