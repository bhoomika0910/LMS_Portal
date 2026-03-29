import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/common';
import { PageWrapper } from '../../components/layout/PageWrapper';

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    console.info('Register attempt', values);
  };

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
        <h2 className="text-3xl font-heading mb-8">Create your account</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" {...register('name')} error={formState.errors.name?.message} />
          <Input label="Email" type="email" {...register('email')} error={formState.errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={formState.errors.password?.message} />
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={formState.errors.confirmPassword?.message}
          />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </div>
    </PageWrapper>
  );
};
