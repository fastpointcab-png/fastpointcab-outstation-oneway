
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex px-4 py-3 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 container mx-auto">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-brand-red transition-colors">
            <Home size={12} className="mr-2" />
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = value.replace(/-/g, ' ');

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight size={12} className="mx-1 text-slate-300 dark:text-slate-700" />
                {last ? (
                  <span className="text-brand-red font-black">{name}</span>
                ) : (
                  <Link to={to} className="hover:text-brand-red transition-colors">
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
