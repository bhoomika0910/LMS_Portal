import { Link } from 'react-router-dom';
import { Button } from '../../components/common';

export const NotFoundPage = () => (
  <section className="min-h-screen bg-client-bg flex flex-col items-center justify-center gap-6 text-center text-white px-6">
    <p className="text-sm uppercase tracking-[0.8em] text-client-secondary">404</p>
    <h1 className="text-4xl font-heading">The void is empty.</h1>
    <p className="text-white/60 max-w-xl">
      The experience you are seeking is still in production. Return to the launchpad and keep exploring.
    </p>
    <Link to="/">
      <Button variant="primary">Back to Home</Button>
    </Link>
  </section>
);
