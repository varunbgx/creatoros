import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function CalendarView({
  events,
  onAddEvent
}) {
  const [currentMonth, setCurrentMonth] = useState('July 2026');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Event Form fields
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Shoot'); // 'Shoot', 'Editing', 'Upload', 'Brand Meeting', 'Invoice Due'

  // Helper arrays for dates
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // July 2026 has 31 days and starts on Wednesday (index 3 of week)
  const daysInJuly = 31;
  const startOffset = 3; // Wednesday

  // Construct grid cells (empty cells + days)
  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ day: null, key: `empty-${i}` });
  }
  for (let d = 1; d <= daysInJuly; d++) {
    cells.push({ day: d, key: `day-${d}` });
  }
  // Fill remaining cells to complete the 42 grid cells (6 rows)
  while (cells.length < 42) {
    cells.push({ day: null, key: `empty-end-${cells.length}` });
  }

  // Group events by day
  const getEventsForDay = (dayNum) => {
    if (!dayNum) return [];
    return events.filter(e => e.day === dayNum);
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Shoot':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Editing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upload':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Brand Meeting':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Invoice Due':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  const handleCellClick = (day) => {
    if (!day) return;
    setSelectedDate(day);
    setShowAddModal(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle || !selectedDate) return;

    onAddEvent({
      day: selectedDate,
      title: eventTitle,
      type: eventType
    });

    setEventTitle('');
    setShowAddModal(false);
    setSelectedDate(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Calendar Schedule</h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">Plan video shoots, check editing dates, content uploads, and invoice dues.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-neutral-100 rounded-xl p-1 shadow-xs shrink-0">
            <button type="button" className="p-1.5 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"><ChevronLeft size={16} /></button>
            <span className="px-3 font-extrabold text-neutral-800 text-xs tracking-wider">{currentMonth}</span>
            <button type="button" className="p-1.5 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"><ChevronRight size={16} /></button>
          </div>
          
          <button
            type="button"
            onClick={() => handleCellClick(new Date().getDate() || 4)}
            className="px-4 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="bg-white border border-neutral-100 rounded-3xl p-4 shadow-sm shadow-neutral-100 space-y-2">
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest border-b border-neutral-50 pb-2">
          {weekdays.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-2">
          {cells.map((cell) => {
            const dayEvents = getEventsForDay(cell.day);
            const isToday = cell.day === 4; // Mocking today is July 4, 2026 based on metadata
            
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => handleCellClick(cell.day)}
                disabled={!cell.day}
                className={`min-h-[100px] border rounded-2xl p-2.5 text-left transition-all flex flex-col justify-between focus:outline-none ${
                  cell.day 
                    ? isToday 
                      ? 'border-purple-600 bg-purple-50/20 ring-2 ring-purple-100/50 hover:bg-purple-50/30'
                      : 'border-neutral-100 hover:border-purple-200 bg-white hover:shadow-xs'
                    : 'border-transparent bg-transparent pointer-events-none'
                }`}
              >
                {cell.day ? (
                  <>
                    {/* Day number */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isToday ? 'text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md' : 'text-neutral-600'}`}>
                        {cell.day}
                      </span>
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" title="Today"></span>
                      )}
                    </div>

                    {/* Events list */}
                    <div className="flex-1 mt-1.5 space-y-1 overflow-y-auto max-h-[70px] w-full">
                      {dayEvents.map((evt, idx) => (
                        <div
                          key={idx}
                          className={`px-1.5 py-0.5 rounded-md border text-[9px] font-bold leading-normal truncate ${getEventTypeColor(evt.type)}`}
                          title={`${evt.type}: ${evt.title}`}
                        >
                          {evt.title}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <form onSubmit={handleEventSubmit} className="bg-white rounded-3xl border border-neutral-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm">Create Event for July {selectedDate}, 2026</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Event Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZARA Video Upload"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                >
                  <option value="Shoot">Shoot</option>
                  <option value="Editing">Editing</option>
                  <option value="Upload">Upload</option>
                  <option value="Brand Meeting">Brand Meeting</option>
                  <option value="Invoice Due">Invoice Due</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-50">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-100 cursor-pointer"
              >
                Add Schedule
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
