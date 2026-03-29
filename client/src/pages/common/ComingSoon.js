import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ComingSoon = ({ title, description }) => {
    return (_jsx("section", { className: "min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-6", children: _jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-10 shadow-glow max-w-3xl", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-client-secondary mb-2", children: "In Progress" }), _jsx("h1", { className: "text-4xl font-heading mb-4", children: title }), _jsx("p", { className: "text-white/70 text-lg", children: description ?? 'This experience is being crafted with meticulous detail. Check back soon!' })] }) }));
};
