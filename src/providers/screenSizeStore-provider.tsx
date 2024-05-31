'use client';

import { useEffect, useRef, createContext, ReactNode, useContext } from 'react';
import { StoreApi, useStore } from 'zustand';
import { useScreenSizeStore, ScreenSizeState } from '@/stores/screenSize-store';

export const ScreenSizeStoreContext = createContext<StoreApi<ScreenSizeState> | null>(null);

export interface ScreenSizeStoreProviderProps {
    children: ReactNode;
}

export const ScreenSizeStoreProvider = ({ children }: ScreenSizeStoreProviderProps) => {
    const store = useRef<StoreApi<ScreenSizeState>>();
    if (!store.current) {
        store.current = useScreenSizeStore;
    }

    useEffect(() => {
        const updateSize = () => {
            if (store.current) {
                store.current.getState().setScreenSize(window.innerWidth);
            }
        };

        updateSize(); // Set initial size
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <ScreenSizeStoreContext.Provider value={store.current}>
            {children}
        </ScreenSizeStoreContext.Provider>
    );
};

export const useScreenSizeContext = <T,>(selector: (store: ScreenSizeState) => T): T => {
    const storeContext = useContext(ScreenSizeStoreContext);

    if (!storeContext) {
        throw new Error('useScreenSizeContext must be used within a ScreenSizeStoreProvider');
    }

    return useStore(storeContext, selector);
};
