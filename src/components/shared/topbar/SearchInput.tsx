import React, { useState } from 'react'

import useSearchInputStore from '@/stores/searchInput-store';

interface SearchInputProps {
    onToggle: (isOpen: boolean) => void;
  }

function SearchInput({ onToggle }: SearchInputProps) {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { searchTerm, setSearchTerm } = useSearchInputStore();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleToggleSearch = () => {
        const newIsSearchOpen = !isSearchOpen;
        setIsSearchOpen(newIsSearchOpen);
        onToggle(newIsSearchOpen);
      };

    return (
      <>

        {/* Lupa */}    
          <div className="flex md:order-2">
            <button
            type="button"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
            onClick={handleToggleSearch}
            className="md:hidden focus:outline-none bg-purple-700 p-2 rounded-md text-white md:bg-purple-600"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
        
        {/* Input Search */}
        <div className={`relative ${isSearchOpen ? 'w-full' : 'w-0'} md:w-auto transition-all duration-300 overflow-hidden`}>
          <input
            type="text"
            id="search-navbar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="..."
          />
        </div>
    </>

  )
}

export default SearchInput
