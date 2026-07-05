import React, { useState } from 'react';
import { LayoutDashboard, Briefcase, Layers, CreditCard, Calendar, TrendingUp, Users, Link, HelpCircle, Zap, Sparkles, LogOut, ChevronDown } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, userProfile, onLogout, onSwitchProfile, activeRole, setActiveRole }) {
  // Simplified navigation for core flow
  // Primary navigation items (Dashboard, Deals & Contracts, Production Board, Payments)
  const primaryItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard — overview & workflow stats' },
    { id: 'brand-deals', label: 'Deals & Contracts', icon: Briefcase, tooltip: 'Deals & Contracts — brand agreements' },
    { id: 'projects', label: 'Production Board', icon: Layers, tooltip: 'Production Board — Kanban view' },
    { id: 'payments', label: 'Payments', icon: CreditCard, tooltip: 'Payments — invoices & earnings' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Zap, tooltip: 'AI Assistant — Gmail & WhatsApp inbound' }
  ];

  // Secondary items that go under the collapsible "More" section
  const moreItems = [
    { id: 'calendar', label: 'Calendar', icon: Calendar, tooltip: 'Calendar — deadlines & schedule' },
    { id: 'ai-insights', label: 'AI Insights', icon: TrendingUp, tooltip: 'AI Insights — analytics & suggestions', roles: ['Owner', 'Manager'] },
    { id: 'team', label: 'Team Workspace', icon: Users, tooltip: 'Team Workspace — collaborators' },
    { id: 'connect-apps', label: 'Connect Apps', icon: Link, tooltip: 'Connect Apps — integrations' },
    { id: 'future-scope', label: 'Future Scope', icon: HelpCircle, tooltip: 'Future Scope — roadmap' }
  ];

  // State for showing the "More" submenu and profile dropdown
  const [showMore, setShowMore] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const profileOptions = [
    { key: 'youtube', name: 'YouTube', avatar: userProfile.avatar },
    { key: 'instagram', name: 'Instagram', avatar: userProfile.avatar },
    { key: 'podcast', name: 'Podcast', avatar: userProfile.avatar }
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-100 flex flex-col h-screen shrink-0 relative z-20">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-neutral-50 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm">
          C
        </div>
        <div>
          <span className="font-extrabold text-neutral-900 tracking-tight text-lg">Creator<span className="text-purple-600">OS</span></span>
          <span className="text-[10px] block font-semibold text-neutral-400 -mt-1">AI CHIEF OPERATING OFFICER</span>
        </div>
      </div>

      {/* Profile Switcher */}
      <div className="p-4 border-b border-neutral-50 relative">
        <button
          type="button"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 text-left transition-colors border border-transparent hover:border-neutral-100/50 cursor-pointer"
        >
          <img src={userProfile.avatar} alt={userProfile.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-100" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-neutral-800 text-xs truncate leading-tight">{userProfile.name}</h4>
            <p className="text-[10px] text-neutral-400 font-medium truncate">{userProfile.role}</p>
          </div>
          <ChevronDown size={14} className={`text-neutral-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
        </button>
        {showProfileDropdown && (
          <div className="absolute left-4 right-4 mt-2 bg-white border border-neutral-100 rounded-xl shadow-lg p-1.5 z-50 animate-fade-in">
            <div className="px-2 py-1 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Switch Profile</div>
            {profileOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => { onSwitchProfile(opt.key); setShowProfileDropdown(false); }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-left transition-colors text-xs text-neutral-600 font-medium cursor-pointer"
              >
                <img src={opt.avatar} alt={opt.name} className="w-6 h-6 rounded-full object-cover" />
                <span>{opt.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Role Switcher */}
      <div className="px-5 py-2.5 border-b border-neutral-50 flex items-center justify-between text-[10px] font-bold text-neutral-400">
        <span>WORKSPACE ROLE:</span>
        <select
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
          className="bg-transparent text-purple-600 hover:text-purple-700 outline-none cursor-pointer text-[11px] font-bold uppercase"
        >
          <option value="Owner">Owner</option>
          <option value="Manager">Manager</option>
          <option value="Editor">Editor</option>
          <option value="Designer">Designer</option>
          <option value="Writer">Writer</option>
        </select>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {primaryItems.filter(item => !item.roles || item.roles.includes(activeRole)).map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group/tooltip w-full">
              <button
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${isActive ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
              >
                <Icon size={16} className={isActive ? 'text-purple-600' : 'text-neutral-400'} />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
              <div className="absolute left-[102%] top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 rounded-lg bg-neutral-950 text-white text-[10px] font-bold shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[100] border border-neutral-800 tracking-normal">
                {item.tooltip}
              </div>
            </div>
          );
        })}

        {/* More submenu */}
        <div className="mt-4 border-t border-neutral-100 pt-2">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-neutral-500 hover:bg-neutral-50 rounded-xl text-sm"
          >
            <Zap size={16} className="text-neutral-400" />
            <span className="flex-1 text-left">More</span>
            <ChevronDown size={14} className={`text-neutral-400 transition-transform ${showMore ? 'rotate-180' : ''}`} />
          </button>
          {showMore && (
            <div className="ml-4 mt-2 space-y-1">
              {moreItems.filter(item => !item.roles || item.roles.includes(activeRole)).map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div key={item.id} className="relative group/tooltip w-full">
                    <button
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${isActive ? 'bg-purple-50 text-purple-700' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
                    >
                      <Icon size={14} className={isActive ? 'text-purple-600' : 'text-neutral-400'} />
                      <span className="flex-1 text-left" style={{ fontSize: '0.78rem', color: '#6b7280' }}>{item.label}</span>
                    </button>
                    <div className="absolute left-[102%] top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 rounded-lg bg-neutral-950 text-white text-[9px] font-bold shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[100] border border-neutral-800 tracking-normal">
                      {item.tooltip}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info & Logout */}
      <div className="p-4 border-t border-neutral-50 space-y-2">
        <div className="p-3 bg-neutral-50 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-neutral-800">
            <Sparkles size={13} className="text-purple-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">AI Active</span>
          </div>
          <p className="text-[11px] text-neutral-500 font-medium leading-normal">Ready to help you respond to brands & draft scripts.</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          <span>Exit Workspace</span>
        </button>
      </div>
    </aside>
  );
}
