import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
export const Navbar = () => {
    const { theme } = useTheme();
    return (_jsx("header", { className: "sticky top-0 inset-x-0 backdrop-blur-xl bg-black/30 z-50", children: _jsxs("nav", { className: "max-w-6xl mx-auto flex items-center justify-between py-4 px-4 md:px-0", children: [_jsx(Link, { to: "/", className: "text-2xl font-heading tracking-tight", children: "LearnSphere" }), _jsxs("div", { className: "flex items-center gap-4 text-sm uppercase tracking-widest", children: [_jsx(Link, { to: "/courses", className: "hover:text-client-secondary transition-colors", children: "Catalog" }), _jsx(Link, { to: "/dashboard/student", className: "hover:text-client-secondary transition-colors", children: "Dashboard" }), _jsx("span", { className: "px-3 py-1 border border-white/15 rounded-full text-xs", children: theme.toUpperCase() })] })] }) }));
};
