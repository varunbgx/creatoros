import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, Play } from 'lucide-react';
import Onboarding from './Onboarding';

export default function Login({ onLogin }) {
  const [selectedProfile, setSelectedProfile] = useState('youtube'); // 'youtube', 'instagram', 'podcast'
  const [showOnboarding, setShowOnboarding] = useState(false);

  const profiles = {
    youtube: {
      name: 'Charan👋',
      role: 'Tech YouTuber',
      handle: '@charancreates',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      stats: '450K subscribers • 12M monthly views',
      focus: 'Samsung S26 campaign, video editing review'
    },
    instagram: {
      name: 'Teja Sri ✨',
      role: 'Fashion & Style Creator',
      handle: '@tejustyles',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      stats: '820K followers • 5.4% engagement',
      focus: 'ZARA haul Reel, brand shoot at 2 PM'
    },
    podcast: {
      name: 'Varun 🎙️',
      role: 'Business & Finance Podcaster',
      handle: '@varuntalksmoney',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      stats: '150K weekly listeners • Spotify Top 50',
      focus: 'Sponsorship script review, Boat invoice'
    }
  };

  const handleDemoLogin = (profileKey) => {
    onLogin(profileKey);
  };

  return (
    <div className="min-h-screen bg-[#faf9fc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-12 gap-8 items-center z-10">

        {/* Left Side: Product Intro */}
        <div className="md:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium">
            <Sparkles size={14} className="animate-pulse text-purple-600" />
            <span>Hackathon Prototype MVP</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none">
              Creator<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">OS</span>
            </h1>
            <p className="text-xl text-neutral-600 font-semibold leading-snug">
              The AI Operating System for Creator Businesses.
            </p>
          </div>

          <p className="text-neutral-500 leading-relaxed max-w-md text-sm">
            Stop switching between Gmail, WhatsApp, Notion, spreadsheets, and Drive. CreatorOS centralizes your sponsorships, payments, team workflows, and content planning into one intelligent command center.
          </p>

          <div className="space-y-2 py-2">
            <div className="flex items-start gap-2.5 text-sm text-neutral-600">
              <span className="p-1 rounded-full bg-purple-100 text-purple-700 mt-0.5">✓</span>
              <span><strong>AI Chief Operating Officer</strong>: Keeps track of deadlines, invoices, and reviews.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-neutral-600">
              <span className="p-1 rounded-full bg-purple-100 text-purple-700 mt-0.5">✓</span>
              <span><strong>Interactive Project Boards</strong>: Unified script-to-publish tracking.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-neutral-600">
              <span className="p-1 rounded-full bg-purple-100 text-purple-700 mt-0.5">✓</span>
              <span><strong>Unified Payments</strong>: All invoices, sponsorships, and payouts in ₹.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Panel */}
        <div className="md:col-span-6">{showOnboarding ? (
          <Onboarding
            onComplete={(data) => {
              localStorage.setItem('onboardingComplete', 'true');
              onLogin(selectedProfile, data);
            }}
          />
        ) : (
          <div className="bg-white rounded-3xl shadow-xl shadow-neutral-100 border border-neutral-100 p-8 space-y-6 relative">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-neutral-900">Welcome to CreatorOS</h2>
              <p className="text-sm text-neutral-500">Pick a demo profile to experience the dashboard</p>
            </div>

            {/* Profile Selector Cards */}
            <div className="space-y-3">
              {Object.entries(profiles).map(([key, prof]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedProfile(key)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${selectedProfile === key
                      ? 'border-purple-600 bg-purple-50/50 shadow-sm shadow-purple-100/50'
                      : 'border-neutral-100 bg-white hover:border-neutral-200 hover:bg-neutral-50/40'
                    }`}
                >
                  <img
                    src={prof.avatar}
                    alt={prof.role}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white ring-2 ring-neutral-100 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-900 text-sm">Demo as {prof.name}</h4>
                      {selectedProfile === key && (
                        <UserCheck size={16} className="text-purple-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 font-medium">{prof.role} • {prof.handle}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5 truncate">{prof.stats}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => { if (localStorage.getItem('onboardingComplete')) { onLogin(selectedProfile); } else { setShowOnboarding(true); } }}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-md shadow-purple-200/50 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Enter WorkSpace</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-neutral-100"></div>
                <span className="flex-shrink mx-4 text-xs text-neutral-400 font-medium">Or log in with</span>
                <div className="flex-grow border-t border-neutral-100"></div>
              </div>

              {/* Simulated Google Button */}
              <button
                type="button"
                onClick={() => { if (localStorage.getItem('onboardingComplete')) { onLogin(selectedProfile); } else { setShowOnboarding(true); } }}
                className="w-full py-3 px-4 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 font-medium text-neutral-700 transition-colors flex items-center justify-center gap-2.5 text-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.8-2.6 3.12v2.58h4.22c2.47-2.28 3.89-5.63 3.89-9.55z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.22-2.58c-1.12.75-2.56 1.2-4.14 1.2-3.18 0-5.87-2.15-6.83-5.06H.43v2.75C2.42 20.35 6.94 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.17 14.65c-.25-.75-.39-1.55-.39-2.38s.14-1.63.39-2.38V7.14H.43C.16 8.35 0 9.65 0 11s.16 2.65.43 3.86l4.74-3.71z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.97 1.19 15.24 0 12 0 6.94 0 2.42 3.65.43 7.14l4.74 3.71c.96-2.91 3.65-5.1 6.83-5.1z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button type="button" onClick={() => { localStorage.clear(); setShowOnboarding(false); }} className="mt-2 text-sm text-red-600 hover:underline">Reset Workspace</button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-neutral-400 font-medium">
                  Prototype v1.0.0 • No credit card or real integrations required.
                </span>
              </div>
            </div>
          </div>
        )}
        </div>

      </div>
    </div>
  );
}
