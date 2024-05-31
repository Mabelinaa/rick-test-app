import { create } from 'zustand';

export interface ScreenSizeState {
    screenSize: number;

    setScreenSize: (size: number) => any;
    };

export const useScreenSizeStore = create<ScreenSizeState>((set) => ({
    screenSize: 0,

    setScreenSize:  (size: number) => set({ screenSize: size }),
    }));

    