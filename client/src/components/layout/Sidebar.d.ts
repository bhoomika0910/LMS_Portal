type SidebarProps = {
    links: {
        label: string;
        to: string;
        icon?: string;
    }[];
    accentColor?: string;
};
export declare const Sidebar: ({ links, accentColor }: SidebarProps) => import("react/jsx-runtime").JSX.Element;
export {};
