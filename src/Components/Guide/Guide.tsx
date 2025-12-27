

const Guide = () => {
    return (
        <>
            <style>{`
                details > summary {
                    list-style: none;
                }
                details > summary::-webkit-details-marker {
                    display: none;
                }
                details svg {
                    transition: transform .18s ease;
                }
                details[open] svg {
                    transform: rotate(90deg);
                }
            `}</style>
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <header className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ব্যবহার নির্দেশিকা</h1>
                <p className="mt-2 text-sm text-gray-600">Reeni — স্মার্ট রিমাইন্ডার ও লেনদেন ট্র্যাকিং। এই পৃষ্ঠাটি আপনাকে দ্রুত শুরু করতে এবং সক্রিয়ভাবে ব্যবহার করতে সাহায্য করবে।</p>
            </header>

            <nav className="mb-6">
                <ul className="flex flex-wrap gap-3 text-sm">
                    <li><a href="#quick-start" className="text-[#427baa] hover:underline">দ্রুত শুরু</a></li>
                    <li><a href="#add" className="text-[#427baa] hover:underline">নতুন লেনদেন</a></li>
                    <li><a href="#manage" className="text-[#427baa] hover:underline">সম্পাদনা ও মুছুন</a></li>
                    <li><a href="#verify" className="text-[#427baa] hover:underline">ইমেইল ভেরিফিকেশন</a></li>
                    <li><a href="#faq" className="text-[#427baa] hover:underline">প্রশ্ন ও উত্তর</a></li>
                </ul>
            </nav>

            <section id="quick-start" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">দ্রুত শুরু</h2>
                <ol className="mt-3 space-y-3 list-decimal list-inside text-gray-700">
                    <li>
                        অ্যাকাউন্ট তৈরি বা লগইন করুন — আপনার ডাটা নিরাপদ রাখতে ইমেইল ভেরিফিকেশন সম্পন্ন করুন।
                    </li>
                    <li>
                        'নতুন লেনদেন' এ গিয়ে রেকর্ড যোগ করুন — পরিমাণ, নাম, নেওয়ার তারিখ এবং ফেরতের তারিখ সেট করুন।
                    </li>
                    <li>
                        আপনার ড্যাশবোর্ড থেকে লেনদেন ট্র্যাক করুন — রিমাইন্ডার সেটিংস অনুযায়ী Reeni আপনাকে সময়মতো জানাবে।
                    </li>
                </ol>
            </section>

            <section id="add" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">নতুন লেনদেন কীভাবে যোগ করবেন</h2>
                <div className="mt-3 text-gray-700 space-y-2">
                    <p>১) সাইডবার বা হেডার থেকে <strong>নতুন লেনদেন</strong> খুলুন।</p>
                    <p>২) ফর্মে নিম্নলিখিত তথ্য দিন:
                        <ul className="list-disc list-inside mt-2">
                            <li><strong>পরিমান</strong> — কত টাকা।</li>
                            <li><strong>ব্যক্তির নাম</strong> — যার কাছ থেকে/কাকে আপনি ধার নিয়েছেন/দিয়েছেন।</li>
                            <li><strong>টাইপ</strong> — নির্দিষ্ট করুন এটি <em>আপনি ধার নিয়েছেন (Borrowed)</em> নাকি <em>আপনি ধার দিয়েছেন (Lent)</em>।</li>
                            <li><strong>নেওয়া/ফেরতের তারিখ</strong> — প্রয়োজনমতো রিমাইন্ডার দিন।</li>
                            <li><strong>নোট</strong> (ঐচ্ছিক) — অতিরিক্ত বিবরণ।</li>
                        </ul>
                    </p>
                    <p>৩) <strong>সংরক্ষণ</strong> করলে এন্ট্রি ড্যাশবোর্ডে ও হিস্ট্রিতে দেখাবে এবং নির্ধারিত সময়ে রিমাইন্ডার কাজ করবে।</p>
                </div>
            </section>

            <section id="manage" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">সম্পাদনা, মুছুন ও স্ট্যাটাস</h2>
                <div className="mt-3 text-gray-700 space-y-2">
                    <p><strong>সম্পাদনা:</strong> প্রতিটি এন্ট্রির পাশে থাকা এডিট আইকন ক্লিক করে তথ্য বদলান এবং সেভ করুন।</p>
                    <p><strong>মুছুন:</strong> ডিলিট বাটন ক্লিক করে এন্ট্রি মুছে ফেলুন — সতর্কতা: মুছলে ডেটা চলে যাবে।</p>
                    <p><strong>স্ট্যাটাস আপডেট:</strong> যখন টাকার ফেরত পান, সেই এন্ট্রিতে <em>ফেরত পেয়েছেন</em> হিসেবে চিহ্ন দিন — তখন সেই রেকর্ড হিস্ট্রিতে স্থানান্তরিত হতে পারে।</p>
                    <p><strong>কীভাবে দেখবেন আপনি কার কাছ থেকে ধার নিয়েছিলেন এবং কারকে ধার দিয়েছেন:</strong></p>
                    <ul className="list-disc list-inside mt-2">
                        <li>ড্যাশবোর্ডে মূল তালিকা — সাম্প্রতিক ও আসন্ন রিমাইন্ডার দেখায়।</li>
                        <li>হিস্ট্রি/ফিল্টারস: 'টাইপ' বা 'স্ট্যাটাস' ফিল্টার ব্যবহার করে দেখুন —
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>Borrowed / ধার নেয়া:</strong> আপনার হয়ে থাকা এন্ট্রিগুলো যেখানে আপনি টাকা নিয়েছেন (আপনি ব্যবহারকারী হিসাবে Receiver)।</li>
                                <li><strong>Lent / ধার দিয়েছেন:</strong> সেই এন্ট্রিগুলো যেখানে আপনি অন্যকে দিয়েছেন (আপনি Lender)।</li>
                            </ul>
                        </li>
                        <li>সার্চ বক্সে ব্যক্তির নাম টিপে দ্রুত সেই ব্যক্তির সব রেকর্ড দেখুন।</li>
                    </ul>
                </div>
            </section>

            <section id="verify" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">ইমেইল ভেরিফিকেশন ও সাইন-ইন</h2>
                <div className="mt-3 text-gray-700 space-y-2">
                    <p>নিরাপত্তার জন্য ইমেইল ভেরিফাই করুন। ভেরিফিকেশন না করলে কিছু কার্যকারিতা সীমিত হতে পারে। ভেরিফিকেশন ইমেইল না পেলে 'রিসেন্ড' বাটন ব্যবহার করুন।</p>
                </div>
            </section>

            <section id="tips" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">টিপস</h2>
                <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2">
                    <li>প্রোফাইল পেইজে নাম ও ফোন নম্বর ঠিক রাখুন — এটি রেকর্ডগুলোতে প্রদর্শিত হবে।</li>
                    <li>রিমাইন্ডার সময়গুলো এমনভাবে বেছে নিন যাতে আপনাকে যথাসময়ে মেসেজ/ইমেইল পাওয়া যায়।</li>
                    <li>সেশনক্যাশে (sessionStorage) কাচে ড্যাশবোর্ড দ্রুত লোড করতে সাহায্য করে — লগআউট করলে সেটি মুছে যাবে।</li>
                </ul>
            </section>

            <section id="faq" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">প্রশ্ন ও উত্তর</h2>
                <div className="mt-3 space-y-3 text-gray-700">
                    <details className="bg-gray-50 p-3 rounded">
                        <summary className="flex items-center gap-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-medium text-gray-800">আমি ইমেইল ভেরিফিকেশন পাইনি — কি করব?</span>
                        </summary>
                        <div className="mt-2">জাঞ্জাব করুন স্প্যাম ফোল্ডার; তারপর অ্যাপ থেকে রিসেন্ড করুন। যদি তবুও সমস্যা থাকে, আমাদেরকে ইমেইল করুন।</div>
                    </details>

                    <details className="bg-gray-50 p-3 rounded">
                        <summary className="flex items-center gap-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-medium text-gray-800">ডেটা কোথায় সংরক্ষিত হয়?</span>
                        </summary>
                        <div className="mt-2">আপনার লেনদেন সার্ভারে সংরক্ষিত হয় (ডেপ্লয়ড ব্যাকএন্ড) এবং ব্যক্তিগত তথ্য লোকাল-স্টোরেজ/প্রোফাইলে সাময়িকভাবে রাখা হতে পারে।</div>
                    </details>
                </div>
            </section>

            

        </div>
        </>
    );
};

export default Guide;