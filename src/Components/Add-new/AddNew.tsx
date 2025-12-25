import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddNew: React.FC = () => {
    const [mode, setMode] = useState<'lent' | 'borrowed' | ''>('');
    const [amount, setAmount] = useState('');
    const [givenDate, setGivenDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [returnDate, setReturnDate] = useState<string>('');
    const [recipientName, setRecipientName] = useState('');
    const [fromName, setFromName] = useState('');
    const [message, setMessage] = useState('');

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        if (!mode) {
            setMessage('ধরন নির্বাচন করুন');
            return;
        }
        const amountValue = Number(String(amount).replace(/[^\d.]/g, ''));
        if (!amount || isNaN(amountValue) || amountValue <= 0) {
            setMessage('অনুগ্রহ করে সঠিক টাকার পরিমাণ লিখুন');
            return;
        }

        const payload = {
            amount: amountValue,
            person: (mode === 'lent' ? recipientName : fromName).trim(),
            dueDate: givenDate,
            returnDate: returnDate || '',
            category: mode === 'borrowed' ? 'borrow' : 'lent',
            returned: Boolean(returnDate && returnDate.trim() !== ''),
        };

        try {
            setSubmitting(true);
            // Try '/new-list' first; if 404/405, fallback to '/api/new-list'
            const tryPost = async (url: string) =>
                axios.post(url, payload, {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000,
                });

            let posted = false;
            try {
                await tryPost('/new-list');
                posted = true;
            } catch (err: any) {
                const code = err?.response?.status;
                if (code === 404 || code === 405) {
                    await tryPost('/api/new-list');
                    posted = true;
                } else {
                    throw err;
                }
            }

            if (!posted) {
                throw new Error('সংরক্ষণ ব্যর্থ হয়েছে');
            }
            setMessage('সফলভাবে সংরক্ষণ হয়েছে');
            await Swal.fire({
                title: 'সফলভাবে সংরক্ষণ হয়েছে',
                text: 'এন্ট্রি যোগ করা হয়েছে',
                icon: 'success',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#427baa',
            });
            // reset form
            setAmount('');
            setGivenDate(new Date().toISOString().slice(0, 10));
            setReturnDate('');
            setRecipientName('');
            setFromName('');
            // optional: notify other components
            window.dispatchEvent(new Event('reeni:transactionsUpdated'));
        } catch (err: any) {
            const status = err?.response?.status;
            const data = err?.response?.data;
            const serverMessage = typeof data === 'string' ? data : data?.message;
            let errMsg = serverMessage || err?.message || 'সংরক্ষণ ব্যর্থ হয়েছে';
            if (err?.message === 'Network Error') {
                errMsg = 'Network Error — ব্যাকএন্ড চলছে কি না এবং পোর্ট 3000 এ অ্যাভেইলেবল কিনা চেক করুন';
            }
            setMessage(`ত্রুটি${status ? ` (${status})` : ''}: ${errMsg}`);
            await Swal.fire({
                title: 'ত্রুটি',
                text: `${status ? `স্ট্যাটাস ${status}: ` : ''}${errMsg}`,
                icon: 'error',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#427baa',
            });
            // Helpful for debugging while developing
            // eslint-disable-next-line no-console
            console.error('POST /api/new-list failed:', { status, data, err });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded border border-gray-200 shadow">
            <h2 className="text-2xl font-semibold mb-4">নতুন এন্ট্রি যোগ করুন</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">ধরন নির্বাচন করুন</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-64 mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border border-gray-300 bg-gray-200 focus:border-none rounded px-3 py-2"
                >
                    <option value="">-- নির্বাচন করুন --</option>
                    <option value="lent">আমি ধার দিয়েছি</option>
                    <option value="borrowed">আমি ধার নিয়েছি</option>
                </select>
            </div>

            {mode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-medium">{mode === 'lent' ? 'আমি ধার দিয়েছি' : 'আমি ধার নিয়েছি'}</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700">টাকার পরিমাণ</label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2"
                        placeholder="৳"
                    />
                </div>

                {mode === 'lent' ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">কাকে</label>
                            <input
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2"
                                placeholder="ব্যক্তির নাম লিখুন"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">দেওয়ার তারিখ</label>
                            <input type="date" value={givenDate} onChange={(e) => setGivenDate(e.target.value)} className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ফেরত দেওয়ার তারিখ</label>
                            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2" />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">কার থেকে</label>
                            <input
                                value={fromName}
                                onChange={(e) => setFromName(e.target.value)}
                                className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2"
                                placeholder="ব্যক্তির নাম লিখুন"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">নেয়ার তারিখ</label>
                            <input type="date" value={givenDate} onChange={(e) => setGivenDate(e.target.value)} className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ফেরত দেওয়ার তারিখ</label>
                            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-1 outline-none focus:outline-none focus:ring-2 focus:ring-[#427baa] border focus:border-none block w-full rounded px-3 py-2" />
                        </div>
                    </>
                )}

                        <div className="flex items-center gap-3">
                            <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#427baa] text-white rounded disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? 'সংরক্ষণ হচ্ছে…' : 'সংরক্ষণ করুন'}
                            </button>
                            <button type="button" onClick={() => {
                                setAmount('');
                                setGivenDate(new Date().toISOString().slice(0,10));
                                setReturnDate('');
                                setRecipientName('');
                                setFromName('');
                                setMessage('');
                            }} className="px-4 py-2 border rounded">রিসেট</button>
                        </div>

                {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
                </form>
            ) : (
                <div className="text-sm text-gray-600">উপরের তালিকা থেকে ধরন নির্বাচন করুন যাতে ফর্ম প্রদর্শিত হয়।</div>
            )}
        </div>
    );
};

export default AddNew;