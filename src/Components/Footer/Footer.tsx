import React from 'react'
import { FcMoneyTransfer } from 'react-icons/fc'
import { Link } from 'react-router'

const Footer: React.FC = () => {
  return (
    <footer className="hidden sm:block bg-[#0b1a23] text-white">
      <div className="p-4 w-11/12 sm:max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
          {/* Left: logo, title and tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <FcMoneyTransfer className="w-7 h-7" />
              <span className="sm:text-2xl text-xl font-bold">Reeni</span>
            </div>
            <p className="text-sm text-white/60 mt-1">সময়মতো মনে করিয়ে দেয়, বিশ্বাস ধরে রাখে</p>
          </div>

          {/* Right: single quick link */}
          <div className="mt-2 md:mt-0">
            <Link to="/guide" aria-label="ব্যবহার নির্দেশিকা" className="text-white/60 underline text-sm lg:text-base hover:text-white transition-colors">ব্যবহার নির্দেশিকা</Link>
          </div>
        </div>
      </div>

      {/* Lower copyright bar (keep this) */}
      <div className="bg-[#0b1a23]">
        <div className="p-4 w-11/12 sm:max-w-6xl mx-auto pt-2 pb-3">
          <div className="text-center text-xs sm:text-sm text-gray-400">© {new Date().getFullYear()} Reeni. সর্বস্বত্ব সংরক্ষিত</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
