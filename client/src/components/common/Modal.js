import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from 'framer-motion';
const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } };
export const Modal = ({ open, onClose, title, children }) => {
    return (_jsx(AnimatePresence, { children: open && (_jsx(motion.div, { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur", initial: "hidden", animate: "visible", exit: "hidden", variants: backdrop, onClick: onClose, children: _jsxs(motion.div, { role: "dialog", "aria-modal": "true", className: "max-w-lg w-full rounded-3xl border border-white/15 bg-client-bg p-8 shadow-glow", initial: "hidden", animate: "visible", exit: "hidden", variants: scaleIn, onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-2xl font-heading", children: title }), _jsx("button", { "aria-label": "Close modal", onClick: onClose, className: "text-white/70 hover:text-white", children: "\u2715" })] }), children] }) })) }));
};
