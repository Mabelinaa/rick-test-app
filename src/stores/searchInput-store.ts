import create from 'zustand';

interface SearchInputStore {
  searchTerm: string;

  setSearchTerm: (term: string) => void;
}

const useSearchStore = create<SearchInputStore>((set) => ({
  searchTerm: '',
  
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearchStore;
