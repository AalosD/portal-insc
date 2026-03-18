import React from 'react';
import { ENROLLMENT_INFO } from '../constants';
import { Calendar, CreditCard, Activity, FileText } from 'lucide-react';

export default function Overview() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-8 flex flex-wrap gap-4">
      <div className="info-card !bg-primary !border-0 !text-white">
        <h3 className="text-lg font-bold">Inscripciones</h3>
        <p className="text-secondary font-medium">{ENROLLMENT_INFO.period}</p>
      </div>
      
      <div className="info-card">
        <div className="flex items-center gap-2 text-slate-400 mb-1">
          <Calendar size={16} />
          <h4 className="text-xs font-bold uppercase tracking-wider">Fecha</h4>
        </div>
        <h3 className="text-xl font-bold text-primary">{ENROLLMENT_INFO.date}</h3>
      </div>

      <div className="info-card">
        <div className="flex items-center gap-2 text-slate-400 mb-1">
          <CreditCard size={16} />
          <h4 className="text-xs font-bold uppercase tracking-wider">Créditos</h4>
        </div>
        <h3 className="text-xl font-bold text-primary">{ENROLLMENT_INFO.allowedCredits}</h3>
      </div>

      <div className="info-card">
        <div className="flex items-center gap-2 text-slate-400 mb-1">
          <Activity size={16} />
          <h4 className="text-xs font-bold uppercase tracking-wider">Estatus</h4>
        </div>
        <h3 className="text-xl font-bold text-emerald-600">{ENROLLMENT_INFO.status}</h3>
      </div>

      <div className="info-card">
        <div className="flex items-center gap-2 text-slate-400 mb-1">
          <FileText size={16} />
          <h4 className="text-xs font-bold uppercase tracking-wider">Folio</h4>
        </div>
        <h3 className="text-xl font-bold text-primary">{ENROLLMENT_INFO.folio}</h3>
      </div>
    </section>
  );
}
