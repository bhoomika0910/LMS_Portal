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

type FormValues = z.infer<typeof schema>;

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    console.info('Reset password', { token, values });
  };

  return (
    <PageWrapper>
      <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
        <h2 className="text-3xl font-heading mb-8">Set a new password</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Password" type="password" {...register('password')} error={formState.errors.password?.message} />
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={formState.errors.confirmPassword?.message}
          />
          <Button type="submit" className="w-full">Reset password</Button>
        </form>
      </div>
    </PageWrapper>
  );
};
