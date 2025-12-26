import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/api';

interface Transaction {
  id: string;
  amount: string;
  person: string;
  dueDate: string;
  returnDate?: string;
  category: 'lent' | 'borrow';
  returned: boolean;
}

type EditForm = {
  amount: string;
  person: string;
  dueDate: string;
  returnDate: string;
  returned: boolean;
  category: 'lent' | 'borrow';
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // 0 = borrow, 1 = lent
  const activeTab = selectedIndex === 0 ? 'borrow' : 'lent';
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);

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
    const returned = raw.returned === true || (raw.status && /returned/i.test(raw.status));

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
    if (!user?.uid) return; // Don't fetch if no user
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/new-list`, { 
        timeout: 10000,
        params: { userId: user.uid } // Filter by user
      });

      const data = res.data;
      const arr = Array.isArray(data) ? data : [data];
      const normalized = arr.map(normalize);
      setTransactions(normalized);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        'Failed to load transactions'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchTransactions();
    }
    const handler = () => fetchTransactions();
    window.addEventListener('reeni:transactionsUpdated', handler as EventListener);
    return () => window.removeEventListener('reeni:transactionsUpdated', handler as EventListener);
  }, [user?.uid]); // Re-fetch when user changes




  const updateReturnedStatus = async (id: string, returned: boolean) => {
    const { default: Swal } = await import('sweetalert2');
    const today = new Date().toISOString().slice(0, 10);
    
    // If marking as returned, ask for confirmation to move to history
    if (returned) {
      const item = transactions.find(t => t.id === id);
      if (!item) return;

      const result = await Swal.fire({
        title: 'ফেরত নিশ্চিত করুন',
        text: 'এই এন্ট্রি হিস্ট্রিতে সরানো হবে। নিশ্চিত করুন?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'হ্যাঁ, হিস্ট্রিতে সরান',
        cancelButtonText: 'বাতিল',
        confirmButtonColor: '#427baa',
      });

      if (!result.isConfirmed) return;

      try {
        // Prepare history item with all data - clean the amount field
        const cleanAmount = item.amount.replace(/[^0-9.]/g, ''); // Remove currency symbols
        const historyItem = {
          userId: user?.uid, // Associate with current user
          amount: cleanAmount || item.amount,
          person: item.person,
          dueDate: item.dueDate,
          returnDate: item.returnDate && item.returnDate !== '' ? item.returnDate : today,
          category: item.category,
          returned: true,
          movedToHistoryAt: new Date().toISOString(),
        };

        console.log('Attempting to move item to history:', historyItem);

        // Post to history
        await axios.post(`${API_BASE_URL}/history`, historyItem, { timeout: 10000 });

        // Delete from current list
        await axios.delete(`${API_BASE_URL}/new-list/${id}`, { timeout: 10000 });

        // Update UI
        setTransactions((prev) => prev.filter((t) => t.id !== id));
        window.dispatchEvent(new Event('reeni:transactionsUpdated'));
        window.dispatchEvent(new Event('reeni:historyUpdated'));

        await Swal.fire({
          title: 'সফল!',
          text: 'এন্ট্রি হিস্ট্রিতে সরানো হয়েছে',
          icon: 'success',
          confirmButtonText: 'ঠিক আছে',
          confirmButtonColor: '#427baa',
        });
      } catch (err: any) {
        const msg = err?.response?.data?.error || err?.message || 'হিস্ট্রিতে সরাতে ব্যর্থ';
        setError(msg);
        await Swal.fire({
          title: 'ত্রুটি',
          text: msg,
          icon: 'error',
          confirmButtonText: 'ঠিক আছে',
          confirmButtonColor: '#427baa',
        });
      }
    } else {
      // If unmarking as returned, just update local state
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          return { ...t, returned: false };
        })
      );
    }
  };

  const lentItems = transactions.filter((t) => t.category === 'lent');
  const borrowedItems = transactions.filter((t) => t.category === 'borrow');
  
  const currentTabItems = activeTab === 'lent' ? lentItems : borrowedItems;
  const totalPages = Math.ceil(currentTabItems.length / itemsPerPage);
  const paginatedItems = currentTabItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getStatusLabel = (returned: boolean) => {
    // If I lent (আমি ধার দিয়েছি) show third-person labels about the other person
    if (activeTab === 'lent') return returned ? 'ফেরত দিয়েছে' : 'ফেরত দেয়নি';
    // If I borrowed (আমি ধার নিয়েছি) show first-person labels about myself
    return returned ? 'ফেরত দিয়েছি' : 'ফেরত দেইনি';
  };

  useEffect(() => {
    // Debug helper: log active tab and counts to the browser console
    // Helps verify normalization and filtering at runtime
    // Remove or disable in production
    // eslint-disable-next-line no-console
    console.debug('Dashboard debug:', { activeTab, lentCount: lentItems.length, borrowCount: borrowedItems.length });
  }, [transactions, activeTab]);

  const deleteTransaction = async (id: string) => {
    const { default: Swal } = await import('sweetalert2');
    const result = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'এই এন্ট্রি মুছে ফেলতে চান?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ডিলিট করুন',
      cancelButtonText: 'বাতিল',
      confirmButtonColor: '#427baa',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/new-list/${id}`, { timeout: 10000 });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      window.dispatchEvent(new Event('reeni:transactionsUpdated'));
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || 'মুছে ফেলতে ব্যর্থ');
    }
  };

  const startEdit = (item: Transaction) => {
    setEditing(item);
    setEditForm({
      amount: item.amount || '',
      person: item.person || '',
      dueDate: item.dueDate || '',
      returnDate: item.returnDate || '',
      returned: item.returned,
      category: item.category,
    });
  };

  const handleEditChange = (field: keyof EditForm, value: string | boolean) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const saveEdit = async () => {
    if (!editing || !editForm) return;
    const { default: Swal } = await import('sweetalert2');
    const payload = {
      amount: editForm.amount,
      person: editForm.person,
      dueDate: editForm.dueDate,
      returnDate: editForm.returnDate,
      returned: editForm.returned,
      category: editForm.category,
    };

    try {
      await axios.put(`${API_BASE_URL}/new-list/${editing.id}`, payload, { timeout: 10000 });

      // Update UI state
      setTransactions((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...t, ...payload } : t))
      );

      setEditing(null);
      setEditForm(null);

      await Swal.fire({
        title: 'আপডেট সম্পন্ন',
        text: 'এন্ট্রি আপডেট হয়েছে',
        icon: 'success',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#427baa',
      });
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || err?.message || 'আপডেট করতে ব্যর্থ';
      setError(msg);
      await Swal.fire({
        title: 'ত্রুটি',
        text: msg,
        icon: 'error',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#427baa',
      });
    }
  };


  const TableHeader = () => {
    const personHeader = activeTab === 'lent' ? 'কাকে' : 'কার থেকে';
    const returnHeader = activeTab === 'lent' ? 'ফেরত দিবে' : 'ফেরত দিবো';

    return (
      <thead className="bg-gray-200 border border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">টাকার পরিমাণ</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{personHeader}</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">নেওয়ার তারিখ</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{returnHeader}</th>
          <th className="px-6 py-3  text-xs font-medium text-gray-600 uppercase whitespace-nowrap text-center">অবস্থা</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">অ্যাকশন</th>
        </tr>
      </thead>
    );
  };

  const SkeletonLoader = () => (
    <div className="space-y-4 p-4">
      {/* Large hero skeleton that becomes LCP element */}
      <div className="bg-gray-200 rounded-lg h-32 animate-pulse flex items-center justify-center">
        <span className="text-gray-400 text-lg">ডেটা লোড হচ্ছে...</span>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-gray-200 rounded h-14 animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <>
      <div className=" ">
        <div className="max-w-4xl mx-auto mt-6 lg:mt-12 border border-gray-200">
          <div className="bg-white rounded-lg relative pt-6">
          {/* Tabs positioned above card with diamond pointer */}
          <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-6 md:z-10">
            <Tabs selectedIndex={selectedIndex} onSelect={(idx) => { setSelectedIndex(idx); setPage(1); }}>
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
            {error && <div className="mb-4 text-sm text-red-600">ত্রুটি: {error}</div>}
            {/* Mobile: card list (only active tab) */}
            <div className="md:hidden space-y-3">
              {loading ? (
                <SkeletonLoader />
              ) : paginatedItems.length ? (
                (paginatedItems).map((item) => (
                  <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs text-gray-500">টাকার পরিমাণ</div>
                        <div className="text-lg font-medium text-gray-900">{item.amount}</div>
                      </div>
                      <div className="text-sm text-gray-600">{getStatusLabel(item.returned)}</div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>
                        <div className="text-xs whitespace-nowrap text-gray-500">{activeTab === 'lent' ? 'কাকে' : 'কার থেকে'}</div>
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
                          {activeTab === 'lent' ? (
                            <>
                              <option value="not_returned">ফেরত দেয়নি</option>
                              <option value="returned">ফেরত দিয়েছে</option>
                            </>
                          ) : (
                            <>
                              <option value="returned">ফেরত দিয়েছি</option>
                              <option value="not_returned">ফেরত দেইনি</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => startEdit(item)} 
                        className="flex-1 bg-[#427baa] text-white px-3 py-2 rounded hover:bg-[#356a91] transition-colors"
                      >
                        এডিট
                      </button>
                      <button 
                        onClick={() => deleteTransaction(item.id)} 
                        className="flex-1 bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500 transition-colors"
                      >
                        ডিলিট
                      </button>
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
                  {loading ? null : paginatedItems.length ? (
                    (paginatedItems).map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.person}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.dueDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnDate || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <select
                              value={item.returned ? 'returned' : 'not_returned'}
                              onChange={(e) => updateReturnedStatus(item.id, e.target.value === 'returned')}
                              className="px-3 py-1 text-sm border rounded bg-white"
                            >
                              {activeTab === 'lent' ? (
                                <>
                                  <option value="not_returned">ফেরত দেয়নি</option>
                                  <option value="returned">ফেরত দিয়েছে</option>
                                </>
                              ) : (
                                <>
                                  <option value="returned">ফেরত দিয়েছি</option>
                                  <option value="not_returned">ফেরত দেইনি</option>
                                </>
                              )}
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => startEdit(item)} 
                              className="bg-[#427baa] text-white p-2 rounded hover:bg-[#356a91] cursor-pointer transition-colors"
                              title="এডিট"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteTransaction(item.id)} 
                              className="bg-red-400 text-white p-2 rounded hover:bg-red-500 cursor-pointer transition-colors"
                              title="ডিলিট"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-600">কোনো এন্ট্রি পাওয়া যায়নি</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  আগে
                </button>
                <span className="text-sm text-gray-600">
                  পৃষ্ঠা {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  পরে
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {editing && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">এন্ট্রি এডিট</h3>
              <p className="text-sm text-gray-600">আপডেট করুন এবং সেভ করুন</p>
            </div>
            <button
              onClick={() => { setEditing(null); setEditForm(null); }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">টাকার পরিমাণ</label>
              <input
                type="text"
                value={editForm.amount}
                onChange={(e) => handleEditChange('amount', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#427baa]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{editing.category === 'lent' ? 'কাকে' : 'কার থেকে'}</label>
              <input
                type="text"
                value={editForm.person}
                onChange={(e) => handleEditChange('person', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#427baa]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">নেওয়ার তারিখ</label>
                <input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) => handleEditChange('dueDate', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ফেরত</label>
                <input
                  type="date"
                  value={editForm.returnDate}
                  onChange={(e) => handleEditChange('returnDate', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={editForm.category}
                  onChange={(e) => handleEditChange('category', e.target.value as 'lent' | 'borrow')}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                >
                  <option value="borrow">আমি ধার নিয়েছি</option>
                  <option value="lent">আমি ধার দিয়েছি</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">অবস্থা</label>
                <select
                  value={editForm.returned ? 'returned' : 'not_returned'}
                  onChange={(e) => handleEditChange('returned', e.target.value === 'returned')}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#427baa]"
                >
                  <option value="returned">ফেরত দিয়েছি/দিয়েছে</option>
                  <option value="not_returned">ফেরত দেয়নি/দেইনি</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => { setEditing(null); setEditForm(null); }}
              className="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              বাতিল
            </button>
            <button
              onClick={saveEdit}
              className="px-4 py-2 text-sm rounded bg-[#427baa] text-white hover:bg-[#356a91]"
            >
              সেভ
            </button>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;