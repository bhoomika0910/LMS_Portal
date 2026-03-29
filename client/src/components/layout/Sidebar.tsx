import { NavLink } from 'react-router-dom';

type SidebarProps = {
  links: { label: string; to: string; icon?: string }[];
  accentColor?: string;
};

export const Sidebar = ({ links, accentColor = '#6C63FF' }: SidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen border-r border-white/10 bg-white/5/50 backdrop-blur-xl">
      <div className="px-6 py-8 text-2xl font-heading">Portal</div>
      <nav className="flex-1 space-y-1 px-3 pb-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'text-white' : 'text-white/60 hover:text-white'} ` +
              (isActive ? 'bg-black/30 shadow-glow' : 'hover:bg-white/5')
            }
            style={({ isActive }) => (isActive ? { borderLeft: `3px solid ${accentColor}` } : undefined)}
          >
            <span className="text-xs font-mono uppercase tracking-[0.25em]">{link.icon ?? '•'}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
