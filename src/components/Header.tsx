import React, { useState } from 'react';
import { ChevronDown, User, LogOut, Info, BookOpen, CheckCircle } from 'lucide-react';
import { USER_PROFILE } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-[60px] bg-primary shadow-lg flex items-center justify-between px-6">
      <nav className="hidden md:flex items-center h-full">
        <a href="#" className="main-nav-link">Proyecto</a>
        <a href="#" className="main-nav-link">Becas</a>
        <a href="#" className="main-nav-link">Encuesta</a>
        <a href="#" className="main-nav-link">Facturación</a>
        <a href="#" className="main-nav-link">Boletas</a>
        <a href="#" className="main-nav-link">Tutorial</a>
      </nav>

      <div className="relative">
        <button 
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-3 text-white hover:bg-[rgba(255,255,255,0.1)] px-3 py-2 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <span className="font-medium">{USER_PROFILE.name}</span>
          <ChevronDown size={18} className={isUserMenuOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-700"
            >
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Perfil Académico</p>
                <p className="font-bold text-primary">{USER_PROFILE.campus}</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Avance</span>
                  <span className="font-bold text-emerald-600">{USER_PROFILE.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${USER_PROFILE.progress}%` }} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between"><span className="text-slate-500">Ingreso:</span> <span>{USER_PROFILE.entryType}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Promedio:</span> <span>{USER_PROFILE.previousAverage}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Créditos:</span> <span>{USER_PROFILE.totalCredits}</span></p>
                </div>
              </div>
              <button className="w-full p-4 flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100 font-medium">
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
