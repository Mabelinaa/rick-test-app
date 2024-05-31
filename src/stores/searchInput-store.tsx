import { create } from 'zustand';

interface SearchInputState {
    searchInput: string;

    setSearchInput: (searchInput: string) => void;
    getSearchInput: () => string;
    };

export const useSearchInputStore = create<SearchInputState>((set) => ({
    searchInput: '',

    setSearchInput: (searchInput) => set({ searchInput }),
    getSearchInput: () => set({ searchInput })
    })
);

