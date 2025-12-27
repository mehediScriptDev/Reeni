
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FcMoneyTransfer } from 'react-icons/fc';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import { RiHistoryFill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router';
import { FaCircleQuestion } from 'react-icons/fa6';

const Header: React.FC = () => {

    const navlinks =[
        {name: "ড্যাশবোর্ড", link: "/", icon: <LuLayoutDashboard />},
        {name: "নতুন লেনদেন", link: "/add-new", icon: <LuPlus />},
        {name: "হিস্ট্রি", link: "/history", icon: <RiHistoryFill />},
        {name: "প্রোফাইল", link: "/profile", icon:<CgProfile />},
    ];
    return (
        <>
        <div className='bg-gray-200 sm:bg-[#f9fafb] border-b border-[#427baa]/5 mb-1.5'>
            <div className='p-3 w-11/12 mx-auto '>
            <div className='flex justify-between items-center '>
                <Link to='/' className='sm:text-3xl text-2xl font-bold text-[#427baa] flex items-center gap-1.5 nav-title'><FcMoneyTransfer /> Reeni</Link>

                {/* desktop navlinks */}
                <div className='hidden sm:flex justify-center items-center gap-5 text-gray-500'>
                    {navlinks.map((navlink)=>(
                        <NavLink key={navlink.link} className='flex flex-col items-center' to={navlink.link}>{navlink.icon} <span className='text-sm font-semibold'>{navlink.name}</span></NavLink>
                    ))}
                </div>

                {/* mobile CTA button (replaces hamburger) */}
                <Link to="/guide" aria-label="ব্যবহার নির্দেশিকা" className='sm:hidden inline-flex items-center bg-[#1f7fb3] text-white px-4 py-2 rounded-full shadow-sm text-[8px] transition'>
                  <FaCircleQuestion className='mr-0.5' />  কীভাবে ব্যবহার করবেন
                </Link>
            </div>
        </div>
        </div>

       
        </>
    );
};

export default Header;