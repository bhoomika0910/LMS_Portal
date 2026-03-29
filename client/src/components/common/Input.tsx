import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...rest }, ref) => {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="text-white/70">{label}</span>}
      <input
        ref={ref}
        className={clsx(
          'rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-client-secondary transition-all',
          error && 'border-red-500 focus-visible:outline-red-500',
          className,
        )}
        {...rest}
      />
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </label>
  );
});

Input.displayName = 'Input';
