import React from "react";
import { NavLink } from "react-router";
import { FaHome, FaPlusSquare, FaClock, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type MenuItem = {
  label: string;
  to: string;
  icon: React.ComponentType<any>;
};

const menu: MenuItem[] = [
  { label: "Dashboard", to: "/", icon: FaHome },
  { label: "Add new", to: "/add-new", icon: FaPlusSquare },
  { label: "History", to: "/history", icon: FaClock },
  { label: "Profile", to: "/profile", icon: FaUser },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidebarR: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  };

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: '0%', transition: { duration: 0.18 } },
    exit: { x: '100%', transition: { duration: 0.14 } },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.02, delayChildren: 0.03 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.12 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px]"
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <motion.aside
            key="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-screen w-64 z-50 bg-[#212223] text-gray-200 flex flex-col shadow-2xl"
          >
            <div className="px-4 py-5 border-b border-[#2a2b2c] flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold">Reeni</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <motion.nav className="flex-1 px-3 py-4" variants={listVariants} initial="hidden" animate="visible">
              <ul className="space-y-1">
                {menu.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.li key={item.to} variants={itemVariants}>
                      <NavLink
                        to={item.to}
                        end
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-[#00bc91]/10 text-[#00bc91] border-l-2 border-[#00bc91]"
                              : "text-gray-400 hover:text-white hover:bg-[#2a2b2c]"
                          }`
                        }
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>

            <div className="px-3 py-4 border-t border-[#2a2b2c] text-sm text-gray-400">
              <div>© {new Date().getFullYear()} Reeni</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarR;
