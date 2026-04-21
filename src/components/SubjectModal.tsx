import React from 'react';
import { Group, Subject } from '../types';
import { X, User, MapPin, Clock, Users, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SubjectModalProps {
  subject: Subject;
  onClose: () => void;
  onSelectGroup: (subject: Subject, group: Group) => void;
  selectedGroupId?: string;
  color: string;
}

export default function SubjectModal({ subject, onClose, onSelectGroup, selectedGroupId, color }: SubjectModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 flex justify-between items-center text-white" style={{ backgroundColor: color }}>
          <div>
            <h2 className="text-2xl font-bold">{subject.name}</h2>
            <p className="text-[rgba(255,255,255,0.8)] text-sm font-medium">{subject.code}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[rgba(255,255,255,0.2)] rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Créditos</p>
              <p className="text-lg font-bold text-slate-700">{subject.credits}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Grupos</p>
              <p className="text-lg font-bold text-slate-700">{subject.groups.length}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Clave</p>
              <p className="text-lg font-bold text-slate-700">{subject.code}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Modalidad</p>
              <p className="text-lg font-bold text-slate-700">Presencial</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users size={20} className="text-primary" />
            Selecciona un grupo
          </h3>

          <div className="space-y-4">
            {subject.groups.map((group) => {
              const isSelected = selectedGroupId === group.id;
              const isSaturated = group.enrolled >= group.capacity;
              
              return (
                <div 
                  key={group.id}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isSelected 
                      ? 'border-primary bg-[rgba(31,51,84,0.05)] shadow-md' 
                      : isSaturated
                        ? 'border-slate-100 bg-slate-50 opacity-75'
                        : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Grupo & Docente</p>
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-primary">
                          {group.name}
                        </span>
                        <p className="font-bold text-slate-700">{group.teacher}</p>
                      </div>
                      {isSaturated && !isSelected && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black uppercase rounded">
                          Grupo saturado
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Horario</p>
                      <div className="space-y-1">
                        {group.schedule.map((s, i) => (
                          <p key={i} className="text-sm text-slate-600 flex items-center gap-1">
                            <Clock size={14} />
                            <span className="font-bold">{s.day}:</span> {s.start} - {s.end}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Ubicación & Cupo</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <MapPin size={14} /> {group.location}
                      </p>
                      <p className={cn(
                        "text-xs mt-1 font-bold",
                        isSaturated ? "text-red-500" : "text-slate-400"
                      )}>
                        {group.enrolled}/{group.capacity} inscritos
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectGroup(subject, group)}
                    disabled={isSaturated && !isSelected}
                    className={cn(
                      "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                      isSelected
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
                        : isSaturated
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-slate-100 text-slate-600 hover:bg-primary hover:text-white"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <X size={18} />
                        Descartar grupo
                      </>
                    ) : isSaturated ? (
                      <>
                        <X size={18} />
                        Sin cupo
                      </>
                    ) : (
                      <>
                        <BookOpen size={18} />
                        Seleccionar
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
