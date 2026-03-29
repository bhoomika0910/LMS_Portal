type LoadingScreenProps = {
  message?: string;
};

export const LoadingScreen = ({ message = 'Loading...' }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-client-bg text-white">
      <div className="h-16 w-16 border-4 border-client-secondary border-t-transparent rounded-full animate-spin" aria-hidden />
      <p className="text-lg font-heading tracking-wide">{message}</p>
    </div>
  );
};
