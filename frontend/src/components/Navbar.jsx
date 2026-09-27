import React from 'react';
import { NavLink } from 'react-router-dom';
import { Recycle, BarChart3, UploadCloud } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/upload', label: 'Recycle E-Waste', icon: UploadCloud },
    { to: '/impact', label: 'Impact Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:bg-emerald-700 transition-colors">
            <Recycle size={22} strokeWidth={1.75} />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-slate-900">EcoLoop</span>
            <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              AWS
            </span>
          </div>
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {Icon && <Icon size={16} strokeWidth={1.5} />}
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
