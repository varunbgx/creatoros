import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const steps = [
    { id: 'name', label: 'What should we call you?', placeholder: 'Your name' },
    { id: 'type', label: 'What type of creator are you?', placeholder: 'e.g., YouTuber, Instagram Creator, Podcaster' },
    { id: 'platform', label: 'Primary platform you create on?', placeholder: 'YouTube, Instagram, etc.' },
    { id: 'audience', label: 'Approximate audience size?', placeholder: 'Number of followers/subscribers' },
    { id: 'goal', label: 'What is your top goal with CreatorOS?', placeholder: 'e.g., streamline brand deals' }
  ];
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [steps[current].id]: e.target.value });
  };

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      // All steps completed
      onComplete(data);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-neutral-900 mb-4">Onboarding</h2>
      <p className="text-neutral-600 mb-6">{steps[current].label}</p>
      <input
        type="text"
        placeholder={steps[current].placeholder}
        className="w-full p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={data[steps[current].id] || ''}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={next}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
      >
        {current < steps.length - 1 ? (
          <>
            Next <ArrowRight size={14} />
          </>
        ) : (
          <>
            Finish <CheckCircle size={14} />
          </>
        )}
      </button>
    </div>
  );
}
