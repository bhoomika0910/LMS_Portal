import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import clsx from 'clsx';
export const Button = ({ children, className, variant = 'primary', loading = false, icon, ...rest }) => {
    const content = children;
    const baseStyles = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-heading tracking-wide transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
    const variantStyles = {
        primary: 'bg-client-primary text-white hover:scale-[1.02] focus-visible:outline-client-primary',
        secondary: 'bg-client-secondary text-black hover:scale-[1.02] focus-visible:outline-client-secondary',
        outline: 'border border-white/40 text-white hover:border-white hover:scale-[1.02] focus-visible:outline-white',
    };
    return (_jsx(motion.button, { whileTap: { scale: 0.98 }, className: clsx(baseStyles, variantStyles[variant], className), disabled: loading || rest.disabled, "aria-busy": loading, ...rest, children: loading ? 'Please wait…' : (_jsxs("span", { className: "flex items-center gap-2", children: [icon, content] })) }));
};
