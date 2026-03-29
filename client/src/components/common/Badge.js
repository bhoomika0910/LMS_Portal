import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
export const Badge = ({ label, variant = 'neutral' }) => {
    const variants = {
        primary: 'bg-client-primary/15 text-client-primary border border-client-primary/40',
        success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
        warning: 'bg-amber-500/15 text-amber-200 border border-amber-400/30',
        neutral: 'bg-white/10 text-white/70 border border-white/15',
    };
    return _jsx("span", { className: clsx('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', variants[variant]), children: label });
};
