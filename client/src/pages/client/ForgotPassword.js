import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/common';
import { PageWrapper } from '../../components/layout/PageWrapper';
const schema = z.object({ email: z.string().email() });
export const ForgotPasswordPage = () => {
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
    const onSubmit = (values) => {
        console.info('Forgot password request', values);
    };
    return (_jsx(PageWrapper, { children: _jsxs("div", { className: "max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-10", children: [_jsx("h2", { className: "text-3xl font-heading mb-8", children: "Reset access" }), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [_jsx(Input, { label: "Email", type: "email", ...register('email'), error: formState.errors.email?.message }), _jsx(Button, { type: "submit", className: "w-full", children: "Send magic link" })] })] }) }));
};
