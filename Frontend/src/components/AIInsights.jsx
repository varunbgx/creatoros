import React, { useState } from 'react';
import { TrendingUp, Award, Users, DollarSign, Sparkles, Shield, ArrowUpRight, Lightbulb } from 'lucide-react';

export default function AIInsights({
  userProfile,
  brandDeals,
  payments
}) {
  const [activeInsightIndex, setActiveInsightIndex] = useState(null);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Top Performing Content Mock
  const topContent = [
    { title: 'Samsung Galaxy S26 Unboxing', views: '280K views', engagement: '12.4% engagement', source: 'YouTube' },
    { title: 'Zara Summer Outfit Haul', views: '540K views', engagement: '8.7% engagement', source: 'Instagram' },
    { title: '10 Productivity Tips for Solopreneurs', views: '45K views', engagement: '14.2% engagement', source: 'LinkedIn' }
  ];

  // Revenue graph mock
  const revenueGraph = [
    { month: 'Feb', amount: 45000 },
    { month: 'Mar', amount: 60000 },
    { month: 'Apr', amount: 55000 },
    { month: 'May', amount: 80000 },
    { month: 'Jun', amount: 95000 },
    { month: 'Jul', amount: brandDeals.filter(d => d.status === 'Paid').reduce((s, d) => s + d.amount, 0) + 20000 }
  ];

  // Max value for scaling
  const maxRevenue = Math.max(...revenueGraph.map(r => r.amount));

  // AI Insights Suggestions
  const suggestions = [
    {
      id: 1,
      title: 'Underpriced Brand Collaboration Deal',
      text: 'Based on your recent engagement rate (9.4%) and YouTube subscriber tier, your standard sponsorship rate should be at least ₹45,000. Your current Samsung S26 deal is at ₹35,000.',
      solution: 'Suggesting 25% price correction for future campaigns with Samsung.',
      actionText: 'Apply to Media Kit'
    },
    {
      id: 2,
      title: 'Shorts Content High Retainer Potential',
      text: 'Your Instagram Reels are outperforming long-form videos by 4.2x in CTR. Brands are looking for high-frequency short content retainers.',
      solution: 'AI recommends packing a 3-pack Reel bundle offer at ₹80,000.',
      actionText: 'Draft Bundle Proposal'
    },
    {
      id: 3,
      title: 'Optimal Sponsorship Reading Timings',
      text: 'Audience watch time dips by 18% when brand integrations occur at the start of podcasts. Integrations placed at the mid-roll (12m-15m mark) retain 92% of listeners.',
      solution: 'Shift brand integrations to mid-roll in next 3 podcast transcripts.',
      actionText: 'Adjust Script Template'
    }
  ];

  const handleApplySuggestion = (s) => {
    alert(`AI Insight recommendation applied: "${s.title}"! Standard pricing and workflow guidelines updated.`);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
          <Sparkles className="text-purple-600 animate-pulse" size={24} />
          <span>AI Business Growth Insights</span>
        </h1>
        <p className="text-neutral-500 font-medium text-xs mt-1">Revenue growth trajectory, engagement graphs, and actionable AI suggestions.</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-100/60 shadow-sm flex flex-col justify-between h-[115px]">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Audience Reach</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">1.4M</h3>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+12.4% vs last month</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-100/60 shadow-sm flex flex-col justify-between h-[115px]">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Avg. Engagement</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">9.4%</h3>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+1.2% above benchmark</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-100/60 shadow-sm flex flex-col justify-between h-[115px]">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Est. Monthly Revenue</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">
              {formatCurrency(payments.reduce((s, p) => s + (p.status === 'Paid' ? p.amount : 0), 0))}
            </h3>
          </div>
          <span className="text-[10px] text-neutral-400 font-bold">
            Based on paid invoices
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-100/60 shadow-sm flex flex-col justify-between h-[115px]">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Sponsorship Conversion</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">18.2%</h3>
          </div>
          <span className="text-[10px] text-indigo-600 font-bold">
            4 closed / 22 leads
          </span>
        </div>
      </div>

      {/* Main Insights Content Grid */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Left Column: Revenue Trajectory & Top Content */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Revenue Chart Simulation */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 space-y-5">
            <div>
              <h3 className="font-extrabold text-neutral-950 text-xs uppercase tracking-wider">Revenue Summary (₹)</h3>
              <p className="text-[10px] text-neutral-400 font-medium mt-0.5">Sponsorship earnings trend (Feb - Jul 2026)</p>
            </div>

            {/* Custom Bar Graph Layout */}
            <div className="flex items-end justify-between h-44 pt-6 border-b border-neutral-50 px-2">
              {revenueGraph.map((item, index) => {
                const heightPercentage = maxRevenue ? (item.amount / maxRevenue) * 100 : 0;
                return (
                  <div key={index} className="flex flex-col items-center gap-2 group w-12">
                    {/* Tooltip value */}
                    <span className="text-[9px] font-black text-neutral-800 bg-neutral-100 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity absolute mb-16">
                      ₹{(item.amount / 1000).toFixed(1)}k
                    </span>
                    {/* Bar */}
                    <div
                      className="w-8 bg-purple-600 group-hover:bg-purple-700 transition-all rounded-t-lg shadow-sm"
                      style={{ height: `${Math.max(heightPercentage * 1.2, 8)}px` }}
                    />
                    {/* Month Label */}
                    <span className="text-[10px] font-bold text-neutral-400">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performing Content widget */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
            <h3 className="font-extrabold text-neutral-950 text-xs uppercase tracking-wider pb-3 border-b border-neutral-50 mb-4">Top Performing Content</h3>
            
            <div className="space-y-3.5">
              {topContent.map((content, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-neutral-50/50 rounded-2xl border border-neutral-100 transition-colors">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded">
                      {content.source}
                    </span>
                    <h4 className="font-bold text-neutral-800 text-xs mt-1.5">{content.title}</h4>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-black text-neutral-900">{content.views}</p>
                    <p className="text-[10px] text-neutral-400 font-semibold">{content.engagement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Insights Coaching Cards */}
        <div className="md:col-span-5 bg-white border border-neutral-100 shadow-sm rounded-3xl p-6">
          <div className="pb-3 border-b border-neutral-50 mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-neutral-950 text-xs uppercase tracking-wider flex items-center gap-1">
                <Lightbulb size={14} className="text-purple-600" />
                <span>AI Operating Suggestions</span>
              </h3>
              <p className="text-[10px] text-neutral-400 font-medium">Automatic monetization audits</p>
            </div>
          </div>

          <div className="space-y-4">
            {suggestions.map((sug) => (
              <div
                key={sug.id}
                className="p-4 rounded-2xl border border-neutral-100 hover:border-purple-200 transition-colors space-y-3 relative group text-xs font-semibold bg-neutral-50/20"
              >
                <h4 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                  <span>{sug.title}</span>
                </h4>
                
                <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">{sug.text}</p>
                
                <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100/50 text-[11px] text-purple-800 font-semibold">
                  {sug.solution}
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleApplySuggestion(sug)}
                    className="px-3.5 py-1.5 rounded-lg text-[10px] font-bold bg-white border border-neutral-200 hover:border-purple-600 hover:text-purple-700 transition-colors shadow-xs cursor-pointer"
                  >
                    {sug.actionText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
