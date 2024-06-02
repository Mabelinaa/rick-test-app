import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchInput from './SearchInput';

const Topbar = () => {

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = (isOpen: boolean) => {
    setIsSearchOpen(isOpen);
  };

  const isEpisodesPage = router.pathname === '/' || router.pathname === '/episode/[id]';
  const isLocationsPage = router.pathname === '/locations' || router.pathname === '/location/[id]';

  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full">

        {/* Menu, Icon, Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMenu}
            className="focus:outline-none bg-purple-700 p-2 rounded-md text-white md:bg-purple-600"
            title='Menu'
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {!isSearchOpen && (
            <Link href='/' className={`relative ${isSearchOpen ? 'w-full' : 'w-0'} self-center text-2xl font-semibold whitespace-nowrap transition-all duration-300`}>
              Rick And Morty
            </Link>
          )}
            
        </div>
        
        {/* Search & profile */}
        <div className="flex items-center space-x-4">
            
          <SearchInput onToggle={handleSearchToggle}/>

          <Link href="/user">
            <img className="rounded-full w-8 h-8 bg-center" src="/logo.jpg" alt="Profile" />
          </Link>

        </div>

        {/* Modal Menu */}
        {isMenuOpen && (
          <div className="fixed top-16 left-0 bg-purple-700 w-80 h-auto p-4 shadow-lg rounded-md z-50">
            {(isEpisodesPage || !isLocationsPage) && (
              <Link href="/locations" className="block px-4 py-2 text-white">
                Localizaciones
              </Link>
            )}
            {(isLocationsPage || !isEpisodesPage) && (
              <Link href="/" className="block px-4 py-2 text-white">
                Episodios
              </Link>
            )}
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Topbar;
