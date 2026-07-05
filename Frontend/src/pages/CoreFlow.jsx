import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, BadgeCheck } from 'lucide-react';

// Mock AI extraction function – in real app replace with actual service
const mockExtract = (message) => {
  // Simple parse: extract amount and deadline from message string
  const amountMatch = message.match(/\b\d+[.,]?\d*\s*(?:₹|INR)\b/i);
  const deadlineMatch = message.match(/\b(?:by|due)\s+([\w\s]+)\b/i);
  return {
    brand: 'Acme Corp',
    amount: amountMatch ? amountMatch[0] : '₹0',
    deadline: deadlineMatch ? deadlineMatch[1] : 'N/A',
    risk: Math.random() > 0.7 ? 'High' : 'Low'
  };
};

export default function CoreFlow() {
  const [message, setMessage] = useState('New brand message: Samsung wants a 30‑second video ad for ₹35,000 due tomorrow.');
  const [extracted, setExtracted] = useState(null);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    // Set page title for SEO / UX
    document.title = 'CreatorOS • Core Flow';
  }, []);

  const handleExtract = () => {
    const data = mockExtract(message);
    setExtracted(data);
  };

  const handleApprove = () => {
    setApproved(true);
    // Simulate task creation delay
    setTimeout(() => setApproved(false), 2000);
  };

  return (
    <section className="my-8 space-y-6">
      {/* Incoming brand message */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl">
        <h2 className="text-lg font-semibold text-purple-200 mb-2">Incoming Brand Message</h2>
        <p className="text-sm text-neutral-300 whitespace-pre-line">{message}</p>
        <button
          onClick={handleExtract}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
        >
          <BadgeCheck size={16} /> Extract Terms
        </button>
      </div>

      {/* Extraction panel */}
      {extracted && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl animate-fade-in">
          <h3 className="text-md font-medium text-purple-200 mb-2 flex items-center gap-2">
            <Check size={16} className="text-emerald-400" /> AI Extraction
          </h3>
          <dl className="grid grid-cols-2 gap-2 text-sm text-neutral-300">
            <div>
              <dt className="font-semibold text-purple-300">Brand</dt>
              <dd>{extracted.brand}</dd>
            </div>
            <div>
              <dt className="font-semibold text-purple-300">Amount</dt>
              <dd>{extracted.amount}</dd>
            </div>
            <div>
              <dt className="font-semibold text-purple-300">Deadline</dt>
              <dd>{extracted.deadline}</dd>
            </div>
            <div>
              <dt className="font-semibold text-purple-300">Risk</dt>
              <dd className={extracted.risk === 'High' ? 'text-rose-400' : 'text-emerald-400'}>{extracted.risk}</dd>
            </div>
          </dl>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleApprove}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
            >
              <Check size={16} /> Approve &amp; Create Task
            </button>
            <button
              onClick={() => setExtracted(null)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition-colors"
            >
              <X size={16} /> Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Task card animation */}
      {approved && (
        <div className="flex justify-center">
          <div className="mt-4 w-full max-w-md bg-white p-4 rounded-xl border border-purple-200 shadow-lg animate-bounce">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-purple-800">🛠️ Production Task</h4>
              <span className="text-xs text-neutral-500">Due: {extracted?.deadline || 'TBD'}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-700">Create video ad for {extracted?.brand}. Budget {extracted?.amount}.</p>
            <div className="mt-2 flex justify-end">
              <button className="text-xs text-purple-600 hover:underline">Open Kanban →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
