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
export declare const useCartStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<CartState & CartActions>, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(partial: (CartState & CartActions) | Partial<CartState & CartActions> | ((state: CartState & CartActions) => (CartState & CartActions) | Partial<CartState & CartActions>), replace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
