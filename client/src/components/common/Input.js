import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clsx from 'clsx';
export const Input = forwardRef(({ label, error, className, ...rest }, ref) => {
    return (_jsxs("label", { className: "flex flex-col gap-2 text-sm", children: [label && _jsx("span", { className: "text-white/70", children: label }), _jsx("input", { ref: ref, className: clsx('rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-client-secondary transition-all', error && 'border-red-500 focus-visible:outline-red-500', className), ...rest }), error && _jsx("span", { className: "text-red-400 text-xs", children: error })] }));
});
Input.displayName = 'Input';
