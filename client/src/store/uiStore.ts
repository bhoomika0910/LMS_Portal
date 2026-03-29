import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UIState = {
  isSidebarOpen: boolean;
  isLoading: boolean;
};

type UIActions = {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
};

export const useUIStore = create<UIState & UIActions>()(
  devtools((set) => ({
    isSidebarOpen: false,
    isLoading: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    setLoading: (loading) => set({ isLoading: loading }),
  })),
);
