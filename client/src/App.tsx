import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';
import { LoadingScreen } from './components/common/LoadingScreen';

export const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen message="Booting LearnSphere" /> }>
        <AppRouter />
      </Suspense>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  );
};
