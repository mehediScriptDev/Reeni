import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/api';

interface HistoryItem {
  id: string;
  amount: string;
  person: string;
  dueDate: string;
  returnDate: string;
  category: 'lent' | 'borrow';
  returned: boolean;
  movedToHistoryAt?: string;
}

const History: React.FC = () => {
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // 0 = borrow, 1 = lent
  const activeTab = selectedIndex === 0 ? 'borrow' : 'lent';
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const normalize = (raw: any): HistoryItem => {
    console.log('History raw data:', raw);
    
    // MongoDB returns _id as ObjectId, convert to hex string
    let id = '';
    if (raw?._id?.$oid) id = raw._id.$oid;
    else if (typeof raw?._id === 'string') id = raw._id;
    else if (raw?.id) id = String(raw.id);
    
    const amountRaw = raw.amount ?? raw.item ?? '';
    const amount = typeof amountRaw === 'number' ? `৳${amountRaw}` : String(amountRaw);
    const person = String(raw.person || raw.toFrom || raw.from || raw.to || '');
    const dueDate = String(raw.dueDate || raw.givenDate || raw.date || '');
    const returnDate = String(raw.returnDate || raw.return_date || '');
    const rawCategory = String(raw.category || raw.type || '').trim().toLowerCase();
    
    let category: 'lent' | 'borrow' = 'lent';
    if (rawCategory.includes('borrow')) {
      category = 'borrow';
    } else if (rawCategory.includes('lend') || rawCategory.includes('lent')) {
      category = 'lent';
    }

    const normalized = {
      id,
      amount: amount || '-',
      person: person || '-',
      dueDate: dueDate || '-',
      returnDate: returnDate || '-',
      category: category as 'lent' | 'borrow',
      returned: true,
      movedToHistoryAt: raw.movedToHistoryAt || '',
    };
    
    console.log('History normalized:', normalized);
    return normalized;
  };

  const CACHE_KEY = `reeni_history_${user?.uid || 'anon'}`;

  const saveCache = (items: HistoryItem[]) => {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items }));
    } catch {
      // ignore
    }
  };

  const fetchHistory = async (showLoading = true) => {
    if (!user?.uid) return;
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/history`, { 
        timeout: 10000,
        params: { userId: user.uid }
      });

      const data = res.data;
      console.log('===== HISTORY FETCH DEBUG =====');
      console.log('Raw response data:', data);
      console.log('Data type:', typeof data);
      console.log('Is array?', Array.isArray(data));
      console.log('Data length (if array):', Array.isArray(data) ? data.length : 'N/A');
      console.log('First item:', Array.isArray(data) ? data[0] : data);
      
      // Handle different response formats
      let arr: any[] = [];
      if (Array.isArray(data)) {
        arr = data;
      } else if (data && typeof data === 'object') {
        // Single object - wrap in array
        arr = [data];
      }
      
      console.log('Array before filtering:', arr);
      console.log('Array length before filtering:', arr.length);
      
      // Filter out null/undefined but keep valid objects
      arr = arr.filter(item => {
        const isValid = item != null && typeof item === 'object';
        if (!isValid) {
          console.log('Filtered out invalid item:', item);
        }
        return isValid;
      });
      
      console.log('Valid items to normalize:', arr);
      console.log('Valid items count:', arr.length);
      
      const normalized = arr.length > 0 ? arr.map(normalize) : [];
      console.log('All normalized history items:', normalized);
      console.log('Normalized count:', normalized.length);
      console.log('===== END DEBUG =====');
      setHistory(normalized);
      saveCache(normalized);
    } catch (err: any) {
      const errMsg = err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        'Failed to load history';
      console.error('History fetch error:', errMsg, err);
      setError(errMsg);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    // Try cache first
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.items)) {
          setHistory(parsed.items as HistoryItem[]);
          setLoading(false);
          // background refresh
          fetchHistory(false);
        } else {
          fetchHistory(true);
        }
      } else {
        fetchHistory(true);
      }
    } catch (e) {
      fetchHistory(true);
    }

    const handler = () => fetchHistory();
    window.addEventListener('reeni:historyUpdated', handler as EventListener);
    return () => window.removeEventListener('reeni:historyUpdated', handler as EventListener);
  }, [user?.uid]);

  const deleteHistoryItem = async (id: string) => {
    const { default: Swal } = await import('sweetalert2');
    // Validate MongoDB ObjectId format (24 hex characters)
    const isValidId = /^[0-9a-fA-F]{24}$/.test(id);
    if (!id || !isValidId) {
      await Swal.fire({
        title: 'ত্রুটি',
        text: 'অবৈধ আইডি। এই এন্ট্রি মুছে ফেলা যাবে না।',
        icon: 'error',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#427baa',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'এই হিস্ট্রি এন্ট্রি মুছে ফেলতে চান?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ডিলিট করুন',
      cancelButtonText: 'বাতিল',
      confirmButtonColor: '#427baa',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/history/${id}`, { timeout: 10000 });
      const afterDelete = history.filter((h) => h.id !== id);
      setHistory(afterDelete);
      saveCache(afterDelete);
      window.dispatchEvent(new Event('reeni:historyUpdated'));
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || 'মুছে ফেলতে ব্যর্থ');
    }
  };

  const lentItems = history.filter((h) => h.category === 'lent');
  const borrowedItems = history.filter((h) => h.category === 'borrow');

  useEffect(() => {
    console.debug('History debug:', { 
      activeTab, 
      totalHistory: history.length,
      lentCount: lentItems.length, 
      borrowCount: borrowedItems.length,
      lentItems,
      borrowedItems
    });
  }, [history, activeTab]);

  const SkeletonLoader = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 rounded h-12 animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <>
      <div className="">
        <div className="max-w-4xl mx-auto mt-3 sm:mt-6 lg:mt-10 sm:border sm:border-gray-200">
          <div className="sm:bg-white rounded-lg relative pt-6">
            {/* Tabs */}
            <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-6 md:z-10">
              <Tabs selectedIndex={selectedIndex} onSelect={(idx) => setSelectedIndex(idx)}>
                <TabList className="flex items-center gap-2 md:gap-3 justify-center overflow-x-auto px-4 md:px-0 w-full md:w-auto">
                  <Tab
                    className={`inline-flex items-center justify-center whitespace-nowrap relative px-4 py-2 text-sm md:px-6 md:py-2.5 font-medium rounded-lg focus:outline-none transition-colors cursor-pointer ${selectedIndex===0 ? 'bg-gray-200 text-white' : 'bg-gray-200 text-gray-700'}`}
                    style={selectedIndex === 0 ? { backgroundColor: '#1f7fb3', color: '#ffffff' } : undefined}
                  >
                    আমি নিয়েছিলাম
                  </Tab>

                  <Tab
                    className={`inline-flex items-center justify-center whitespace-nowrap relative px-4 py-2 text-sm md:px-6 md:py-2.5 font-medium rounded-lg focus:outline-none transition-colors cursor-pointer ${selectedIndex===1 ? 'bg-gray-200 text-white' : 'bg-gray-200 text-gray-700'}`}
                    style={selectedIndex === 1 ? { backgroundColor: '#1f7fb3', color: '#ffffff' } : undefined}
                  >
                    আমি দিয়েছিলাম
                  </Tab>
                </TabList>
              </Tabs>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {error && <div className="text-sm text-red-600">ত্রুটি: {error}</div>}
                </div>
                <button
                  onClick={() => fetchHistory()}
                  className="px-4 py-2 bg-[#427baa] text-white text-sm rounded hover:bg-[#356a91] transition-colors"
                >
                  রিফ্রেশ
                </button>
              </div>

              {/* Mobile: card list */}
              <div className="md:hidden space-y-3">
                {loading ? (
                  <SkeletonLoader />
                ) : (activeTab === 'lent' ? lentItems : borrowedItems).length ? (
                  (activeTab === 'lent' ? lentItems : borrowedItems).map((item) => (
                    <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-gray-500">টাকার পরিমাণ</div>
                          <div className="text-lg font-medium text-gray-900">{item.amount || '-'}</div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <FaCheckCircle className="w-4 h-4" />
                          <span>ফেরত দিয়েছে/দিয়েছি</span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                        <div>
                          <div className="text-xs whitespace-nowrap text-gray-500">{activeTab === 'lent' ? 'কাকে' : 'কার থেকে'}</div>
                          <div>{item.person || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">{activeTab === 'lent' ? 'দেওয়ার তারিখ' : 'নেওয়ার তারিখ'}</div>
                          <div>{item.dueDate || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">ফেরত দেওয়ার তারিখ</div>
                          <div>{item.returnDate || '-'}</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => deleteHistoryItem(item.id)} 
                          className="flex-1 bg-red-400 text-white px-3 py-2 rounded text-xs sm:text-sm hover:bg-red-500 transition-colors"
                        >
                          ডিলিট
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 bg-white border border-gray-200 rounded text-center text-gray-600">কোনো হিস্ট্রি পাওয়া যায়নি</div>
                )}
              </div>

              {/* Desktop/tablet: table */}
              <div className="hidden md:block overflow-x-auto">
                {loading ? (
                  <SkeletonLoader />
                ) : (activeTab === 'lent' ? lentItems : borrowedItems).length ? (
                  <table className="w-full table-auto">
                    <thead className="bg-gray-200 border border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">টাকার পরিমাণ</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{activeTab === 'lent' ? 'কাকে' : 'কার থেকে'}</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">{activeTab === 'lent' ? 'দেওয়ার তারিখ' : 'নেওয়ার তারিখ'}</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">ফেরত দেওয়ার তারিখ</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">অবস্থা</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(activeTab === 'lent' ? lentItems : borrowedItems).map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{item.amount || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.person || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.dueDate || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnDate || '-'}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                              <FaCheckCircle className="w-4 h-4" />
                              <span>সম্পন্ন</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => deleteHistoryItem(item.id)} 
                                className="bg-red-400 text-white p-2 rounded hover:bg-red-500 transition-colors"
                                title="ডিলিট"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 bg-white border border-gray-200 rounded text-center text-gray-600">কোনো হিস্ট্রি পাওয়া যায়নি</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;