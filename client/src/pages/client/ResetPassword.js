import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/common';
import { PageWrapper } from '../../components/layout/PageWrapper';
const schema = z
    .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
});
export const ResetPasswordPage = () => {
    const { token } = useParams();
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
    const onSubmit = (values) => {
        console.info('Reset password', { token, values });
    };
    return (_jsx(PageWrapper, { children: _jsxs("div", { className: "max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-10", children: [_jsx("h2", { className: "text-3xl font-heading mb-8", children: "Set a new password" }), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [_jsx(Input, { label: "Password", type: "password", ...register('password'), error: formState.errors.password?.message }), _jsx(Input, { label: "Confirm Password", type: "password", ...register('confirmPassword'), error: formState.errors.confirmPassword?.message }), _jsx(Button, { type: "submit", className: "w-full", children: "Reset password" })] })] }) }));
};
