import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  DollarSign,
  Video,
  Clock,
  CheckCircle,
  HelpCircle,
  Bell,
  RefreshCw,
  Mail,
  ArrowRight,
  MessageCircle,
  Zap,
  ChevronRight,
  User
} from 'lucide-react';

export default function AIOperationsAssistant({
  cards,
  onDismissCard,
  onTriggerAction,
  setActiveTab,
  onScanNewActivities,
  onAddDeal
}) {
  const [scanning, setScanning] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('gmail'); // 'gmail' | 'whatsapp'
  const [activeThread, setActiveThread] = useState(null); // selected WA thread
  const [parsedDeal, setParsedDeal] = useState(null); // AI-parsed deal from WA
  const [parsing, setParsing] = useState(false);

  // Simulated WhatsApp inbox threads
  const waThreads = [
    {
      id: 'wa-1',
      contact: 'Priya \u2013 boAt Audio',
      avatar: 'https://i.pravatar.cc/150?img=47',
      lastMsg: "Hey! We'd love a sponsored Reel for the new Nirvana 525 ANC. Budget is \u20b945k.",
      time: '10:22 AM',
      unread: 2,
      messages: [
        { from: 'them', text: "Hi! I'm Priya from boAt's influencer team. Loved your recent tech review \ud83d\udd25", time: '10:18 AM' },
        { from: 'them', text: "We'd love to collaborate on a sponsored Reel for our new Nirvana 525 ANC headphones.", time: '10:19 AM' },
        { from: 'them', text: 'Our budget is \u20b945,000. The deliverable would be a 60-sec Reel posted by July 25. Exclusivity: 30 days on headphone category.', time: '10:22 AM' },
      ],
      parsed: {
        brand: 'boAt Audio',
        campaign: 'Nirvana 525 ANC \u2013 Sponsored Reel',
        amount: 45000,
        deadline: 'July 25',
        deliverable: '60-sec Instagram Reel',
        exclusivity: '30 days (headphone category)',
        status: 'In Progress'
      }
    },
    {
      id: 'wa-2',
      contact: 'Aakash \u2013 Mamaearth',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMsg: 'Quick check-in on the skincare campaign proposal we discussed!',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { from: 'me', text: 'Hey Aakash, got your email! The skincare collab looks interesting.', time: 'Mon 3:10 PM' },
        { from: 'them', text: "We're thinking 2 YouTube Shorts + 1 Instagram Story. Total: \u20b960,000. Deadline is Aug 10.", time: 'Mon 3:45 PM' },
        { from: 'them', text: 'Quick check-in on the skincare campaign proposal we discussed!', time: 'Yesterday' },
      ],
      parsed: {
        brand: 'Mamaearth',
        campaign: 'Skincare Campaign \u2013 2 Shorts + Story',
        amount: 60000,
        deadline: 'Aug 10',
        deliverable: '2 YouTube Shorts + 1 Instagram Story',
        exclusivity: 'None specified',
        status: 'In Progress'
      }
    },
    {
      id: 'wa-3',
      contact: 'Riya \u2013 Zepto',
      avatar: 'https://i.pravatar.cc/150?img=33',
      lastMsg: 'Would you be open to an unboxing format for our new Zepto Instant?',
      time: 'Mon',
      unread: 1,
      messages: [
        { from: 'them', text: "Hi! I'm Riya from Zepto's creator partnerships team.", time: 'Mon 11:00 AM' },
        { from: 'them', text: 'Would you be open to an unboxing format for our new Zepto Instant product? Thinking \u20b930,000 for a single YouTube Short, post by July 30.', time: 'Mon 11:02 AM' },
      ],
      parsed: {
        brand: 'Zepto',
        campaign: 'Zepto Instant \u2013 Unboxing Short',
        amount: 30000,
        deadline: 'July 30',
        deliverable: '1 YouTube Short',
        exclusivity: 'None specified',
        status: 'In Progress'
      }
    }
  ];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      onScanNewActivities();
      setScanning(false);
      triggerToast('AI Scan Complete: Found 1 new Gmail collaboration proposal!');
    }, 1500);
  };

  const handleCardAction = (card, actionType) => {
    if (actionType === 'dismiss') {
      onDismissCard(card.id);
      triggerToast(`"${card.title}" dismissed.`);
      return;
    }

    if (actionType === 'remind') {
      triggerToast(`WhatsApp reminder scheduled for ${userProfilePhone() ? 'your manager' : 'your team'}.`);
      return;
    }

    if (actionType === 'view') {
      if (card.type === 'deal') setActiveTab('brand-deals');
      else if (card.type === 'payment') setActiveTab('payments');
      else if (card.type === 'project') setActiveTab('projects');
      else setActiveTab('ai-insights');
      return;
    }

    if (actionType === 'review') {
      // Show rich modal details representing AI analysis of contract/assets
      let details = {};
      if (card.id === 'card-samsung') {
        details = {
          title: 'Review Samsung Galaxy S26 Reel Contract',
          badge: 'Contract Audit',
          description: 'Our AI scanned the brand agreement and flagged a potential issue in the Exclusivity Clause:',
          issue: 'Exclusivity forbids posting about ANY smartphone for 90 days. Average market standard is 30 days for this tier.',
          recommendation: 'Request Samsung to reduce exclusivity to 30 days. CreatorOS has drafted a reply below.',
          draft: 'Hi Samsung Team,\n\nThanks for sending over the contract! Regarding Clause 4.2 (Exclusivity), we would like to adjust the smartphone exclusivity duration from 90 days to 30 days post-publish, matching our standard branding policy. Let me know if we can update this!\n\nBest,\nAlex',
          buttonText: 'Send Draft via Gmail'
        };
      } else if (card.id === 'card-boat') {
        details = {
          title: 'Resolve pending ₹25,000 Boat Payment',
          badge: 'Payment Dispute',
          description: 'Boat payment is overdue by 5 days. Our AI scanned the WhatsApp history and found the following:',
          issue: 'Manager Rohan sent invoice on June 28. Boat representative (Siddharth) confirmed receipt but noted that their accounts team requires the project link to be attached in the portal.',
          recommendation: 'Resend invoice with the published Reel URL attached.',
          draft: 'Hey Siddharth, just resending the invoice with the live Reel link (instagram.com/reel/123) for your accounting team. Let us know when the transfer goes through! - CreatorOS Bot',
          buttonText: 'Send Ping via WhatsApp Business'
        };
      } else if (card.id === 'card-editor') {
        details = {
          title: 'Review Editor Upload - Reel #12 Draft',
          badge: 'Asset Inspection',
          description: 'Editor Amit uploaded Reel #12 (ZARA summer collection haul) for your feedback.',
          issue: 'Video duration is 59 seconds. Audio overlay aligns perfectly. AI check shows thumbnail safety margins are correct.',
          recommendation: 'Review video playback and publish directly to Instagram, or send timestamps to editor.',
          draft: 'Video looks clean! Let\'s boost the exposure slightly at 0:14, then it is good to upload. Go ahead.',
          buttonText: 'Send Feedback to Editor'
        };
      } else {
        details = {
          title: 'Optimize upload schedule - Best posting time',
          badge: 'Engagement Analysis',
          description: 'CreatorOS analyzed last 60 days of Instagram & YouTube engagement graphs.',
          issue: 'Posts published on Fridays at 7:00 PM IST receive 32% more engagement than those at 5:00 PM.',
          recommendation: 'Reschedule the upcoming ZARA Reel publish time in YouTube Studio and Instagram.',
          draft: 'Schedule update: Shift release time from 5:00 PM to 7:00 PM IST today.',
          buttonText: 'Reschedule in YouTube Studio'
        };
      }
      setModalDetails({ ...details, cardId: card.id });
    }
  };

  const executeModalAction = () => {
    triggerToast('Action sent successfully!');
    if (modalDetails.cardId) {
      onDismissCard(modalDetails.cardId);
    }
    setModalDetails(null);
  };

  // Helper inside workspace profiles
  const userProfilePhone = () => {
    return true;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'deal': return <AlertTriangle className="text-purple-600" size={20} />;
      case 'payment': return <DollarSign className="text-amber-600" size={20} />;
      case 'project': return <Video className="text-blue-600" size={20} />;
      default: return <Clock className="text-indigo-600" size={20} />;
    }
  };

  const getColorClass = (type) => {
    switch (type) {
      case 'deal': return 'border-purple-100 bg-purple-50/60';
      case 'payment': return 'border-amber-100 bg-amber-50/60';
      case 'project': return 'border-blue-100 bg-blue-50/60';
      default: return 'border-indigo-100 bg-indigo-50/60';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-neutral-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 z-[100] animate-fade-in border border-neutral-800">
          <Sparkles size={14} className="text-purple-400" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-neutral-950 p-8 text-white border border-neutral-800/40 shadow-xl shadow-indigo-950/10">
        <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[20%] w-[300px] h-[300px] rounded-full bg-indigo-600/20 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={11} className="text-purple-400 animate-spin" />
              <span>AI Operations Center</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Meet your AI Chief Operating Officer</h2>
            <p className="text-xs text-neutral-300 font-medium leading-relaxed">
              CreatorOS scans your connected Gmail, WhatsApp, and Google Drive accounts to automatically resolve contract problems, follow up on payments, and organize reviews.
            </p>
          </div>

          <button
            type="button"
            disabled={scanning}
            onClick={handleScan}
            className="px-4 py-2.5 rounded-xl font-bold bg-white text-neutral-950 hover:bg-neutral-100 transition-colors text-xs flex items-center gap-2 border border-transparent shadow-md cursor-pointer shrink-0 disabled:opacity-50"
          >
            <RefreshCw size={14} className={scanning ? 'animate-spin' : ''} />
            <span>{scanning ? 'Scanning channels...' : 'Scan for new alerts'}</span>
          </button>
        </div>
      </div>

      {/* Channel Toggle */}
      <div className="flex items-center gap-0 bg-neutral-100 rounded-2xl p-1 w-fit">
        <button
          type="button"
          onClick={() => setActiveChannel('gmail')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeChannel === 'gmail'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <Mail size={13} />
          <span>Gmail Inbox</span>
          {cards.length > 0 && (
            <span className="bg-purple-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">{cards.length}</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveChannel('whatsapp')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeChannel === 'whatsapp'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <MessageCircle size={13} className="text-emerald-600" />
          <span>WhatsApp Inbound</span>
          <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">3</span>
        </button>
      </div>
      {/* Gmail Cards Panel */}
      {activeChannel === 'gmail' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Active Operations ({cards.length})</h3>
            <span className="text-[10px] text-neutral-400 font-medium">Synced with Gmail &amp; WhatsApp</span>
          </div>

          {cards.length === 0 ? (
            <div className="bg-white border border-neutral-100 rounded-3xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm">All operations clear!</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Your inbox, calendar, and payment systems are fully synchronized and there are no alerts. Click "Scan for new alerts" to simulate new emails.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-48 bg-white border-neutral-100 shadow-sm hover:shadow-md`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`p-2.5 rounded-xl border ${getColorClass(card.type)} shrink-0`}>
                      {getIcon(card.type)}
                    </span>
                    <div className="space-y-1 text-left flex-1 min-w-0">
                      <h4 className="font-extrabold text-neutral-900 text-xs truncate uppercase tracking-wider">{card.source}</h4>
                      <h3 className="font-bold text-neutral-800 text-sm">{card.title}</h3>
                      <p className="text-xs text-neutral-500 font-medium leading-normal line-clamp-2">{card.description}</p>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-50">
                    <button
                      type="button"
                      onClick={() => handleCardAction(card, 'dismiss')}
                      className="px-2.5 py-1.5 rounded-lg border border-neutral-100 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 text-[10px] font-bold transition-all cursor-pointer bg-white"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCardAction(card, 'remind')}
                      className="px-2.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 text-[10px] font-bold transition-all cursor-pointer bg-white"
                    >
                      Remind Team
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCardAction(card, 'view')}
                      className="px-2.5 py-1.5 rounded-lg border border-neutral-200 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50/50 text-[10px] font-bold transition-all cursor-pointer bg-white"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCardAction(card, 'review')}
                      className="px-3.5 py-1.5 rounded-lg text-[10px] font-bold bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-1 shadow-sm shadow-purple-100 cursor-pointer"
                    >
                      <span>Review</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* WhatsApp Inbox Panel */}
      {activeChannel === 'whatsapp' && (
        <div className="grid md:grid-cols-5 gap-5">
          {/* Thread List */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Inbound Chats</h3>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Live Sync
              </span>
            </div>
            {waThreads.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setActiveThread(t); setParsedDeal(null); }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  activeThread?.id === t.id
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-white border-neutral-100 hover:border-neutral-200 hover:shadow-sm'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={t.avatar} alt={t.contact} className="w-10 h-10 rounded-full object-cover" />
                  {t.unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">{t.unread}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 truncate">{t.contact}</span>
                    <span className="text-[9px] text-neutral-400 font-semibold shrink-0 ml-1">{t.time}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-medium truncate mt-0.5">{t.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Chat View + AI Parser */}
          <div className="md:col-span-3">
            {!activeThread ? (
              <div className="bg-white border border-neutral-100 rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <MessageCircle size={22} />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">Select a chat to view</h3>
                <p className="text-xs text-neutral-400 max-w-xs">Pick an inbound brand message to see the conversation thread and run AI deal extraction.</p>
              </div>
            ) : (
              <div className="bg-white border border-neutral-100 rounded-3xl overflow-hidden flex flex-col" style={{height: '480px'}}>
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-50 bg-white shrink-0">
                  <img src={activeThread.avatar} alt={activeThread.contact} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{activeThread.contact}</p>
                    <p className="text-[9px] text-emerald-600 font-semibold">Online via WhatsApp Business</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Inbound Brand</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[#faf9fc]">
                  {activeThread.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                      {msg.from === 'them' && (
                        <img src={activeThread.avatar} alt="" className="w-6 h-6 rounded-full object-cover mr-2 mt-1 shrink-0" />
                      )}
                      <div
                        className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-medium ${
                          msg.from === 'me'
                            ? 'bg-purple-600 text-white rounded-br-sm'
                            : 'bg-white text-neutral-800 border border-neutral-100 rounded-bl-sm shadow-xs'
                        }`}
                      >
                        {msg.text}
                        <span className={`block text-[8px] mt-1 font-semibold ${ msg.from === 'me' ? 'text-purple-200 text-right' : 'text-neutral-400'}`}>{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Parser CTA */}
                <div className="px-5 py-4 border-t border-neutral-50 bg-white shrink-0">
                  {!parsedDeal ? (
                    <button
                      type="button"
                      disabled={parsing}
                      onClick={() => {
                        setParsing(true);
                        setTimeout(() => {
                          setParsedDeal(activeThread.parsed);
                          setParsing(false);
                        }, 1200);
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center justify-center gap-2 shadow-md shadow-purple-100 cursor-pointer disabled:opacity-60 transition-all"
                    >
                      {parsing ? (
                        <><RefreshCw size={12} className="animate-spin" /><span>AI Parsing Deal Terms...</span></>
                      ) : (
                        <><Zap size={12} className="text-yellow-300" /><span>Extract Deal Terms with AI</span></>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                        <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider">
                          <Sparkles size={10} className="text-emerald-600 animate-pulse" />
                          <span>AI Extracted Deal Terms</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-left">
                          {[
                            ['Brand', parsedDeal.brand],
                            ['Campaign', parsedDeal.campaign],
                            ['Amount', `₹${parsedDeal.amount.toLocaleString('en-IN')}`],
                            ['Deadline', parsedDeal.deadline],
                            ['Deliverable', parsedDeal.deliverable],
                            ['Exclusivity', parsedDeal.exclusivity],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <span className="text-[8px] font-extrabold text-neutral-400 uppercase tracking-wider block">{label}</span>
                              <span className="text-[10px] font-bold text-neutral-900 leading-tight">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (onAddDeal) {
                            onAddDeal({
                              brand: parsedDeal.brand,
                              campaign: parsedDeal.campaign,
                              amount: parsedDeal.amount,
                              deadline: parsedDeal.deadline,
                              status: parsedDeal.status,
                              manager: 'Rohan (Manager)'
                            });
                          }
                          triggerToast(`✅ Brand Deal for "${parsedDeal.brand}" created in Sponsorship Pipeline!`);
                          setTimeout(() => setActiveTab('brand-deals'), 1200);
                        }}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 shadow-md shadow-purple-100 cursor-pointer transition-all"
                      >
                        <ChevronRight size={13} />
                        <span>Create Brand Deal from this Chat</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* Review Modal */}
      {modalDetails && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <div className="bg-white rounded-3xl border border-neutral-100 w-full max-w-xl p-6 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-50">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600" />
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
                  {modalDetails.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalDetails(null)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-left">
              <h3 className="text-base font-bold text-neutral-900 leading-snug">{modalDetails.title}</h3>
              <p className="text-xs text-neutral-500 font-medium">{modalDetails.description}</p>
              
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100/50 space-y-1">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">AI Audit Warning</span>
                <p className="text-xs text-rose-800 font-medium leading-relaxed">{modalDetails.issue}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Recommended Reply Draft</span>
                <textarea
                  readOnly
                  className="w-full p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-700 font-mono leading-relaxed h-32 focus:outline-none"
                  value={modalDetails.draft}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-50">
              <button
                type="button"
                onClick={() => setModalDetails(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={executeModalAction}
                className="px-4.5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-100"
              >
                <Mail size={13} />
                <span>{modalDetails.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
