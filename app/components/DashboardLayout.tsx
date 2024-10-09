import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  User,
  Bell,
  Search,
  Home,
  Briefcase,
  Mail,
  Settings,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: 'Dashboard', icon: Home },
  { name: 'Jobs', icon: Briefcase },
  { name: 'Emails', icon: Mail },
  { name: 'Settings', icon: Settings },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      {/* Left-side menu */}
      <motion.nav
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-20 ${
          isMenuOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out`}
        initial={false}
        animate={{ width: isMenuOpen ? 256 : 64 }}
      >
        <div className='flex justify-end p-4'>
          <button
            onClick={toggleMenu}
            className='text-gray-500 hover:text-blue-600'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul className='mt-8'>
          {menuItems.map((item, index) => (
            <li key={index} className='mb-4'>
              <a
                href='#'
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                  activeMenuItem === item.name
                    ? 'bg-blue-100 text-blue-600'
                    : ''
                }`}
                onClick={() => setActiveMenuItem(item.name)}
              >
                <item.icon
                  size={20}
                  className={`mr-4 ${
                    activeMenuItem === item.name
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                />
                <span className={`${!isMenuOpen && 'sr-only'}`}>
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Main content area */}
      <div
        className={`flex-1 ${
          isMenuOpen ? 'ml-64' : 'ml-16'
        } transition-all duration-300 ease-in-out`}
      >
        {/* Top bar */}
        <header className='bg-white shadow-sm sticky top-0 z-10'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h1 className='text-2xl font-semibold text-gray-800'>
              {activeMenuItem}
            </h1>
            <div className='flex items-center space-x-4'>
              <Bell
                className='text-gray-500 cursor-pointer hover:text-blue-600'
                size={20}
              />
              <User
                className='text-gray-500 cursor-pointer hover:text-blue-600'
                size={20}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className='p-6 overflow-auto h-[calc(100vh-64px)]'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
