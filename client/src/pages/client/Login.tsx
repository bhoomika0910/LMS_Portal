import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/common';
import { PageWrapper } from '../../components/layout/PageWrapper';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    console.info('Login attempt', values);
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
        <h2 className="text-3xl font-heading mb-8">Welcome back</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register('email')} error={formState.errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={formState.errors.password?.message} />
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    </PageWrapper>
  );
};
