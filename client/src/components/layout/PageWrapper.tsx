import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const fadeConfig = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

type PageWrapperProps = {
  children: ReactNode;
  variant?: 'client' | 'admin' | 'instructor';
};

export const PageWrapper = ({ children, variant = 'client' }: PageWrapperProps) => {
  const backgroundClass =
    variant === 'admin'
      ? 'bg-admin-bg'
      : variant === 'instructor'
        ? 'bg-instructor-bg'
        : 'bg-client-bg';

  return (
    <motion.main
      className={`${backgroundClass} min-h-screen text-white px-4 sm:px-8 py-10`}
      {...fadeConfig}
    >
      {children}
    </motion.main>
  );
};
