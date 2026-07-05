import React from 'react';
import { Layers, Shield, Cpu, Network, ArrowRight, Zap, Target } from 'lucide-react';

export default function FutureScope() {
  const roadmapItems = [
    {
      title: 'OAuth 2.0 Integration Framework',
      description: 'Replace simulated sandboxes with official Google (YouTube Studio, Gmail, Drive) & Meta OAuth integrations, enabling genuine read/write actions from the dashboard.',
      icon: Shield,
      badge: 'Security',
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      title: 'AI Workflow Automations',
      description: 'Implement AI triggers: e.g. when an editor marks a task "Review" in Slack, the video is instantly auto-uploaded to YouTube Studio as a private draft and sent to Gmail.',
      icon: Zap,
      badge: 'Automation',
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    },
    {
      title: 'Role-Based Team Workspaces',
      description: 'Provide secure invitations for scriptwriters, managers, and designers. Restrict payments/earnings data to managers while allowing editors to upload files directly.',
      icon: Layers,
      badge: 'Team Access',
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      title: 'Agency & Network Portals',
      description: 'Enable media agencies and talent managers to connect 10+ creator channels under a unified control dashboard, facilitating aggregated brand reporting.',
      icon: Network,
      badge: 'Scale',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Direct Brands Sponsorship Marketplace',
      description: 'Let brand managers search creator media kits, view live analytics integration data, issue electronic contracts directly, and clear payouts through escrow accounts.',
      icon: Target,
      badge: 'Monetization',
      color: 'text-pink-600 bg-pink-50 border-pink-100'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Future Scope & Architecture</h1>
        <p className="text-neutral-500 font-medium text-xs mt-1">
          Explore how CreatorOS scales from a local sandbox MVP into a production-grade enterprise dashboard.
        </p>
      </div>

      {/* Visual System Architecture Block */}
      <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm shadow-neutral-100 space-y-6">
        <div>
          <h3 className="font-extrabold text-neutral-950 text-xs uppercase tracking-wider">WorkFlow Automation Flowchart</h3>
          <p className="text-[10px] text-neutral-400 font-medium mt-0.5">How CreatorOS orchestrates content operations in production</p>
        </div>

        {/* High-fidelity CSS Flowchart */}
        <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-4 py-4 text-center">
          
          {/* Step 1: Input Channels */}
          <div className="md:col-span-2 bg-neutral-50 border border-neutral-150 p-4 rounded-2xl space-y-2">
            <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest block">Input Channels</span>
            <div className="space-y-1.5">
              <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200/50 text-[11px] font-bold text-neutral-700">Gmail Proposals</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200/50 text-[11px] font-bold text-neutral-700">WhatsApp Invoices</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200/50 text-[11px] font-bold text-neutral-700">Google Drive Uploads</div>
            </div>
          </div>

          {/* Connect Arrow 1 */}
          <div className="flex justify-center text-purple-400 font-bold text-lg md:col-span-1">
            <ArrowRight className="rotate-90 md:rotate-0" />
          </div>

          {/* Step 2: AI Core Engine */}
          <div className="md:col-span-2 bg-purple-50/50 border border-purple-100 p-5 rounded-2xl space-y-2 relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-purple-600 text-[8px] font-black uppercase text-white tracking-widest">
              Core Engine
            </div>
            <span className="text-[9px] font-extrabold text-purple-700 uppercase tracking-widest block mt-1">CreatorOS AI Assistant</span>
            <div className="space-y-1.5">
              <div className="bg-white px-3 py-2 rounded-xl border border-purple-200 text-[11px] font-extrabold text-purple-950">Contract Audit Agent</div>
              <div className="bg-white px-3 py-2 rounded-xl border border-purple-200 text-[11px] font-extrabold text-purple-950">Payment Reconciliation</div>
              <div className="bg-white px-3 py-2 rounded-xl border border-purple-200 text-[11px] font-extrabold text-purple-950">Content Scheduler</div>
            </div>
          </div>

          {/* Connect Arrow 2 */}
          <div className="flex justify-center text-purple-400 font-bold text-lg md:col-span-1">
            <ArrowRight className="rotate-90 md:rotate-0" />
          </div>

          {/* Step 3: API Destinations */}
          <div className="md:col-span-2 bg-neutral-50 border border-neutral-150 p-4 rounded-2xl space-y-2">
            <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest block">API Endpoints</span>
            <div className="space-y-1.5">
              <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200/50 text-[11px] font-bold text-neutral-700">YouTube Studio Publish</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200/50 text-[11px] font-bold text-neutral-700">Stripe Escrow Clearance</div>
              <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200/50 text-[11px] font-bold text-neutral-700">WhatsApp Notification</div>
            </div>
          </div>

        </div>
      </div>

      {/* Roadmap list cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Features Roadmap</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {roadmapItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs flex gap-4 text-left"
              >
                <span className={`p-3 rounded-2xl border ${item.color} shrink-0 h-12 w-12 flex items-center justify-center`}>
                  <Icon size={20} />
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[8px] font-extrabold uppercase tracking-widest">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-900 text-xs leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
