import React, { useState } from 'react';
import { Layers, Plus, Calendar, AlertTriangle, ArrowRight, User, MoreHorizontal, Check, FolderOpen, Sparkles } from 'lucide-react';

export default function KanbanBoard({
  projects,
  onAddProject,
  onMoveProject,
  onUpdateProjectProgress,
  onUpdateProjectMembers,
  onUpdateProjectDeadline,
  onJumpToDeal
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeColumn, setActiveColumn] = useState('Ideas');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDeadline, setNewDeadline] = useState('July 15');
  const [newMembers, setNewMembers] = useState('Amit (Editor)');
  
  // Columns definition
  const columns = ['Ideas', 'Script', 'Shoot', 'Editing', 'Review', 'Published'];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    onAddProject({
      title: newTitle,
      status: activeColumn,
      priority: newPriority,
      deadline: newDeadline,
      members: newMembers.split(',').map(m => m.trim()),
      progress: activeColumn === 'Published' ? 100 : activeColumn === 'Review' ? 90 : activeColumn === 'Editing' ? 60 : activeColumn === 'Shoot' ? 30 : activeColumn === 'Script' ? 10 : 0
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const handleProgressChange = (id, val) => {
    onUpdateProjectProgress(id, parseInt(val) || 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Production Pipeline</h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">
            Track deliverables from script brainstorms, edit reviews, to publishing uploads.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveColumn('Ideas');
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Deliverable Card</span>
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="flex flex-nowrap lg:grid lg:grid-cols-6 gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {columns.map((col) => {
          const colProjects = projects.filter(p => p.status === col);
          return (
            <div key={col} className="bg-neutral-50/50 border border-neutral-100/80 p-3.5 rounded-2xl min-w-[270px] lg:min-w-0 flex flex-col h-[calc(100vh-220px)] shrink-0 lg:shrink-1">
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <h4 className="font-extrabold text-neutral-800 text-[11px] uppercase tracking-wider">{col}</h4>
                </div>
                <span className="bg-white border border-neutral-100 text-neutral-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {colProjects.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => { setSelectedProject(project); setShowDetailModal(true); }}
                    className="bg-white p-4 rounded-xl border border-neutral-100/60 shadow-xs hover:shadow-md hover:border-neutral-200 transition-all duration-200 space-y-3.5 text-left group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${getPriorityStyle(project.priority)}`}>
                          {project.priority}
                        </span>
                        {project.dealId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onJumpToDeal) onJumpToDeal(project.dealId);
                            }}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 text-[9px] font-bold border border-purple-150 transition-colors cursor-pointer"
                            title="Jump to associated Brand Deal"
                          >
                            <Sparkles size={9} className="text-purple-600 shrink-0" />
                            <span>Linked Deal</span>
                          </button>
                        )}
                      </div>
                      
                      {/* Move Column Selector */}
                      <select
                        value={project.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          onMoveProject(project.id, e.target.value);
                        }}
                        className="text-[9px] font-bold text-neutral-400 bg-transparent hover:text-purple-600 focus:outline-none cursor-pointer text-right max-w-[80px]"
                      >
                        {columns.map(c => (
                          <option key={c} value={c} className="text-neutral-800 font-semibold">{c}</option>
                        ))}
                      </select>
                    </div>

                    <h3 className="font-bold text-neutral-900 text-xs leading-normal">{project.title}</h3>

                    {/* Progress details */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-bold text-neutral-400">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-neutral-50 text-[10px] text-neutral-400 font-semibold">
                      <div className="flex items-center gap-1">
                        <Calendar size={11} className="shrink-0" />
                        <span className="truncate max-w-[70px]">{project.deadline}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold bg-neutral-50 px-1.5 py-0.5 rounded-md">
                        <User size={10} className="shrink-0 text-neutral-400" />
                        <span className="truncate max-w-[60px]">{project.members && project.members[0]}</span>
                      </div>
                    </div>

                  </div>
                ))}

                {colProjects.length === 0 && (
                  <div className="border border-dashed border-neutral-200 rounded-xl py-10 px-4 text-center space-y-2 flex flex-col items-center justify-center bg-white/40">
                    <span className="text-neutral-300">
                      <FolderOpen size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-neutral-800">Column is Empty</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5 max-w-[120px] mx-auto">Create a production task to track here.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Add Button inside column */}
              <button
                type="button"
                onClick={() => {
                  setActiveColumn(col);
                  setShowAddModal(true);
                }}
                className="w-full mt-3 py-2 rounded-xl border border-dashed border-neutral-200 hover:border-purple-300 hover:bg-purple-50/20 text-neutral-400 hover:text-purple-600 transition-all duration-150 text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={12} />
                <span>Add Card</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* Add Project Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <form onSubmit={handleAddSubmit} className="bg-white rounded-3xl border border-neutral-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm">Add Deliverable in Column: {activeColumn}</h3>
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
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Project / Video Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZARA Summer Haul video edit"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Target Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. July 12, or Tomorrow"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Assigned Team Members (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Amit (Editor), Rohan (Manager)"
                  value={newMembers}
                  onChange={(e) => setNewMembers(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                />
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
                Add Card
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Card Workspace / Team Assignment Modal */}
      {showDetailModal && selectedProject && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <div className="bg-white rounded-3xl border border-neutral-100 w-full max-w-sm p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                <FolderOpen size={15} className="text-purple-600" />
                <span>Card Workspace</span>
              </h3>
              <button
                type="button"
                onClick={() => { setSelectedProject(null); setShowDetailModal(false); }}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-left">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Deliverable Title</span>
                <p className="text-xs font-bold text-neutral-900 mt-1 p-2 rounded-xl bg-neutral-50 border border-neutral-100">{selectedProject.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Workflow Phase</span>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-[10px] font-bold uppercase">
                    {selectedProject.status}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Priority</span>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold uppercase">
                    {selectedProject.priority}
                  </span>
                </div>
              </div>

              {/* Direct Assignment dropdown */}
              <div>
                <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Assign Collaborator</label>
                <select
                  value={selectedProject.members ? selectedProject.members[0] : 'Amit Kumar'}
                  onChange={(e) => {
                    const newAssignee = e.target.value;
                    const updatedProj = { ...selectedProject, members: [newAssignee] };
                    setSelectedProject(updatedProj);
                    if (onUpdateProjectMembers) onUpdateProjectMembers(selectedProject.id, [newAssignee]);
                  }}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                >
                  <option value="Amit Kumar">Amit Kumar (Editor)</option>
                  <option value="Rohan Joshi">Rohan Joshi (Manager)</option>
                  <option value="Sneha Patel">Sneha Patel (Thumbnail Designer)</option>
                  <option value="Nitin Roy">Nitin Roy (Script Writer)</option>
                  <option value="Raj Malhotra">Raj Malhotra (Editor)</option>
                  <option value="Tanya Sen">Tanya Sen (Stylist)</option>
                  <option value="Pooja Hegde">Pooja Hegde (Photographer)</option>
                  <option value="Vicky Kaushal">Vicky Kaushal (Audio Engineer)</option>
                  <option value="Vikram Seth">Vikram Seth (Researcher)</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Due Date</label>
                <input
                  type="text"
                  value={selectedProject.deadline}
                  onChange={(e) => {
                    const newDate = e.target.value;
                    const updatedProj = { ...selectedProject, deadline: newDate };
                    setSelectedProject(updatedProj);
                    if (onUpdateProjectDeadline) onUpdateProjectDeadline(selectedProject.id, newDate);
                  }}
                  placeholder="e.g. July 25, or Tomorrow"
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Ping buttons */}
              <div className="pt-1">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">Dispatch Workspace Pings</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`WhatsApp ping dispatched to ${selectedProject.members ? selectedProject.members[0] : 'Amit Kumar'}! 📲`)}
                    className="py-2 rounded-xl border border-emerald-100 hover:bg-emerald-50 text-emerald-700 text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 bg-white"
                  >
                    <span>Ping WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Slack message sent: "${selectedProject.title}" assigned to ${selectedProject.members ? selectedProject.members[0] : 'Amit'}! 💬`)}
                    className="py-2 rounded-xl border border-purple-100 hover:bg-purple-50 text-purple-700 text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 bg-white"
                  >
                    <span>Ping Slack</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-50">
              <button
                type="button"
                onClick={() => { setSelectedProject(null); setShowDetailModal(false); }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-md shadow-purple-100"
              >
                Close Workspace
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
