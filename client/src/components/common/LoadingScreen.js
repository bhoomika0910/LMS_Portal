import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LoadingScreen = ({ message = 'Loading...' }) => {
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center gap-4 bg-client-bg text-white", children: [_jsx("div", { className: "h-16 w-16 border-4 border-client-secondary border-t-transparent rounded-full animate-spin", "aria-hidden": true }), _jsx("p", { className: "text-lg font-heading tracking-wide", children: message })] }));
};
