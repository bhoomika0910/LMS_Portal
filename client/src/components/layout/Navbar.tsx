import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <header className="sticky top-0 inset-x-0 backdrop-blur-xl bg-black/30 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <Link to="/" className="text-2xl font-heading tracking-tight">
          LearnSphere
        </Link>
        <div className="flex items-center gap-4 text-sm uppercase tracking-widest">
          <Link to="/courses" className="hover:text-client-secondary transition-colors">
            Catalog
          </Link>
          <Link to="/dashboard/student" className="hover:text-client-secondary transition-colors">
            Dashboard
          </Link>
          <span className="px-3 py-1 border border-white/15 rounded-full text-xs">
            {theme.toUpperCase()}
          </span>
        </div>
      </nav>
    </header>
  );
};
