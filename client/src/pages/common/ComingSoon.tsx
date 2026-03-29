type ComingSoonProps = {
  title: string;
  description?: string;
};

export const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-10 shadow-glow max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-client-secondary mb-2">In Progress</p>
        <h1 className="text-4xl font-heading mb-4">{title}</h1>
        <p className="text-white/70 text-lg">
          {description ?? 'This experience is being crafted with meticulous detail. Check back soon!'}
        </p>
      </div>
    </section>
  );
};
