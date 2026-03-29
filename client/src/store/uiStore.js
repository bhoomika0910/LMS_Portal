import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const useUIStore = create()(devtools((set) => ({
    isSidebarOpen: false,
    isLoading: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    setLoading: (loading) => set({ isLoading: loading }),
})));
