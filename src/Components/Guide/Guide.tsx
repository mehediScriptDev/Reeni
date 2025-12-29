


        const Guide = () => {

            const scrollToId = (e: React.MouseEvent, id: string) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

                    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6">

                        <header className="sm:mb-5 mb-2.5 text-center">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#427baa] tracking-tight">Reeni — ব্যবহার নির্দেশিকা</h1>
                            <p className="mt-2 text-sm sm:text-base text-gray-600">লেনদেন লিখে রাখুন, বাকি কাজ Reeni করবে। সময় হলে মনে করিয়ে দেবে, যাতে টাকা আর সম্পর্ক—দুটোই ঠিক থাকে।</p>
                        </header>

                        <nav className="mb-8 flex justify-center">
                            <ul className="flex flex-wrap gap-3 underline sm:no-underline gap-y-1 sm:gap-4 text-sm">
                                <li><a href="#lead" onClick={(e) => scrollToId(e, 'lead')} className="text-[#427baa] hover:underline">আগে জানুন</a></li>
                                <li><a href="#what" onClick={(e) => scrollToId(e, 'what')} className="text-[#427baa] hover:underline">Reeni কী</a></li>
                                <li><a href="#why" onClick={(e) => scrollToId(e, 'why')} className="text-[#427baa] hover:underline">কেন Reeni</a></li>
                                <li><a href="#add" onClick={(e) => scrollToId(e, 'add')} className="text-[#427baa] hover:underline">কিভাবে যোগ করবেন</a></li>
                                <li><a href="#dashboard" onClick={(e) => scrollToId(e, 'dashboard')} className="text-[#427baa] hover:underline">ড্যাশবোর্ড</a></li>
                                <li><a href="#reminders" onClick={(e) => scrollToId(e, 'reminders')} className="text-[#427baa] hover:underline">রিমাইন্ডার</a></li>
                                <li><a href="#privacy" onClick={(e) => scrollToId(e, 'privacy')} className="text-[#427baa] hover:underline">প্রাইভেসি</a></li>
                                <li><a href="#faq" onClick={(e) => scrollToId(e, 'faq')} className="text-[#427baa] hover:underline">প্রশ্ন</a></li>
                            </ul>
                        </nav>

                        <section id="lead" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">আগে জানুন: Reeni কেন আলাদা?</h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">আমরা সবাই ব্যস্ত। কে কাকে টাকা দিল, কবে ফেরত পাওয়ার কথা—এসব সহজেই ভুলে যাই।</p>
                            <p className="mt-2 text-gray-700 text-sm sm:text-base"> <strong>Reeni আপনাকে প্রতিদিন সকাল ৯টায় ইমেইলে মনে করিয়ে দেবে</strong>, যতদিন না আপনি বলেন — <strong>“ফেরত পেয়েছি / ফেরত দিয়েছি”</strong>।</p>
                        </section>

                        <section id="what" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Reeni কী?</h2>
                            <p className="text-gray-700 text-sm sm:text-base">Reeni হলো আপনার ব্যক্তিগত টাকা ধার–দেনা নোটবুক। আপনি যদি কাউকে টাকা দেন বা কারও কাছ থেকে টাকা নেন — সবকিছু এক জায়গায় সুন্দর করে রেখে দেয়।</p>
                        </section>

                        <section id="why" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">কেন Reeni ব্যবহার করবেন?</h2>
                            <ul className="list-disc text-sm sm:text-base list-inside text-gray-700 pl-4">
                                <li>লিখতে খুব সহজ</li>
                                <li>নির্ধারিত সময়ে রিমাইন্ডার পাঠায়</li>
                                <li>কোন টাকা বাকি, কোনটা শেষ—সব পরিষ্কার</li>
                                <li>ঝামেলা কমে, মন হালকা থাকে</li>
                            </ul>
                        </section>

                        <section id="add" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">নতুন লেনদেন কীভাবে যোগ করবেন?</h2>
                            <ol className="list-decimal text-sm sm:text-base list-inside text-gray-700 pl-4 space-y-2">
                                <li><strong>“নতুন লেনদেন”</strong> বাটনে যান</li>
                                <li>এই তথ্যগুলো দিন:
                                    <ul className="list-disc list-inside mt-1 pl-4">
                                        <li><strong>পরিমাণ</strong> — কত টাকা</li>
                                        <li><strong>নাম</strong> — যাঁর সাথে লেনদেন</li>
                                        <li><strong>টাইপ</strong> — আমি ধার নিয়েছি / আমি ধার দিয়েছি</li>
                                        <li><strong>ফেরতের তারিখ</strong> — কবে ফেরত পাওয়ার কথা</li>
                                    </ul>
                                </li>
                                <li><strong>সংরক্ষণ করুন</strong> — হয়ে গেল! ড্যাশবোর্ডে দেখা যাবে।</li>
                            </ol>
                        </section>

                        <section id="dashboard" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">ড্যাশবোর্ড বুঝে নিন</h2>
                            <p className="text-gray-700 text-sm sm:text-base">ড্যাশবোর্ডে দুইটা ট্যাব থাকবে:</p>
                            <ul className="list-disc text-sm sm:text-base list-inside text-gray-700 pl-4">
                                <li><strong>আমি ধার নিয়েছি</strong> — যেগুলো আপনাকে ফেরত দিতে হবে</li>
                                <li><strong>আমি ধার দিয়েছি</strong> — যেগুলো আপনাকে ফেরত পাওয়ার কথা</li>
                            </ul>
                        </section>

                        <section id="reminders" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">রিমাইন্ডার কীভাবে কাজ করে?</h2>
                            <p className="text-gray-700 text-sm sm:text-base">আপনি যে <strong>ফেরতের তারিখ</strong> সেট করবেন, সেই দিন থেকে প্রতিদিন সকাল ৯টায় ইমেইল রিমাইন্ডার যাবে যতদিন না আপনি স্ট্যাটাস আপডেট করেন বা এন্ট্রি মুছে ফেলেন।</p>
                            <p className="mt-2 text-gray-700 text-sm sm:text-base">টাকা ফেরত পেলে/দিলে <strong>“ফেরত পেয়েছি / ফেরত দিয়েছি”</strong> চাপুন — রিমাইন্ডার বন্ধ হবে ও এন্ট্রি হিস্ট্রিতে চলে যাবে।</p>
                        </section>

                        <section id="edit" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">এডিট, ডিলিট আর হিস্ট্রি</h2>
                            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 pl-4">
                                <li><strong>এডিট</strong>: ভুল হলে বদলাতে পারবেন</li>
                                <li><strong>ডিলিট</strong>: দরকার না হলে মুছতে পারবেন</li>
                                <li><strong>হিস্ট্রি</strong>: শেষ হয়ে যাওয়া লেনদেন এখানে থাকে</li>
                            </ul>
                        </section>

                        <section id="privacy" className="guide-section">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">আপনার তথ্য কতটা নিরাপদ?</h2>
                            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 pl-4">
                                <li>আপনার সব লেনদেন <strong>ডাটাবেজে নিরাপদে</strong> রাখা হয়</li>
                                <li>আপনার নাম ও ফোন নম্বর শুধু আপনার ডিভাইসে থাকে</li>
                                <li>আমরা আপনার ডেটা বিক্রি করি না, শেয়ারও করি না</li>
                            </ul>
                        </section>

                        <section id="faq" className="guide-section mb-0">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">প্রশ্নোত্তর</h2>
                            <details className="mb-2">
                                <summary className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm sm:text-base"><span className="font-medium">রিমাইন্ডার ইমেইল পাইনি?</span></summary>
                                <div className="mt-2 text-gray-600 text-sm sm:text-base">একবার স্প্যাম ফোল্ডার চেক করুন।</div>
                            </details>
                            <details>
                                <summary className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm sm:text-base"><span className="font-medium">আমার ডেটা কোথায় থাকে?</span></summary>
                                <div className="mt-2 text-gray-600 text-sm sm:text-base">লেনদেন ডাটাবেজে, প্রোফাইলের ছোট তথ্য আপনার ডিভাইসে।</div>
                            </details>
                        </section>

                        
                    </div>
                </>
            );
        };

        export default Guide;