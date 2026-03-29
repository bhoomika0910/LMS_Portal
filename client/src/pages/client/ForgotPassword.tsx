import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/common';
import { PageWrapper } from '../../components/layout/PageWrapper';

const schema = z.object({ email: z.string().email() });

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    console.info('Forgot password request', values);
  };

  return (
    <PageWrapper>
      <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
        <h2 className="text-3xl font-heading mb-8">Reset access</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register('email')} error={formState.errors.email?.message} />
          <Button type="submit" className="w-full">Send magic link</Button>
        </form>
      </div>
    </PageWrapper>
  );
};
