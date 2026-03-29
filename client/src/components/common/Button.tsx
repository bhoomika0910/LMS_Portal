import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: ReactNode;
};

export const Button = ({
  children,
  className,
  variant = 'primary',
  loading = false,
  icon,
  ...rest
}: ButtonProps) => {
  const content = children as ReactNode;
  const baseStyles = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-heading tracking-wide transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  const variantStyles = {
    primary: 'bg-client-primary text-white hover:scale-[1.02] focus-visible:outline-client-primary',
    secondary: 'bg-client-secondary text-black hover:scale-[1.02] focus-visible:outline-client-secondary',
    outline: 'border border-white/40 text-white hover:border-white hover:scale-[1.02] focus-visible:outline-white',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={loading || rest.disabled}
      aria-busy={loading}
      {...rest}
    >
      {loading ? 'Please wait…' : (
        <span className="flex items-center gap-2">
          {icon}
          {content}
        </span>
      )}
    </motion.button>
  );
};
