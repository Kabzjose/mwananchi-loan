import { Menu, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { brandName } from '../assets/brand';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Apply', to: '/apply' },
  { label: 'Coach', to: '/coach' },
  { label: 'About Prototype', to: '/about-prototype' },
  { label: 'System Architecture', to: '/architecture' },
];

export const AppLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-ink-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary">
          <Link to="/" className="focus-ring flex items-center gap-3 rounded-md">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-ink-950 text-white">
              <ShieldCheck size={21} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold leading-tight sm:text-base">{brandName}</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `focus-ring rounded-md px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-slate-100 text-ink-950' : 'text-slate-600 hover:bg-slate-50 hover:text-ink-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="focus-ring rounded-md p-2 lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-slate-100 text-ink-950' : 'text-slate-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="text-sm font-semibold text-slate-700">Ujima Sacco AI Loan Assistant Capstone Project</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="focus-ring rounded-sm text-sm font-medium text-slate-600 hover:text-ink-950">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
