import { useMemo } from 'react';
import { useCartStore } from '../store';
export const useCart = () => {
    const { items, addToCart, removeFromCart, clearCart } = useCartStore();
    const totals = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
    return { items, addToCart, removeFromCart, clearCart, subtotal: totals };
};
