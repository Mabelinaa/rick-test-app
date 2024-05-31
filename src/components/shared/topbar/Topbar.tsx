import { useState } from 'react';
import Link from 'next/link';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full">

        {/* Icono Menú y Título */}
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
          <Link href='./' className="self-center text-2xl font-semibold whitespace-nowrap">
            Rick And Morty
          </Link>
        </div>
        
        {/* Buscador y Perfil */}
        <div className="flex items-center space-x-4">
            
          {/* Lupa */}
          <div className="flex md:order-2">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden focus:outline-none bg-purple-700 p-2 rounded-md text-white md:bg-purple-600">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
            
          </div>

          {/* Buscador */}
          <div className="hidden md:block">
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          {/* Perfil */}
          <Link href="/user">
            <img className="rounded-full w-8 h-8 bg-center" src="/logo.jpg" alt="Profile" />
          </Link>

        </div>

        {/* Menu  */}
        {isMenuOpen && (
          <div className="fixed top-16 left-0 bg-purple-700 w-80 h-auto p-4 shadow-lg rounded-md z-50">
            <Link href="/episodes" className="block px-4 py-2 text-white">
              Episodios
            </Link>
            <Link href="/locations" className="block px-4 py-2 text-white">
              Localizaciones
            </Link>
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Topbar;
