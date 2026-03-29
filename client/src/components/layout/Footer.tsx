export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 pt-10 text-sm text-white/60">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
        <p>© {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
        <p className="md:text-right">Crafted for immersive learning experiences.</p>
      </div>
    </footer>
  );
};
