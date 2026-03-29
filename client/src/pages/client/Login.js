import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/common';
import { PageWrapper } from '../../components/layout/PageWrapper';
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
    const onSubmit = (values) => {
        console.info('Login attempt', values);
    };
    return (_jsx(PageWrapper, { children: _jsxs("div", { className: "max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl p-10", children: [_jsx("h2", { className: "text-3xl font-heading mb-8", children: "Welcome back" }), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [_jsx(Input, { label: "Email", type: "email", ...register('email'), error: formState.errors.email?.message }), _jsx(Input, { label: "Password", type: "password", ...register('password'), error: formState.errors.password?.message }), _jsx(Button, { type: "submit", className: "w-full", children: "Sign In" })] })] }) }));
};
