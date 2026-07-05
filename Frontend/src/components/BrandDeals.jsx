import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Edit2,
  CheckCircle,
  Eye,
  Trash2,
  DollarSign,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  ChevronRight,
  Star
} from 'lucide-react';

export default function BrandDeals({
  brandDeals,
  projects,
  onAddDeal,
  onUpdateDealStatus,
  onDeleteDeal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showMilestonePanel, setShowMilestonePanel] = useState(false);
  const linkedProject = selectedDeal ? projects?.find(p => p.dealId === selectedDeal.id) : null;

  // Performance milestone tiers per deal (keyed by deal ID)
  // Each tier: { label, metric, threshold, bonus, achieved }
  const milestoneData = {
    'deal-samsung': [
      { label: 'Views Milestone 1', metric: 'YouTube Views', threshold: '500K views', bonus: 5000, achieved: true },
      { label: 'Views Milestone 2', metric: 'YouTube Views', threshold: '1M views', bonus: 10000, achieved: false },
      { label: 'Engagement Rate', metric: 'Instagram Saves', threshold: '10K saves', bonus: 3000, achieved: true },
    ],
    'deal-boat': [
      { label: 'Views Milestone', metric: 'Reel Views', threshold: '750K views', bonus: 8000, achieved: false },
      { label: 'Click-Through Rate', metric: 'Link Clicks', threshold: '2K clicks', bonus: 2500, achieved: false },
    ],
    'deal-zara': [
      { label: 'Story Reach', metric: 'Instagram Reach', threshold: '250K reach', bonus: 4000, achieved: true },
      { label: 'Shopping Tag Taps', metric: 'Product Taps', threshold: '1K taps', bonus: 6000, achieved: false },
    ],
    'deal-noise': [
      { label: 'Views Milestone', metric: 'YouTube Views', threshold: '300K views', bonus: 3500, achieved: false },
    ]
  };

  const getDealMilestones = (deal) => milestoneData[deal.id] || [
    { label: 'Views Milestone', metric: 'Platform Views', threshold: '500K views', bonus: Math.round(deal.amount * 0.1), achieved: false },
    { label: 'Engagement Bonus', metric: 'Saves / Likes', threshold: '5K engagements', bonus: Math.round(deal.amount * 0.05), achieved: false },
  ];

  const getDealBonusPotential = (deal) => {
    const milestones = getDealMilestones(deal);
    return milestones.reduce((sum, m) => sum + m.bonus, 0);
  };

  const getDealBonusUnlocked = (deal) => {
    const milestones = getDealMilestones(deal);
    return milestones.filter(m => m.achieved).reduce((sum, m) => sum + m.bonus, 0);
  };


  useEffect(() => {
    const highlightId = localStorage.getItem('creatoros_highlight_deal');
    if (highlightId) {
      const deal = brandDeals.find(d => d.id === highlightId);
      if (deal) {
        setSelectedDeal(deal);
        setShowEditModal(true);
      }
      localStorage.removeItem('creatoros_highlight_deal');
    }
  }, [brandDeals]);
  
  // Add Deal State
  const [newBrand, setNewBrand] = useState('');
  const [newCampaign, setNewCampaign] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('In Progress');
  const [newManager, setNewManager] = useState('Rohan (Manager)');

  // Filter deals
  const filteredDeals = brandDeals.filter(deal =>
    deal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Signed':
        return 'bg-indigo-50 border-indigo-100 text-indigo-700';
      case 'In Progress':
        return 'bg-blue-50 border-blue-100 text-blue-700';
      case 'Review':
        return 'bg-amber-50 border-amber-100 text-amber-700';
      case 'Completed':
        return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'Paid':
        return 'bg-purple-50 border-purple-100 text-purple-700';
      default:
        return 'bg-neutral-50 border-neutral-100 text-neutral-600';
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBrand || !newCampaign || !newAmount || !newDeadline) return;

    onAddDeal({
      brand: newBrand,
      campaign: newCampaign,
      amount: parseFloat(newAmount),
      deadline: newDeadline,
      status: newStatus,
      manager: newManager
    });

    // Reset
    setNewBrand('');
    setNewCampaign('');
    setNewAmount('');
    setNewDeadline('');
    setNewStatus('In Progress');
    setShowAddModal(false);
  };

  const openEdit = (deal) => {
    setSelectedDeal(deal);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdateDealStatus(selectedDeal.id, selectedDeal.status, selectedDeal.amount, selectedDeal.deadline);
    setShowEditModal(false);
    setSelectedDeal(null);
  };

  const totalEarnings = brandDeals.reduce((sum, d) => sum + d.amount, 0);
  const activeDealsValue = brandDeals
    .filter(d => d.status === 'In Progress' || d.status === 'Review')
    .reduce((sum, d) => sum + d.amount, 0);
  const totalBonusPotential = brandDeals.reduce((sum, d) => sum + getDealBonusPotential(d), 0);
  const totalBonusUnlocked = brandDeals.reduce((sum, d) => sum + getDealBonusUnlocked(d), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header and stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Sponsorship Pipeline</h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">Negotiate, audit, and track high-value brand collaborations and contracts.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          <span>Log Sponsorship Deal</span>
        </button>
      </div>

      {/* Mini Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-neutral-100/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Total Pipeline Value</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">{formatCurrency(totalEarnings)}</h3>
            <span className="text-[10px] font-bold text-emerald-600 block mt-1">+14.2% vs last month</span>
          </div>
          <span className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100 shrink-0">
            <TrendingUp size={18} />
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-100/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Active Deals Value</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">{formatCurrency(activeDealsValue)}</h3>
            <span className="text-[10px] font-bold text-blue-600 block mt-1">4 campaigns active</span>
          </div>
          <span className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0">
            <Briefcase size={18} />
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-100/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Paid Sponsorships</span>
            <h3 className="text-2xl font-bold text-neutral-900 leading-none">
              {formatCurrency(brandDeals.filter(d => d.status === 'Paid').reduce((sum, d) => sum + d.amount, 0))}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 block mt-1">100% payout rate</span>
          </div>
          <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0">
            <DollarSign size={18} />
          </span>
        </div>

        {/* Performance Upside Card */}
        <div className="bg-gradient-to-br from-amber-950 via-orange-950 to-neutral-950 p-6 rounded-2xl border border-amber-900/20 shadow-sm flex items-center justify-between relative overflow-hidden md:col-start-1 md:col-span-3">
          <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-amber-600/10 blur-[60px] pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-extrabold text-amber-400/80 uppercase tracking-wider block flex items-center gap-1.5">
              <Zap size={10} className="text-amber-400" />
              Performance-Linked Bonus Potential
            </span>
            <div className="flex items-end gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white leading-none">{formatCurrency(totalBonusPotential)}</h3>
                <span className="text-[10px] font-bold text-amber-400 block mt-1">total upside across all deals</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <h3 className="text-xl font-bold text-emerald-400 leading-none">{formatCurrency(totalBonusUnlocked)}</h3>
                <span className="text-[10px] font-bold text-emerald-500 block mt-1">already unlocked ✓</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-end gap-2">
            <span className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
              <Target size={18} />
            </span>
            <span className="text-[9px] text-amber-400/70 font-bold text-right max-w-[120px] leading-relaxed">Click any deal row to view milestone tiers</span>
          </div>
        </div>

      </div>

      {/* Table Section */}
      <div className="bg-white border border-neutral-100 shadow-sm shadow-neutral-100 rounded-2xl overflow-hidden">
        {brandDeals.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase size={28} />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">No Brand Deals Active</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Add your first sponsorship campaign to track contracts, deliverables, and total pipeline revenue.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Connect first brand deal</span>
            </button>
          </div>
        ) : (
          <>
            {/* Search Header */}
            <div className="p-4 border-b border-neutral-50 flex items-center gap-3">
              <Search size={16} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by brand name or campaign title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-neutral-700 bg-transparent border-none focus:outline-none placeholder-neutral-400 font-semibold"
              />
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Brand</th>
                    <th className="py-3 px-5">Campaign</th>
                    <th className="py-3 px-5">Base Amount</th>
                    <th className="py-3 px-5">Bonus Upside</th>
                    <th className="py-3 px-5">Deadline</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Manager</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {filteredDeals.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12">
                        <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Briefcase size={22} />
                          </div>
                          <div>
                            <h3 className="font-bold text-neutral-900 text-sm">No campaigns found</h3>
                            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                              No campaigns match your search keyword. Clear the search or create a new entry.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                filteredDeals.map((deal) => {
                    const milestones = getDealMilestones(deal);
                    const bonusPotential = getDealBonusPotential(deal);
                    const bonusUnlocked = getDealBonusUnlocked(deal);
                    const unlockedCount = milestones.filter(m => m.achieved).length;
                    return (
                  <tr key={deal.id} className="hover:bg-neutral-50/50 transition-colors cursor-pointer" onClick={() => openEdit(deal)}>
                    <td className="py-4 px-5 font-bold text-neutral-900 text-xs">{deal.brand}</td>
                    <td className="py-4 px-5 text-neutral-600 font-semibold text-xs">{deal.campaign}</td>
                    <td className="py-4 px-5 text-neutral-900 font-extrabold text-xs">{formatCurrency(deal.amount)}</td>
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-extrabold text-amber-700">{formatCurrency(bonusPotential)}</span>
                          <span className="text-[8px] font-bold text-neutral-400">potential</span>
                        </div>
                        {bonusUnlocked > 0 && (
                          <div className="flex items-center gap-1">
                            <CheckCircle size={9} className="text-emerald-500" />
                            <span className="text-[9px] font-bold text-emerald-600">{formatCurrency(bonusUnlocked)} unlocked</span>
                          </div>
                        )}
                        <div className="flex gap-0.5 mt-1">
                          {milestones.map((m, mi) => (
                            <div key={mi} className={`w-4 h-1.5 rounded-full ${m.achieved ? 'bg-emerald-400' : 'bg-neutral-200'}`} />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-neutral-500 font-semibold text-xs">{deal.deadline}</td>
                    <td className="py-4 px-5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(deal.status)}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-neutral-400 font-semibold text-xs">{deal.manager}</td>
                    <td className="py-4 px-5 text-right space-x-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => openEdit(deal)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateDealStatus(deal.id, 'Completed')}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Mark Completed"
                        disabled={deal.status === 'Completed' || deal.status === 'Paid'}
                      >
                        <CheckCircle size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteDeal(deal.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Deal"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>

      {/* Add Deal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <form onSubmit={handleAddSubmit} className="bg-white rounded-3xl border border-neutral-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm">Log Sponsorship Deal</h3>
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
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samsung"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Campaign Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Galaxy S26 Reel promotion"
                  value={newCampaign}
                  onChange={(e) => setNewCampaign(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 35000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Deadline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tomorrow, or July 25"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Signed">Signed</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Account Manager</label>
                  <input
                    type="text"
                    value={newManager}
                    onChange={(e) => setNewManager(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                  />
                </div>
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
                Create Deal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Deal Modal */}
      {showEditModal && selectedDeal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl border border-neutral-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm">Edit Sponsorship: {selectedDeal.brand}</h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Status</label>
                <select
                  value={selectedDeal.status}
                  onChange={(e) => setSelectedDeal({ ...selectedDeal, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Signed">Signed</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Contract Amount (₹)</label>
                <input
                  type="number"
                  value={selectedDeal.amount}
                  onChange={(e) => setSelectedDeal({ ...selectedDeal, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Deadline Date / String</label>
                <input
                  type="text"
                  value={selectedDeal.deadline}
                  onChange={(e) => setSelectedDeal({ ...selectedDeal, deadline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                />
              </div>

              {linkedProject && (
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 space-y-2 mt-2 text-left">
                  <div className="flex items-center justify-between text-[9px] font-extrabold text-purple-700 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Sparkles size={10} className="text-purple-600 animate-pulse shrink-0" />
                      <span>Linked Production Card</span>
                    </span>
                    <span className="bg-purple-100/80 px-2 py-0.5 rounded-md text-[9px] font-bold border border-purple-200/50">{linkedProject.status}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-tight">{linkedProject.title}</h4>
                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-[9px] font-bold text-purple-600">
                      <span>Production Progress</span>
                      <span>{linkedProject.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-purple-200/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all duration-300"
                        style={{ width: `${linkedProject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Milestones Section */}
              {selectedDeal && (() => {
                const milestones = getDealMilestones(selectedDeal);
                const bonusPotential = getDealBonusPotential(selectedDeal);
                const bonusUnlocked = getDealBonusUnlocked(selectedDeal);
                return (
                  <div className="mt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowMilestonePanel(!showMilestonePanel)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Zap size={13} className="text-amber-600" />
                        <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">Performance Milestones</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                          +{formatCurrency(bonusPotential)} upside
                        </span>
                      </div>
                      <ChevronRight size={13} className={`text-amber-600 transition-transform ${showMilestonePanel ? 'rotate-90' : ''}`} />
                    </button>

                    {showMilestonePanel && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Milestone Tiers</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-emerald-600">{formatCurrency(bonusUnlocked)} unlocked</span>
                            <span className="text-neutral-300">·</span>
                            <span className="text-[9px] font-bold text-amber-600">{formatCurrency(bonusPotential - bonusUnlocked)} remaining</span>
                          </div>
                        </div>

                        {milestones.map((m, mi) => (
                          <div
                            key={mi}
                            className={`p-3 rounded-xl border flex items-start gap-3 ${
                              m.achieved
                                ? 'bg-emerald-50 border-emerald-100'
                                : 'bg-neutral-50 border-neutral-100'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              m.achieved ? 'bg-emerald-100 border border-emerald-200' : 'bg-neutral-200 border border-neutral-300'
                            }`}>
                              {m.achieved
                                ? <CheckCircle size={13} className="text-emerald-600" />
                                : <Star size={11} className="text-neutral-400" />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold text-neutral-800">{m.label}</span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                                  m.achieved
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                  +{formatCurrency(m.bonus)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Target size={9} className="text-neutral-400 shrink-0" />
                                <span className="text-[9px] font-medium text-neutral-500">{m.metric}: {m.threshold}</span>
                              </div>
                              {m.achieved && (
                                <span className="text-[8px] font-extrabold text-emerald-600 flex items-center gap-1 mt-1">
                                  <CheckCircle size={8} /> Bonus unlocked — pending in next invoice cycle
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Total bar */}
                        <div className="p-3 rounded-xl bg-neutral-950 text-left space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Total Deal Value with Bonuses</span>
                            <span className="text-xs font-extrabold text-white">{formatCurrency(selectedDeal.amount + bonusUnlocked)}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all"
                              style={{ width: `${bonusPotential > 0 ? Math.round((bonusUnlocked / bonusPotential) * 100) : 0}%` }}
                            />
                          </div>
                          <p className="text-[8px] text-neutral-500 font-medium">
                            {bonusPotential > 0 ? Math.round((bonusUnlocked / bonusPotential) * 100) : 0}% of performance bonus unlocked · Base: {formatCurrency(selectedDeal.amount)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-50">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              >
                Save Updates
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
