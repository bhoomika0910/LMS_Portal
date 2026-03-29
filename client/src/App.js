import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';
import { LoadingScreen } from './components/common/LoadingScreen';
export const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Suspense, { fallback: _jsx(LoadingScreen, { message: "Booting LearnSphere" }), children: _jsx(AppRouter, {}) }), _jsx(Toaster, { position: "top-right", toastOptions: { duration: 4000 } })] }));
};
