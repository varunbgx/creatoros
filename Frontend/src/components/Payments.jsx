import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  Search
} from 'lucide-react';

export default function Payments({
  payments,
  onAddPayment,
  onMarkPaid,
  onDeletePayment
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Payment Fields
  const [newBrand, setNewBrand] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newInvoiceNo, setNewInvoiceNo] = useState('');
  const [newStatus, setNewStatus] = useState('Pending');
  const [newDueDate, setNewDueDate] = useState('Today');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle size={10} />
            <span>Paid</span>
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
            <AlertCircle size={10} />
            <span>Overdue</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
            <Clock size={10} />
            <span>Pending</span>
          </span>
        );
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBrand || !newAmount || !newDueDate) return;

    const customInvoice = newInvoiceNo || `INV-2026-${Math.floor(Math.random() * 900) + 100}`;
    onAddPayment({
      brand: newBrand,
      amount: parseFloat(newAmount),
      invoiceNo: customInvoice,
      status: newStatus,
      dueDate: newDueDate
    });

    setNewBrand('');
    setNewAmount('');
    setNewInvoiceNo('');
    setNewStatus('Pending');
    setNewDueDate('Today');
    setShowAddModal(false);
  };

  const handleDownloadInvoice = (pay) => {
    alert(`Generating PDF download for Invoice ${pay.invoiceNo} (${pay.brand}) - Contract Value: ${formatCurrency(pay.amount)}`);
  };

  // Filter
  const filteredPayments = payments.filter(p =>
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Totals
  const paidTotal = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueTotal = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Sponsor Invoices & Creator Earnings</h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">Track outstanding sponsor cashflow and generate PDFs for brand clients.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          <span>Generate Invoice</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-neutral-100/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Payments Cleared</span>
            <h3 className="text-2xl font-bold text-emerald-600 leading-none">{formatCurrency(paidTotal)}</h3>
            <span className="text-[10px] font-bold text-emerald-600 block mt-1">100% payout rate</span>
          </div>
          <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0">
            <CheckCircle size={18} />
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-100/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Pending Approvals</span>
            <h3 className="text-2xl font-bold text-amber-600 leading-none">{formatCurrency(pendingTotal)}</h3>
            <span className="text-[10px] font-bold text-amber-600 block mt-1">Waiting brand approval</span>
          </div>
          <span className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 shrink-0">
            <Clock size={18} />
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-100/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">Overdue / Delayed</span>
            <h3 className="text-2xl font-bold text-rose-600 leading-none">{formatCurrency(overdueTotal)}</h3>
            <span className="text-[10px] font-bold text-rose-600 block mt-1">Requires follow-up</span>
          </div>
          <span className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 shrink-0">
            <AlertCircle size={18} />
          </span>
        </div>
      </div>

      {/* Invoice Tracker */}
      <div className="bg-white border border-neutral-100 shadow-sm shadow-neutral-100 rounded-2xl overflow-hidden">
        
        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">No Invoices Generated Yet</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Generate professional invoice details to record and track brand payouts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Record first invoice</span>
            </button>
          </div>
        ) : (
          <>
            {/* Table Search */}
            <div className="p-4 border-b border-neutral-50 flex items-center gap-3">
              <Search size={16} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Search invoice by brand or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-neutral-700 bg-transparent border-none focus:outline-none placeholder-neutral-400 font-semibold"
              />
            </div>

            {/* Invoice Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Invoice ID</th>
                    <th className="py-3 px-5">Brand</th>
                    <th className="py-3 px-5">Amount</th>
                    <th className="py-3 px-5">Due Date</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12">
                        <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                            <FileText size={22} />
                          </div>
                          <div>
                            <h3 className="font-bold text-neutral-900 text-sm">No invoices found</h3>
                            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                              No invoices match your search keyword. Clear the search or create a new entry.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-neutral-800 text-xs flex items-center gap-1.5">
                      <FileText size={13} className="text-neutral-400" />
                      <span>#{pay.invoiceNo}</span>
                    </td>
                    <td className="py-4 px-5 font-bold text-neutral-900 text-xs">{pay.brand}</td>
                    <td className="py-4 px-5 font-black text-neutral-900 text-xs">{formatCurrency(pay.amount)}</td>
                    <td className="py-4 px-5 text-neutral-500 font-semibold text-xs">{pay.dueDate}</td>
                    <td className="py-4 px-5">{getStatusBadge(pay.status)}</td>
                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadInvoice(pay)}
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-100 hover:border-neutral-200 text-neutral-500 hover:text-neutral-800 text-[11px] font-bold transition-all inline-flex items-center gap-1 bg-white cursor-pointer"
                      >
                        <Download size={11} />
                        <span>PDF</span>
                      </button>

                      {pay.status !== 'Paid' && (
                        <button
                          type="button"
                          onClick={() => onMarkPaid(pay.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-[11px] font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle size={11} />
                          <span>Record Payment</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <form onSubmit={handleAddSubmit} className="bg-white rounded-3xl border border-neutral-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <h3 className="font-bold text-neutral-900 text-sm">Generate Sponsor Invoice</h3>
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
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Brand Client</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boat Incurred"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Invoice Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Invoice ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. INV-2026-981"
                    value={newInvoiceNo}
                    onChange={(e) => setNewInvoiceNo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Due Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Today, or July 10"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Paid">Paid</option>
                  </select>
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
                Issue Invoice
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
