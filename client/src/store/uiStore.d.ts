type UIState = {
    isSidebarOpen: boolean;
    isLoading: boolean;
};
type UIActions = {
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
};
export declare const useUIStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<UIState & UIActions>, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(partial: (UIState & UIActions) | Partial<UIState & UIActions> | ((state: UIState & UIActions) => (UIState & UIActions) | Partial<UIState & UIActions>), replace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
