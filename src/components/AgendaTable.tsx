import React from 'react';
import { Group, Subject } from '../types';
import { cn } from '../lib/utils';

interface AgendaTableProps {
  selectedGroups: { subject: Subject; group: Group; color: string }[];
}

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7:00 to 21:00

export default function AgendaTable({ selectedGroups }: AgendaTableProps) {
  const getCellContent = (day: string, hour: number) => {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    
    // Find if any group occupies this slot
    // A slot is occupied if the group has a schedule for this day
    // and the hour is between start and end
    const groupInSlot = selectedGroups.find(item => {
      return item.group.schedule.some(s => {
        if (s.day !== day) return false;
        const startHour = parseInt(s.start.split(':')[0]);
        const endHour = parseInt(s.end.split(':')[0]);
        return hour >= startHour && hour < endHour;
      });
    });

    if (groupInSlot) {
      // Check if this is the first hour of the block to show the title
      const isFirstHour = groupInSlot.group.schedule.some(s => {
        if (s.day !== day) return false;
        const startHour = parseInt(s.start.split(':')[0]);
        return hour === startHour;
      });

      return (
        <div 
          className={cn(
            "w-full h-full flex flex-col items-center justify-center p-1 text-[10px] leading-tight text-white font-bold transition-all",
            isFirstHour ? "rounded-t-md" : "",
            // If it's the last hour, round bottom
            groupInSlot.group.schedule.some(s => s.day === day && parseInt(s.end.split(':')[0]) === hour + 1) ? "rounded-b-md" : ""
          )}
          style={{ backgroundColor: groupInSlot.color }}
        >
          {isFirstHour && (
            <>
              <span className="truncate w-full text-center">{groupInSlot.subject.name}</span>
              <span className="text-[rgba(255,255,255,0.8)]">G: {groupInSlot.group.name}</span>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-200 w-24">Horario</th>
            {DAYS.map(day => (
              <th key={day} className="p-3 text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map(hour => (
            <tr key={hour} className="border-b border-slate-100 hover:bg-[rgba(248,250,252,0.5)] transition-colors h-12">
              <td className="p-2 text-[11px] font-medium text-slate-400 text-center border-r border-slate-200 bg-[rgba(248,250,252,0.3)]">
                {hour.toString().padStart(2, '0')}:00 - {(hour + 1).toString().padStart(2, '0')}:00
              </td>
              {DAYS.map(day => (
                <td key={day} className="p-0 border-r border-slate-100 relative group">
                  {getCellContent(day, hour)}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(31,51,84,0.1)] pointer-events-none" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
