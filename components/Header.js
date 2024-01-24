"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const menuItems = [
  { id: 'বাংলাদেশ', label: 'বাংলাদেশ' },
  { id: 'আন্তর্জাতিক', label: 'আন্তর্জাতিক' },
  { id: 'বিনোদন', label: 'বিনোদন' },
  { id: 'রাজনীতি', label: 'রাজনীতি' },
  { id: 'লাইফস্টাইল', label: 'লাইফস্টাইল' },
  { id: 'মাল্টিমিডিয়া', label: 'মাল্টিমিডিয়া' },
  { id: 'আইস্ক্রিন', label: 'আইস্ক্রিন' },
  { id: 'মতামত', label: 'মতামত' },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div className="lg:hidden">
            <ul className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block hover:text-gray-300 focus:text-gray-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link href="/"> Home </Link>
        {/* Menu for Desktop */}
        <ul className="hidden lg:flex lg:flex-row lg:space-x-4 justify-end">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block lg:inline-block lg:hover:text-gray-300 lg:focus:text-gray-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
