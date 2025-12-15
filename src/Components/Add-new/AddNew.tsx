import React, { useState } from 'react';

const AddNew: React.FC = () => {
    const [mode, setMode] = useState<'lent' | 'borrowed' | ''>('');
    const [amount, setAmount] = useState('');
    const [givenDate, setGivenDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [returnDate, setReturnDate] = useState<string>('');
    const [recipientName, setRecipientName] = useState('');
    const [fromName, setFromName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount) {
            setMessage('অনুগ্রহ করে টাকার পরিমাণ লিখুন');
            return;
        }

        // Build confirmation message based on mode
        if (mode === 'lent') {
            setMessage(`নতুন এন্ট্রি যোগ হয়েছে — পরিমাণ: ${amount}, কাকে: ${recipientName || '-'}, দেয়ার তারিখ: ${givenDate}, ফেরত: ${returnDate || '-'}`);
        } else {
            setMessage(`নতুন এন্ট্রি যোগ হয়েছে — পরিমাণ: ${amount}, কার থেকে: ${fromName || '-'}, নেওয়ার তারিখ: ${givenDate}, ফেরত: ${returnDate || '-'}`);
        }

        // reset form
        setAmount('');
        setGivenDate(new Date().toISOString().slice(0, 10));
        setReturnDate('');
        setRecipientName('');
        setFromName('');
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded border border-gray-200 shadow">
            <h2 className="text-2xl font-semibold mb-4">নতুন এন্ট্রি যোগ করুন</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">ধরন নির্বাচন করুন</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-64 px-3 py-2 border rounded"
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
                        className="mt-1 block w-full border rounded px-3 py-2"
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
                                className="mt-1 block w-full border rounded px-3 py-2"
                                placeholder="ব্যক্তির নাম লিখুন"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">দেওয়ার তারিখ</label>
                            <input type="date" value={givenDate} onChange={(e) => setGivenDate(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ফেরত দেওয়ার তারিখ</label>
                            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">কার থেকে</label>
                            <input
                                value={fromName}
                                onChange={(e) => setFromName(e.target.value)}
                                className="mt-1 block w-full border rounded px-3 py-2"
                                placeholder="ব্যক্তির নাম লিখুন"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">নেয়ার তারিখ</label>
                            <input type="date" value={givenDate} onChange={(e) => setGivenDate(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ফেরত দেওয়ার তারিখ</label>
                            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                        </div>
                    </>
                )}

                        <div className="flex items-center gap-3">
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">সংরক্ষণ করুন</button>
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