import React, { useState } from 'react';
import { Users, Send, Edit, Shield, Activity, RefreshCw } from 'lucide-react';

export default function Team({
  teamMembers,
  onUpdateTeamMember,
  activeRole,
  setActiveRole
}) {
  const [activeMemberId, setActiveMemberId] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProgress, setNewTaskProgress] = useState(0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500 ring-emerald-100';
      case 'Busy': return 'bg-amber-500 ring-amber-100';
      default: return 'bg-slate-400 ring-slate-100';
    }
  };

  const handleSendMessage = (e, memberName) => {
    e.preventDefault();
    if (!chatMessage) return;

    alert(`Message sent to ${memberName} via CreatorOS Slack integration: "${chatMessage}"`);
    setChatMessage('');
  };

  const openAssignModal = (member) => {
    setSelectedMember(member);
    setNewTaskTitle(member.currentTask);
    setNewTaskProgress(member.progress);
    setShowAssignModal(true);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    onUpdateTeamMember(selectedMember.id, {
      currentTask: newTaskTitle,
      progress: parseInt(newTaskProgress) || 0
    });
    setShowAssignModal(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Collaborator Hub</h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">Delegate deliverables, track video editor progress, and ping editors.</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-bold bg-white border border-neutral-100 px-3.5 py-2 rounded-xl">
          <Activity size={14} className="text-emerald-500 animate-pulse" />
          <span>Slack & WhatsApp Sync Active</span>
        </div>
      </div>

      {/* Viewport Role Switcher for Hackathon Testing */}
      <div className="bg-purple-50 border border-purple-100/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h3 className="text-xs font-extrabold text-purple-800 uppercase tracking-wider">Simulate Workspace Roles</h3>
          <p className="text-[11px] text-neutral-500 font-semibold mt-0.5">Toggle active workspace permissions to simulate role-based dashboard view masking.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['Owner', 'Manager', 'Editor', 'Designer', 'Writer'].map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setActiveRole(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeRole === r
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-neutral-100 shadow-sm shadow-neutral-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative"
          >
            {/* Status dot */}
            <span className="absolute top-4 right-4 flex h-3.5 w-3.5 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor(member.status)}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor(member.status)}`} />
            </span>

            {/* Profile Info */}
            <div className="space-y-3.5 text-left">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.role}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white ring-2 ring-neutral-50 shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm leading-snug">{member.name}</h4>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">{member.role}</span>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-2 p-3 bg-neutral-50/50 rounded-xl border border-neutral-100/40">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Current Deliverable</span>
                <p className="text-xs text-neutral-800 font-bold truncate">{member.currentTask}</p>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-bold text-neutral-400">
                    <span>Task Progress</span>
                    <span>{member.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-neutral-50">
              <button
                type="button"
                onClick={() => openAssignModal(member)}
                className="py-1.5 rounded-lg border border-neutral-100 text-neutral-600 hover:text-neutral-900 text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer bg-white"
              >
                <Edit size={11} />
                <span>Assign Task</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMemberId(activeMemberId === member.id ? null : member.id)}
                className="py-1.5 rounded-lg border border-purple-200 hover:bg-purple-50 text-purple-700 text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer bg-white"
              >
                <Send size={11} />
                <span>Ping Slack</span>
              </button>
            </div>

            {/* In-Card Quick Chat drawer simulation */}
            {activeMemberId === member.id && (
              <div className="mt-3 pt-3 border-t border-neutral-100 animate-fade-in text-left">
                <span className="text-[9px] font-bold text-purple-700 uppercase tracking-wider block mb-1">Direct Chat Sync</span>
                <form onSubmit={(e) => handleSendMessage(e, member.name)} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder={`Type message to ${member.name.split(' ')[0]}...`}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 p-2 border border-neutral-200 rounded-lg text-xs font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shrink-0 cursor-pointer"
                  >
                    <Send size={11} />
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Assign Task Modal */}
      {showAssignModal && selectedMember && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <form onSubmit={handleAssignSubmit} className="bg-white rounded-3xl border border-neutral-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm">Assign Task to {selectedMember.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Task Description</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Current Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newTaskProgress}
                  onChange={(e) => setNewTaskProgress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-50">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              >
                Update Assignment
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
