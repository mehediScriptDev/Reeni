
import { CgProfile } from 'react-icons/cg';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import { RiHistoryFill } from 'react-icons/ri';

const Header = () => {
    const navlinks =[
        {name: "Dashboard", link: "/dashboard", icon: <LuLayoutDashboard />},
        {name: "Add new", link: "/add-new", icon: <LuPlus />},
        {name: "History", link: "/history", icon: <RiHistoryFill />},
        {name: "Profile", link: "/profile", icon:<CgProfile />},
    ];
    return (
        <div className='p-4 w-11/12 mx-auto'>
            <div className='flex justify-between items-center '>
                <h1 className='text-3xl font-bold text-[#427baa]'>Reeni</h1>
                <div className='flex justify-center items-center gap-5 text-gray-700'>
                    {navlinks.map((navlink)=>(
                        <a className='flex flex-col items-center' href={navlink.link}>{navlink.icon} <span className='text-sm'>{navlink.name}</span></a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;