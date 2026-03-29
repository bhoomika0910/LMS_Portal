export declare const useCart: () => {
    items: import("../store").CartItem[];
    addToCart: (item: import("../store").CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    subtotal: number;
};
