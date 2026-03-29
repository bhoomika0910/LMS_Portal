import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  thumbnail?: string;
};

type CartState = {
  items: CartItem[];
};

type CartActions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState & CartActions>()(
  devtools((set) => ({
    items: [],
    addToCart: (item) =>
      set((state) => ({
        items: state.items.find((existing) => existing.id === item.id)
          ? state.items
          : [...state.items, item],
      })),
    removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    clearCart: () => set({ items: [] }),
  })),
);
