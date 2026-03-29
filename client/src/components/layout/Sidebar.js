import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
export const Sidebar = ({ links, accentColor = '#6C63FF' }) => {
    return (_jsxs("aside", { className: "hidden lg:flex flex-col w-60 min-h-screen border-r border-white/10 bg-white/5/50 backdrop-blur-xl", children: [_jsx("div", { className: "px-6 py-8 text-2xl font-heading", children: "Portal" }), _jsx("nav", { className: "flex-1 space-y-1 px-3 pb-6", children: links.map((link) => (_jsxs(NavLink, { to: link.to, className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'text-white' : 'text-white/60 hover:text-white'} ` +
                        (isActive ? 'bg-black/30 shadow-glow' : 'hover:bg-white/5'), style: ({ isActive }) => (isActive ? { borderLeft: `3px solid ${accentColor}` } : undefined), children: [_jsx("span", { className: "text-xs font-mono uppercase tracking-[0.25em]", children: link.icon ?? '•' }), link.label] }, link.to))) })] }));
};
