
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FcMoneyTransfer } from 'react-icons/fc';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import { RiHistoryFill } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { FaBars } from 'react-icons/fa';
import SidebarR from '../Sidebar/SidebarR';

const Header: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const navlinks =[
        {name: "Dashboard", link: "/", icon: <LuLayoutDashboard />},
        {name: "Add new", link: "/add-new", icon: <LuPlus />},
        {name: "History", link: "/history", icon: <RiHistoryFill />},
        {name: "Profile", link: "/profile", icon:<CgProfile />},
    ];
    return (
        <>
        <div className='p-4 w-11/12 mx-auto'>
            <div className='flex justify-between items-center '>
                <a href='/' className='text-3xl font-bold text-[#427baa] flex items-center gap-1.5 nav-title'><FcMoneyTransfer /> Reeni</a>

                {/* desktop navlinks */}
                <div className='hidden md:flex justify-center items-center gap-5 text-gray-700'>
                    {navlinks.map((navlink)=>(
                        <NavLink key={navlink.link} className='flex flex-col items-center' to={navlink.link}>{navlink.icon} <span className='text-sm'>{navlink.name}</span></NavLink>
                    ))}
                </div>

                {/* mobile menu button */}
                <button onClick={() => setShowSidebar(true)} className='md:hidden text-gray-700'>
                    <FaBars className='w-4 h-4' />
                </button>
            </div>
        </div>

        <SidebarR isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
        </>
    );
};

export default Header;