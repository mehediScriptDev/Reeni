

const Guide = () => {
    

    const scrollToId = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // update hash without jumping
            if (history && history.replaceState) history.replaceState(null, '', `#${id}`);
        }
    };

    return (
        <>
            <style>{`
                details > summary { list-style: none; }
                details > summary::-webkit-details-marker { display: none; }
                details svg { transition: transform .18s ease; }
                details[open] svg { transform: rotate(90deg); }
                                .guide-section { border-left: 3px solid #427baa; padding-left: 1rem; margin: 0.4rem 0; background: #fcfcfc; border-radius: 0.5rem; }
                                .guide-section:not(:first-child) { margin-top: 1.3rem; }
                                @media (min-width: 640px) {
                                    .guide-section { margin: 0 0 2rem 0; padding-left: 1.25rem; }
                                    .guide-section:not(:first-child) { margin-top: 2rem; }
                                }
            `}</style>

            <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6">

                <header className="sm:mb-5 mb-2.5 text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#427baa] tracking-tight">Reeni — ব্যবহার নির্দেশিকা</h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">সহজে লেনদেন ট্র্যাক করুন, সময়মতো রিমাইন্ডার পান, এবং আপনার ডেটা নিরাপদে রাখুন।</p>
                </header>

                <nav className="mb-10 flex justify-center">
                    <ul className="flex flex-wrap gap-3 gap-y-0.5 sm:gap-4 text-xs sm:text-sm">
                            <li><a href="#intro" onClick={(e) => scrollToId(e, 'intro')} className="text-[#427baa] hover:underline">পরিচিতি</a></li>
                            <li><a href="#quick-start" onClick={(e) => scrollToId(e, 'quick-start')} className="text-[#427baa] hover:underline">দ্রুত শুরু</a></li>
                            <li><a href="#add" onClick={(e) => scrollToId(e, 'add')} className="text-[#427baa] hover:underline">নতুন লেনদেন</a></li>
                            <li><a href="#reminders" onClick={(e) => scrollToId(e, 'reminders')} className="text-[#427baa] hover:underline">রিমাইন্ডার</a></li>
                            <li><a href="#privacy" onClick={(e) => scrollToId(e, 'privacy')} className="text-[#427baa] hover:underline">গোপনীয়তা</a></li>
                            <li><a href="#faq" onClick={(e) => scrollToId(e, 'faq')} className="text-[#427baa] hover:underline">প্রশ্নোত্তর</a></li>
                    </ul>
                </nav>

                <section id="intro" className="guide-section">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">পরিচিতি</h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">Reeni হলো একটি হালকা আর সহজ টুল আপনার ব্যক্তিগত লেনদেন ও রিমাইন্ডার ম্যানেজ করার জন্য। আপনি ধার নিয়েছেন বা ধার দিয়েছেন — উভয় কেসেই Reeni সাহায্য করবে নিয়মিত ট্র্যাকিং ও স্মরণ করিয়ে দিতে।</p>
                </section>

                <section id="quick-start" className="guide-section">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">কেন Reeni ব্যবহার করবেন</h2>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 pl-4">
                        <li>সহজ, দ্রুত এন্ট্রি করা যায়</li>
                        <li>নির্ধারিত সময়ে ইমেইল/রিমাইন্ডার পাঠায়</li>
                        <li>আপনার লেনদেন সার্বিকভাবে ট্র্যাক করে হিস্ট্রি অপশন দেয়</li>
                    </ul>
                </section>

                <section id="add" className="guide-section">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">নতুন লেনদেন কীভাবে যোগ করবেন</h2>
                    <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside text-gray-700 pl-4">
                        <li>হেডার বা নেভিগেশন থেকে <span className="font-semibold">নতুন লেনদেন</span> খুলুন</li>
                        <li>ফর্মে নিম্নলিখিত তথ্য দিন:
                            <ul className="list-disc list-inside mt-1 pl-4">
                                <li><span className="font-semibold">পরিমাণ</span> — টাকার পরিমাণ</li>
                                <li><span className="font-semibold">ব্যক্তির নাম</span> — যার সাথে লেনদেন</li>
                                <li><span className="font-semibold">টাইপ</span> — আপনি ধার নিয়েছেন বা ধার দিয়েছেন</li>
                                <li><span className="font-semibold">নেওয়া/ফেরতের তারিখ</span> — ফেরত দিবেন কবে</li>
                                <li><span className="font-semibold">নোট</span> — চাইলে সংক্ষিপ্ত বিবরণ যোগ করুন</li>
                            </ul>
                        </li>
                        <li>সংরক্ষণ করলে রেকর্ড ড্যাশবোর্ডে প্রদর্শিত হবে এবং নির্ধারিত সময়ে রিমাইন্ডার কাজ করবে</li>
                    </ol>
                </section>

                <section id="reminders" className="guide-section">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">রিমাইন্ডার নিয়ে গুরুত্বপূর্ণ তথ্য</h2>
                    <p className="text-gray-700 text-sm sm:text-base mb-2">Reeni-তে আপনি যে 'ফেরতের তারিখ' সেট করবেন, সেই তারিখেই রিমাইন্ডার পাঠানো হতে পারে। এবং ফেরত না পাওয়া পর্যন্ত প্রতিদিন রিমাইন্ডার পাঠানো হবে।</p>
                    <ul className="list-disc list-inside pl-4 text-sm sm:text-base text-gray-700">
                        <li>আপনি ফেরত পেলে সেটি <em>ফেরত পেয়েছেন</em> হিসেবে চিহ্নিত করুন, তাহলে পরবর্তী রিমাইন্ডার বন্ধ হবে</li>
                    </ul>
                </section>

                <section id="manage" className="guide-section">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">মডিফাই, ডিলিট এবং স্ট্যাটাস</h2>
                    <ul className="list-disc list-inside pl-4 text-sm sm:text-base text-gray-700 space-y-1">
                        <li><span className="font-semibold">সম্পাদনা:</span> তালিকায় এন্ট্রির পাশে থাকা এডিট বাটন থেকে তথ্য পরিবর্তন করুন</li>
                        <li><span className="font-semibold">মুছুন:</span> ডিলিট আইকন ব্যবহার করে রেকর্ড মুছতে পারবেন — সতর্ক থাকুন, এটি স্থায়ী হতে পারে</li>
                        <li><span className="font-semibold">ফেরত পেয়েছেন হিসেবে চিহ্নিত করুন:</span> টাকা ফেরত পাওয়ার পর সেই এন্ট্রিকে <em>ফেরত পেয়েছেন</em> হিসেবে আপডেট করুন — তখন সেটি হিস্ট্রিতে চলে যাবে</li>
                    </ul>
                </section>

                <section id="privacy" className="guide-section">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">প্রাইভেসি ও নিরাপত্তা</h2>
                    <ul className="list-disc list-inside text-sm sm:text-base pl-4 text-gray-700 space-y-1">
                        <li>আপনার লেনদেন সার্ভারে সংরক্ষিত হয়। কিঞ্চিৎ প্রোফাইল তথ্য (যেমন নাম/ফোন) লোকাল-স্টোরেজে স্মরণ করার জন্য ব্যবহার করা হতে পারে</li>
                        <li>আপনার ডেটা নিরাপত্তার জন্য আমরা সর্বোচ্চ প্রচেষ্টা করি, তবে ইন্টারনেটে সম্পূর্ণ নিরাপত্তা নিশ্চিত করা সম্ভব নয়</li>
                        <li>অবশ্যই পাসওয়ার্ড ব্যবহারে সতর্কতা অবলম্বন করুন এবং পাবলিক ডিভাইসে লগআউট করুন</li>
                    </ul>
                </section>

                <section id="faq" className="guide-section mb-0">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">প্রশ্ন ও উত্তর</h2>
                    <details className="mb-2">
                        <summary className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-medium text-sm sm:text-base">ইমেইল ভেরিফিকেশন পাইনি — কি করব?</span>
                        </summary>
                        <div className="mt-2 text-sm sm:text-base text-gray-600">স্প্যাম/জাঙ্ক ফোল্ডার চেক করুন; তবুও না পেলে অ্যাপ থেকে রিসেন্ড করুন।</div>
                    </details>
                    <details>
                        <summary className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-medium text-sm sm:text-base">ডেটা কোথায় সংরক্ষিত হয়?</span>
                        </summary>
                        <div className="mt-2 text-sm sm:text-base text-gray-600">আপনার লেনদেন সার্ভারে সংরক্ষিত হয়।</div>
                    </details>
                </section>
            </div>
        </>
    );
};

export default Guide;