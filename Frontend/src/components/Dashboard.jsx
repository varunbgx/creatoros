import React from 'react';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Eye,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  Check
} from 'lucide-react';
import CoreFlow from '../pages/CoreFlow';

export default function Dashboard({
  userProfile,
  priorities,
  onTogglePriority,
  brandDeals,
  projects,
  payments,
  setActiveTab,
  activeRole,
  teamActivities
}) {
  const [showOnboarding, setShowOnboarding] = React.useState(() => {
    return !localStorage.getItem('creatoros_onboarding_dismissed');
  });

  const [onboardingSteps, setOnboardingSteps] = React.useState(() => {
    const saved = localStorage.getItem('creatoros_onboarding_steps');
    return saved ? JSON.parse(saved) : [
      { id: 'connect', text: 'Connect your publishing accounts', completed: true, actionText: 'Manage Integrations', targetTab: 'connect-apps' },
      { id: 'audit', text: 'Review Samsung contract via AI Assistant', completed: false, actionText: 'Go to Assistant', targetTab: 'ai-assistant' },
      { id: 'insights', text: 'Apply underpriced price suggestions', completed: false, actionText: 'Inspect Insights', targetTab: 'ai-insights' }
    ];
  });

  const handleDismissOnboarding = () => {
    localStorage.setItem('creatoros_onboarding_dismissed', 'true');
    setShowOnboarding(false);
  };

  const handleToggleOnboardingStep = (id) => {
    const updated = onboardingSteps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    );
    setOnboardingSteps(updated);
    localStorage.setItem('creatoros_onboarding_steps', JSON.stringify(updated));
  };

  // Get dynamic greeting based on Indian Standard Time (from the current state metadata, it's 4:50 PM, so afternoon/evening)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Stats Calculations
  const activeDeals = brandDeals.filter(d => d.status === 'In Progress' || d.status === 'Review').length;
  
  const pendingPaymentsSum = payments
    .filter(p => p.status === 'Pending' || p.status === 'Overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const inProgressProjects = projects.filter(p => p.status !== 'Published' && p.status !== 'Ideas').length;
  
  const upcomingDeadlinesCount = brandDeals.filter(d => {
    const isDueSoon = d.deadline.toLowerCase().includes('tomorrow') || d.deadline.toLowerCase().includes('today');
    return isDueSoon && d.status !== 'Paid' && d.status !== 'Completed';
  }).length;

  const paidSum = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const isFinancialVisible = activeRole === 'Owner' || activeRole === 'Manager';

  const statCards = [
    {
      title: 'Active Brand Deals',
      value: isFinancialVisible ? activeDeals : '••••',
      description: isFinancialVisible ? 'vs last week' : 'Restricted Role View',
      delta: isFinancialVisible ? '+2 new' : 'Locked',
      deltaColor: isFinancialVisible ? 'text-emerald-600' : 'text-neutral-400',
      icon: Briefcase,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      action: isFinancialVisible ? () => setActiveTab('brand-deals') : null
    },
    {
      title: 'Pending Payments',
      value: isFinancialVisible ? formatCurrency(pendingPaymentsSum) : '₹ ••••',
      description: isFinancialVisible ? 'waiting clearance' : 'Restricted Role View',
      delta: isFinancialVisible ? '₹25,000 pending' : 'Locked',
      deltaColor: isFinancialVisible ? 'text-amber-600' : 'text-neutral-400',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      action: isFinancialVisible ? () => setActiveTab('payments') : null
    },
    {
      title: 'Projects In Production',
      value: inProgressProjects,
      description: 'due in 48h',
      delta: '3 urgent',
      deltaColor: 'text-rose-600',
      icon: CheckCircle2,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      action: () => setActiveTab('projects')
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {getGreeting()}, {userProfile.name}
          </h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">
            Here's what your AI Chief Operating Officer has organized for you today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 bg-white border border-neutral-100 px-3.5 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Google Drive & Youtube Connected</span>
        </div>
      </div>

      {/* Onboarding Setup Checklist */}
      {showOnboarding && (
        <div className="bg-purple-900 text-white rounded-3xl p-6 relative overflow-hidden border border-purple-800 shadow-lg shadow-purple-950/15">
          <div className="absolute top-[-50%] right-[-10%] w-[320px] h-[320px] bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-800/40">
                  Step-by-step Setup
                </span>
                <h2 className="text-base md:text-lg font-extrabold">Welcome to your new Creator OS Workspace!</h2>
                <p className="text-xs text-purple-200">
                  Complete these setup steps to let your AI COO fully optimize your content business.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismissOnboarding}
                className="text-purple-300 hover:text-white text-xs font-bold bg-purple-950/40 px-3 py-1.5 rounded-xl border border-purple-800/40 transition-colors cursor-pointer"
              >
                Dismiss Setup
              </button>
            </div>

            {/* Checklist items */}
            <div className="grid md:grid-cols-3 gap-3.5 mt-3">
              {onboardingSteps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 text-left ${
                    step.completed
                      ? 'bg-purple-950/40 border-purple-800/40 opacity-75'
                      : 'bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleOnboardingStep(step.id)}
                      className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-all mt-0.5 cursor-pointer ${
                        step.completed
                          ? 'bg-purple-500 border-purple-400 text-white'
                          : 'border-purple-300 hover:border-white'
                      }`}
                    >
                      {step.completed && <Check size={11} className="stroke-[3]" />}
                    </button>
                    <p className={`text-xs font-semibold leading-normal ${step.completed ? 'line-through text-purple-300' : 'text-white'}`}>
                      {step.text}
                    </p>
                  </div>
                  {!step.completed && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(step.targetTab);
                      }}
                      className="text-[10px] font-bold text-purple-200 hover:text-white inline-flex items-center gap-0.5 cursor-pointer text-left self-start"
                    >
                      <span>{step.actionText}</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={stat.action}
              className="bg-white p-6 rounded-card border border-neutral-100/60 shadow-card hover:shadow-md hover:border-neutral-200 transition-all duration-200 text-left flex flex-col justify-between h-[160px] group cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span className={`p-2 rounded-xl border ${stat.color}`}>
                  <Icon size={18} />
                </span>
                <ArrowUpRight size={14} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-1.5 mt-3">
                <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 leading-none">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-1 truncate">
                  <span className={`text-[10px] font-bold ${stat.deltaColor}`}>{stat.delta}</span>
                  <span className="text-[10px] text-neutral-400 font-medium truncate">{stat.description}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Priorities and Mini Dashboard Widgets */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Left Column: Today's Priorities Checklist */}
        <div className="md:col-span-6 creator-card">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-50">
            <div>
              <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Today's Content Ops Checklist</h2>
              <p className="text-[11px] text-neutral-400 font-medium">Toggle checkpoints to sync your content workspace</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
              {priorities.filter(p => !p.completed).length} Items Active
            </span>
          </div>

          <div className="mt-4 divide-y divide-neutral-50">
            {priorities.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3.5 py-3.5 first:pt-1 last:pb-1 cursor-pointer select-none group text-xs text-neutral-600 font-semibold"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onTogglePriority(item.id)}
                  className="w-4 h-4 rounded border-neutral-200 text-purple-600 focus:ring-purple-500 cursor-pointer priority-checkbox"
                />
                <span className={`transition-all duration-200 ${item.completed ? 'line-through text-neutral-400 font-medium' : 'text-neutral-700 font-semibold group-hover:text-neutral-900'}`}>
                  {item.text}
                </span>
                {item.tag && (
                  <span className={`ml-auto px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    item.tag === 'Urgent'
                      ? 'bg-rose-50 text-rose-600'
                      : item.tag === 'Payment'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: AI Activity Stream & Platform Insights */}
        <div className="md:col-span-6 creator-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-50">
              <div>
                <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} className="text-purple-600 animate-pulse" />
                  <span>Real-time Content & Payout Events</span>
                </h2>
                <p className="text-[11px] text-neutral-400 font-medium">AI auto-logging integrations</p>
              </div>
              <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Auto-Syncing</span>
            </div>

            <div className="mt-4 space-y-4 max-h-[220px] overflow-y-auto pr-1">
              {teamActivities?.map((act) => (
                <div key={act.id} className="flex gap-3 text-left">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${act.type === 'deal' ? 'bg-indigo-600' : 'bg-purple-600'}`}></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-800 font-medium leading-normal">
                      <strong className="text-neutral-950 font-bold">{act.user}</strong> 
                      <span className="text-[8px] font-extrabold text-purple-700 bg-purple-50 px-1 py-0.2 rounded-md tracking-wider mx-1.5 uppercase">{act.role}</span> 
                      <span>{act.action}</span> <strong className="text-neutral-950 font-semibold">{act.target}</strong>
                    </p>
                    <span className="text-[10px] text-neutral-400 font-semibold">{act.time}</span>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-xs text-neutral-800 font-medium">
                    <strong>AI Assistant</strong> parsed email from <strong>Samsung</strong> and extracted contract value of <strong className="text-neutral-950">₹35,000</strong>.
                  </p>
                  <span className="text-[10px] text-neutral-400 font-semibold">12 minutes ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-neutral-400" />
              <span className="text-[11px] text-neutral-500 font-semibold">Viewer Stats: <strong className="text-neutral-900">4.5% Engagement</strong></span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('ai-insights')}
              className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-0.5 cursor-pointer"
            >
              <span>View full insights</span>
              <span>→</span>
            </button>
          </div>

        </div>
        
      </div>
    </div>
  );
}
