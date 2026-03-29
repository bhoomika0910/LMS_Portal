import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '../../components/common';
export const NotFoundPage = () => (_jsxs("section", { className: "min-h-screen bg-client-bg flex flex-col items-center justify-center gap-6 text-center text-white px-6", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.8em] text-client-secondary", children: "404" }), _jsx("h1", { className: "text-4xl font-heading", children: "The void is empty." }), _jsx("p", { className: "text-white/60 max-w-xl", children: "The experience you are seeking is still in production. Return to the launchpad and keep exploring." }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "primary", children: "Back to Home" }) })] }));
