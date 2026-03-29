import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const useCartStore = create()(devtools((set) => ({
    items: [],
    addToCart: (item) => set((state) => ({
        items: state.items.find((existing) => existing.id === item.id)
            ? state.items
            : [...state.items, item],
    })),
    removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    clearCart: () => set({ items: [] }),
})));
