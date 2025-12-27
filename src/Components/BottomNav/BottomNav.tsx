

import React from 'react'
import { Link, useLocation } from 'react-router'
import { FiHome, FiPlusCircle, FiClock } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'

const BottomNav: React.FC = () => {
    const loc = useLocation()

    const isActive = (path: string) => {
        if (path === '/') return loc.pathname === '/' || loc.pathname === '/dashboard'
        return loc.pathname.startsWith(path)
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t border-[#427baa]/10 sm:hidden z-40">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-2">
                <Link to="/" className={`flex-1 py-3 px-1 flex flex-col items-center text-[11px] ${isActive('/') ? 'text-[#427baa] border-t-2' : 'text-gray-600'}`} aria-label="ড্যাশবোর্ড">
                    <FiHome className="w-6 h-6" />
                    <span className="mt-1">ড্যাশবোর্ড</span>
                </Link>

                <Link to="/add-new" className={`flex-1 py-3 px-1 flex flex-col items-center text-[11px] ${isActive('/add-new') ? 'text-[#427baa] border-t-2' : 'text-gray-600'}`} aria-label="নতুন লেনদেন">
                    <FiPlusCircle className="w-6 h-6" />
                    <span className="mt-1">নতুন লেনদেন</span>
                </Link>

                <Link to="/history" className={`flex-1 py-3 px-1 flex flex-col items-center text-[11px] ${isActive('/history') ? 'text-[#427baa] border-t-2' : 'text-gray-600'}`} aria-label="লেনদেনের হিস্ট্রি">
                    <FiClock className="w-6 h-6" />
                    <span className="mt-1">হিস্ট্রি</span>
                </Link>

                <Link to="/profile" className={`flex-1 py-3 px-1 flex flex-col items-center text-[11px] ${isActive('/profile') ? 'text-[#427baa] border-t-2' : 'text-gray-600'}`} aria-label="প্রোফাইল">
                    <FaUser className="w-5 h-5" />
                    <span className="mt-1">প্রোফাইল</span>
                </Link>
            </div>
        </nav>
    )
}

export default BottomNav