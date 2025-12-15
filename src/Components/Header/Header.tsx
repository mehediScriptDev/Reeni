
import { CgProfile } from 'react-icons/cg';
import { FcMoneyTransfer } from 'react-icons/fc';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import { RiHistoryFill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router';

const Header = () => {
    const navlinks =[
        {name: "Dashboard", link: "/", icon: <LuLayoutDashboard />},
        {name: "Add new", link: "/add-new", icon: <LuPlus />},
        {name: "History", link: "/history", icon: <RiHistoryFill />},
        {name: "Profile", link: "/profile", icon:<CgProfile />},
    ];
    return (
        <div className='p-4 w-11/12 mx-auto'>
            <div className='flex justify-between items-center '>
                <a href='/' className='text-3xl font-bold text-[#427baa] flex items-center gap-1.5 nav-title'><FcMoneyTransfer /> Reeni</a>
                <div className='flex justify-center items-center gap-5 text-gray-700'>
                    {navlinks.map((navlink)=>(
                        <NavLink className='flex flex-col items-center' to={navlink.link}>{navlink.icon} <span className='text-sm'>{navlink.name}</span></NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;