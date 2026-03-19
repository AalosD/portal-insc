import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import AgendaTable from './components/AgendaTable';
import SubjectModal from './components/SubjectModal';
import { SUBJECTS } from './constants';
import { Subject, Group } from './types';
import { ChevronRight, Save, Printer, CheckCircle, AlertTriangle, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import html2pdf from 'html2pdf.js';
import confetti from 'canvas-confetti';
import { Trophy, Star, PartyPopper } from 'lucide-react';

const COLORS = [
  "#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#34495E",
  "#F1C40F", "#E67E22", "#E74C3C", "#8E44AD", "#95A5A6"
];

export default function App() {
  const [selectedGroups, setSelectedGroups] = useState<{ subject: Subject; group: Group; color: string }[]>([]);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const agendaRef = useRef<HTMLDivElement>(null);

  const checkOverlap = (newGroup: Group, currentGroups: { group: Group; subject: Subject }[]) => {
    for (const item of currentGroups) {
      for (const newSched of newGroup.schedule) {
        for (const currentSched of item.group.schedule) {
          if (newSched.day === currentSched.day) {
            const newStart = parseInt(newSched.start.split(':')[0]);
            const newEnd = parseInt(newSched.end.split(':')[0]);
            const currentStart = parseInt(currentSched.start.split(':')[0]);
            const currentEnd = parseInt(currentSched.end.split(':')[0]);

            if (newStart < currentEnd && newEnd > currentStart) {
              return item.subject.name;
            }
          }
        }
      }
    }
    return null;
  };

  const handleSelectGroup = (subject: Subject, group: Group) => {
    setSelectedGroups(prev => {
      const filtered = prev.filter(item => item.subject.id !== subject.id);
      const isSameGroup = prev.find(item => item.group.id === group.id);
      if (isSameGroup) return filtered;

      const overlappingSubject = checkOverlap(group, filtered);
      if (overlappingSubject) {
        setWarning(`¡Conflicto de horario! Esta clase se empalma con "${overlappingSubject}". Por favor selecciona otro grupo u otra materia.`);
        return prev;
      }

      const colorIndex = SUBJECTS.findIndex(s => s.id === subject.id) % COLORS.length;
      return [...filtered, { subject, group, color: COLORS[colorIndex] }];
    });
    setActiveSubject(null);
  };

  const handlePrint = () => {
    if (!agendaRef.current) return;
    
    const element = agendaRef.current;
    const opt = {
      margin: 10,
      filename: 'proyecto-inscripcion.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'landscape' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleFinalize = () => {
    if (selectedGroups.length === 0) {
      setWarning("Debes seleccionar al menos una materia antes de finalizar.");
      return;
    }

    setIsFinished(true);
    
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const totalCredits = selectedGroups.reduce((acc, item) => acc + item.subject.credits, 0);

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header />
      
      <main className="flex-1">
        <AnimatePresence>
          {warning && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-4"
            >
              <div className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl shadow-2xl flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-red-800 text-sm">Conflicto Detectado</h4>
                  <p className="text-red-600 text-xs mt-1 leading-relaxed">{warning}</p>
                </div>
                <button 
                  onClick={() => setWarning(null)}
                  className="p-1 hover:bg-red-100 rounded-md text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Overview />

        <section className="max-w-7xl mx-auto px-6 mt-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-primary p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">Proyecto de Inscripción</h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[rgba(255,255,255,0.1)] text-white px-4 py-2 rounded-lg text-sm font-bold border border-[rgba(255,255,255,0.2)]">
                  Créditos: {totalCredits} / 60
                </span>
                <nav className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white rounded-lg text-sm font-medium transition-colors">
                    <Save size={16} />
                    Guardar
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-[#f1c40fe6] text-primary rounded-lg text-sm font-bold transition-colors"
                  >
                    <Printer size={16} />
                    Imprimir
                  </button>
                  <button 
                    onClick={handleFinalize}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[rgba(6,78,59,0.2)]"
                  >
                    <CheckCircle size={16} />
                    Finalizar
                  </button>
                </nav>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Subject List */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Materias para ti</h3>
                  <span className="text-xs font-bold text-slate-400">{SUBJECTS.length} disponibles</span>
                </div>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {SUBJECTS.map((subject, index) => {
                    const isSelected = selectedGroups.some(item => item.subject.id === subject.id);
                    const color = COLORS[index % COLORS.length];
                    
                    return (
                      <motion.div 
                        whileHover={{ x: 4 }}
                        key={subject.id}
                        onClick={() => setActiveSubject(subject)}
                        className={cn(
                          "materia-item group",
                          isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                        )}
                      >
                        <div className="flex-1 p-3">
                          <h5 className="font-bold text-slate-700 text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {subject.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{subject.code}</span>
                            <span className="text-[10px] font-bold text-emerald-600">{subject.credits} CR</span>
                          </div>
                        </div>
                        <div 
                          className="w-10 flex items-center justify-center text-white"
                          style={{ backgroundColor: color }}
                        >
                          <ChevronRight size={20} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Agenda Section */}
              <div className="lg:col-span-9 space-y-4" ref={agendaRef}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Tu semana</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-secondary rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Seleccionado</span>
                    </div>
                  </div>
                </div>
                <AgendaTable selectedGroups={selectedGroups} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[rgba(31,51,84,0.8)] backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-yellow-400 to-emerald-400" />
              
              <div className="mb-6 inline-flex p-4 bg-emerald-100 rounded-full text-emerald-600 relative">
                <Trophy size={48} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full border-2 border-white"
                >
                  <Star size={16} fill="currentColor" />
                </motion.div>
              </div>

              <h2 className="text-3xl font-black text-slate-800 mb-2">¡Felicidades, Alonso!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Has completado tu proyecto de inscripción con éxito. Tu horario está listo para el periodo <span className="font-bold text-primary">Enero - Mayo 2026</span>.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Materias</p>
                  <p className="text-2xl font-black text-primary">{selectedGroups.length}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Créditos</p>
                  <p className="text-2xl font-black text-emerald-600">{totalCredits}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handlePrint}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-[rgba(31,51,84,0.3)]"
                >
                  <Download size={20} />
                  Descargar Horario PDF
                </button>
                <button 
                  onClick={() => setIsFinished(false)}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Volver a editar
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  >
                    <PartyPopper size={20} className="text-yellow-500 opacity-50" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeSubject && (
          <SubjectModal 
            subject={activeSubject}
            color={COLORS[SUBJECTS.findIndex(s => s.id === activeSubject.id) % COLORS.length]}
            onClose={() => setActiveSubject(null)}
            onSelectGroup={handleSelectGroup}
            selectedGroupId={selectedGroups.find(item => item.subject.id === activeSubject.id)?.group.id}
          />
        )}
      </AnimatePresence>

      <footer className="mt-12 py-8 bg-primary text-[rgba(255,255,255,0.6)] text-center border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
            <a href="#" className="hover:text-white transition-colors">Ayuda</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
