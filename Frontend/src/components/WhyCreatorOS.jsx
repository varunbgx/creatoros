import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  X,
  IndianRupee,
  Users,
  Layers,
  MessageCircle,
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹0',
    period: 'forever',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    highlight: false,
    description: 'For solo creators just starting their brand journey.',
    features: [
      'Up to 3 active brand deals',
      'Basic Content Pipeline (Kanban)',
      'Simple invoice generator',
      'WhatsApp inbound parser (3/month)',
      '1 team member seat',
      'Community support'
    ],
    cta: 'Start Free',
    ctaStyle: 'border border-neutral-200 text-neutral-800 hover:bg-neutral-50'
  },
  {
    name: 'Creator',
    price: '₹999',
    period: '/month',
    badge: 'Most Popular',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-100',
    highlight: true,
    description: 'For full-time creators scaling their creator business.',
    features: [
      'Unlimited brand deals',
      'Full Content Pipeline (Kanban)',
      'AI contract auditor (unlimited)',
      'WhatsApp inbound parser (unlimited)',
      'Up to 5 team member seats',
      'Role-based permissions',
      'Gmail + WhatsApp + Drive sync',
      'Priority support'
    ],
    cta: 'Start 14-day Free Trial',
    ctaStyle: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-100'
  },
  {
    name: 'Studio',
    price: '₹2,499',
    period: '/month',
    badge: 'Agency',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    highlight: false,
    description: 'For creator studios, agencies & talent managers.',
    features: [
      'Everything in Creator',
      'Up to 15 creator profiles',
      'Multi-channel analytics',
      'Custom brand deal templates',
      'Unlimited team seats',
      'Agency brand dashboard',
      'Dedicated account manager',
      'SLA support + onboarding call'
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border border-neutral-200 text-neutral-800 hover:bg-neutral-50'
  }
];

const comparisonRows = [
  {
    feature: 'Pricing Model',
    creatoros: 'Flat monthly ₹999',
    competitor: '% commission on earnings',
    icon: IndianRupee,
    creatorosWins: true
  },
  {
    feature: 'Commission on deals',
    creatoros: '0% — you keep everything',
    competitor: '5–15% per deal',
    icon: TrendingUp,
    creatorosWins: true
  },
  {
    feature: 'Currency',
    creatoros: '₹ INR native (no USD conversion)',
    competitor: 'USD-first, INR converted',
    icon: IndianRupee,
    creatorosWins: true
  },
  {
    feature: 'WhatsApp Inbound',
    creatoros: 'Built-in AI parser + deal creation',
    competitor: 'Email only, no WhatsApp',
    icon: MessageCircle,
    creatorosWins: true
  },
  {
    feature: 'Content Pipeline',
    creatoros: 'Full Kanban + deal link + team assign',
    competitor: 'Not available',
    icon: Layers,
    creatorosWins: true
  },
  {
    feature: 'Team Collaboration',
    creatoros: 'Role-based (5 roles), Slack/WA pings',
    competitor: 'Single user only',
    icon: Users,
    creatorosWins: true
  },
  {
    feature: 'Invoice Generation',
    creatoros: '₹ GST-ready, one-click send',
    competitor: 'Manual, USD-denominated',
    icon: BadgeCheck,
    creatorosWins: true
  },
  {
    feature: 'Data Ownership',
    creatoros: 'You own all data, export anytime',
    competitor: 'Proprietary data lock-in',
    icon: ShieldCheck,
    creatorosWins: true
  }
];

const pillars = [
  {
    icon: IndianRupee,
    title: '₹-Native by Design',
    description: 'Every metric, invoice, and payout is in Indian Rupees. No hidden conversion fees or USD rounding.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  },
  {
    icon: Zap,
    title: 'Zero Commission',
    description: 'Unlike platforms that take 5–15% of your brand deal earnings, CreatorOS charges a flat fee. Every rupee of every deal stays yours.',
    color: 'text-purple-600 bg-purple-50 border-purple-100'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-First',
    description: 'Most Indian brands pitch via WhatsApp. Our AI inbox parser turns a WA chat into a ready-to-sign brand deal in seconds.',
    color: 'text-blue-600 bg-blue-50 border-blue-100'
  },
  {
    icon: Users,
    title: 'Built for Creator Teams',
    description: 'From solo creators to 15-person studios — invite editors, managers, and designers with role-scoped access.',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
  },
  {
    icon: ShieldCheck,
    title: 'Your Data, Always',
    description: 'All integrations are read-only by default. Export everything in one click. Revoke any app connection instantly.',
    color: 'text-rose-600 bg-rose-50 border-rose-100'
  },
  {
    icon: Layers,
    title: 'Deals ↔ Production Linked',
    description: 'Sign a deal and a content pipeline card auto-generates. No manual copy-pasting across tools ever again.',
    color: 'text-amber-600 bg-amber-50 border-amber-100'
  }
];

export default function WhyCreatorOS({ setActiveTab }) {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <div className="space-y-16 animate-fade-in pb-8">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-indigo-950 to-neutral-950 p-10 text-white border border-neutral-800/40 shadow-2xl">
        <div className="absolute top-[-20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[10%] w-[300px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-left space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={11} className="text-purple-400 animate-spin" />
            <span>Built for the Indian Creator Economy</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            The only creator OS that puts<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">₹ rupees first</span>
          </h1>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-xl font-medium">
            Creator Pilot charges 5–15% of your earnings. CreatorOS charges a flat ₹999/month and keeps every feature your creator business actually needs — WhatsApp inbox, pipeline, team roles, and ₹-native invoicing — under one roof.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab('brand-deals')}
              className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Start your free trial</span>
              <ArrowRight size={13} />
            </button>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300">
              <Check size={12} className="text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300">
              <Check size={12} className="text-emerald-400" />
              <span>0% commission forever</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why CreatorOS pillars */}
      <div className="space-y-5">
        <div className="text-left">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Why Choose Us</p>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">6 reasons Indian creators choose CreatorOS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm hover:shadow-md transition-shadow space-y-3 text-left group"
              >
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${p.color}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-1">{p.title}</h3>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitor Comparison Table */}
      <div className="space-y-5">
        <div className="text-left">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Head-to-Head</p>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">CreatorOS vs. Creator Pilot</h2>
          <p className="text-xs text-neutral-500 font-medium mt-1">Honest, side-by-side comparison of what matters for Indian creators</p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-100 px-5 py-3.5">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">Feature</span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Sparkles size={10} className="text-white" />
              </span>
              <span className="text-[11px] font-extrabold text-purple-700 uppercase tracking-widest">CreatorOS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center">
                <Star size={10} className="text-neutral-500" />
              </span>
              <span className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-widest">Creator Pilot</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => {
            const Icon = row.icon;
            return (
              <div
                key={i}
                className={`grid grid-cols-3 items-start px-5 py-4 gap-4 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'} border-b border-neutral-50 last:border-0`}
              >
                <div className="flex items-start gap-2.5">
                  <Icon size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-neutral-700">{row.feature}</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 leading-relaxed">{row.creatoros}</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={9} className="text-rose-500" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 leading-relaxed">{row.competitor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-6">
        <div className="text-left">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Transparent Pricing</p>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">Flat pricing. No commissions. No surprises.</h2>
          <p className="text-xs text-neutral-500 font-medium mt-1">All plans denominated in ₹ INR. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-3xl border p-6 flex flex-col transition-all duration-200 text-left ${
                plan.highlight
                  ? 'bg-gradient-to-b from-purple-950 via-indigo-950 to-neutral-950 border-purple-800/30 text-white shadow-2xl shadow-purple-900/20'
                  : 'bg-white border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-[-1px] left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-b-xl shadow">
                    ✦ Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${plan.highlight ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`text-base font-extrabold tracking-tight ${plan.highlight ? 'text-white' : 'text-neutral-900'}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-1">
                    <span className={`text-3xl font-extrabold tracking-tighter ${plan.highlight ? 'text-white' : 'text-neutral-900'}`}>{plan.price}</span>
                    <span className={`text-xs font-semibold mb-1.5 ${plan.highlight ? 'text-purple-300' : 'text-neutral-400'}`}>{plan.period}</span>
                  </div>
                  <p className={`text-[11px] font-medium mt-1.5 leading-relaxed ${plan.highlight ? 'text-neutral-300' : 'text-neutral-500'}`}>{plan.description}</p>
                </div>

                <ul className="space-y-2 pt-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-emerald-50 border border-emerald-100'}`}>
                        <Check size={9} className={plan.highlight ? 'text-purple-300' : 'text-emerald-600'} />
                      </div>
                      <span className={`text-xs font-medium leading-relaxed ${plan.highlight ? 'text-neutral-200' : 'text-neutral-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          {[
            '₹ INR billing — no USD conversion',
            '0% commission on all brand deals',
            'Cancel anytime, no lock-in',
            'Data export in one click',
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500">
              <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
