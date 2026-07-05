import React, { useState } from 'react';
import {
  Link,
  CheckCircle,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  AlertTriangle,
  Info,
  FileJson,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export default function ConnectApps({ connectedApps, onToggleConnect }) {
  const [authModal, setAuthModal] = useState(null);
  const [revokeModal, setRevokeModal] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [expandedApp, setExpandedApp] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const apps = [
    {
      id: 'youtube',
      name: 'YouTube Studio',
      description: 'Track upload status, publish drafts, and view video analytics.',
      logo: '🎥',
      color: 'bg-red-50 text-red-600 border-red-100',
      available: true,
      scopes: [
        { label: 'Read video analytics', write: false },
        { label: 'Read upload status', write: false },
        { label: 'Read channel metadata', write: false },
      ],
      dataStored: 'Video titles, view counts, upload timestamps',
      lastSync: '2 minutes ago'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Direct-ping editors, team members, and clients via AI manager.',
      logo: '💬',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      available: true,
      scopes: [
        { label: 'Send notifications (outbound only)', write: true },
        { label: 'Read inbound brand messages', write: false },
      ],
      dataStored: 'Brand contact names, message timestamps (no message content stored)',
      lastSync: '5 minutes ago'
    },
    {
      id: 'gmail',
      name: 'Gmail Workspace',
      description: 'Scans brand sponsorship proposals, drafts replies, and matches contracts.',
      logo: '✉️',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      available: true,
      scopes: [
        { label: 'Read email subject lines & senders', write: false },
        { label: 'Draft replies (not auto-sent)', write: false },
        { label: 'No email body storage', write: false },
      ],
      dataStored: 'Sender domains, subject lines, deal flag keywords only',
      lastSync: '12 minutes ago'
    },
    {
      id: 'drive',
      name: 'Google Drive',
      description: 'Syncs editing files, RAW shoots, and thumbnail images for team feedback.',
      logo: '💾',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      available: true,
      scopes: [
        { label: 'Read file names & metadata', write: false },
        { label: 'Read shared folder structure', write: false },
      ],
      dataStored: 'File names, folder paths, shared-with list',
      lastSync: '1 hour ago'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Maintains deadlines, team meetings, upload calendars, and invoicing due dates.',
      logo: '📅',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      available: true,
      scopes: [
        { label: 'Read calendar events', write: false },
        { label: 'Create CreatorOS deadline events', write: true },
      ],
      dataStored: 'Event titles, dates, attendee count (no descriptions)',
      lastSync: '30 minutes ago'
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      description: 'Process international client sponsorships, payouts, and digital invoices.',
      logo: '💳',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      available: true,
      scopes: [
        { label: 'Read payment status', write: false },
        { label: 'Generate invoices (initiated by you)', write: true },
      ],
      dataStored: 'Invoice amounts, payment status, payer name only',
      lastSync: '1 hour ago'
    },
    {
      id: 'instagram',
      name: 'Instagram Business',
      description: 'Syncs Reel insights, engagement, and sponsored posts schedules.',
      logo: '📸',
      color: 'bg-pink-50 text-pink-600 border-pink-100',
      available: true,
      scopes: [
        { label: 'Read post metrics (likes, views, saves)', write: false },
        { label: 'Read follower demographics (aggregated)', write: false },
      ],
      dataStored: 'Aggregated engagement metrics, post captions (not DMs)',
      lastSync: '20 minutes ago'
    },
    {
      id: 'tiktok',
      name: 'TikTok Pro',
      description: 'Retrieve post stats, audience demographics, and creator fund rewards.',
      logo: '🎵',
      color: 'bg-slate-50 text-slate-800 border-slate-200',
      available: false,
      scopes: [],
      dataStored: 'Coming soon',
      lastSync: 'N/A'
    }
  ];

  const handleConnectClick = (app) => {
    if (connectedApps[app.id]) {
      setRevokeModal(app);
      return;
    }
    setAuthModal(app);
  };

  const executeAuth = () => {
    setConnecting(true);
    setTimeout(() => {
      onToggleConnect(authModal.id, true);
      setConnecting(false);
      setAuthModal(null);
      triggerToast(`✅ ${authModal.name} connected — read-only permissions granted.`);
    }, 1500);
  };

  const executeRevoke = () => {
    setRevoking(true);
    setTimeout(() => {
      onToggleConnect(revokeModal.id, false);
      setRevoking(false);
      setRevokeModal(null);
      triggerToast(`🔌 ${revokeModal.name} disconnected. All cached data removed.`);
    }, 1200);
  };

  const executeExport = (format) => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
      triggerToast(`📦 Your data export (${format.toUpperCase()}) is ready. Check your Downloads folder.`);
      setTimeout(() => {
        setExportDone(false);
        setExportModal(false);
      }, 2000);
    }, 2000);
  };

  const connectedCount = Object.values(connectedApps).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fade-in text-left">

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 bg-neutral-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 z-[100] animate-fade-in border border-neutral-800">
          <Sparkles size={13} className="text-purple-400" />
          <span className="font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">App Integrations & Data Control</h1>
          <p className="text-neutral-500 font-medium text-xs mt-1">Connect your platforms. You control exactly what CreatorOS can access — and revoke any time.</p>
        </div>
        <button
          type="button"
          onClick={() => { setExportModal(true); setExportDone(false); }}
          className="px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-bold hover:bg-neutral-50 hover:border-neutral-300 flex items-center gap-2 cursor-pointer shadow-sm shrink-0 transition-all"
        >
          <Download size={13} className="text-purple-600" />
          <span>Export All My Data</span>
        </button>
      </div>

      {/* Trust Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: Lock, title: 'Read-Only by Default', desc: 'Connections are read-only unless you explicitly enable write actions. CreatorOS never posts or emails without your click.', color: 'text-purple-600 bg-purple-50 border-purple-100' },
          { icon: ShieldCheck, title: 'You Own Your Data', desc: 'All data cached by CreatorOS belongs to you. Export a full JSON/CSV anytime, or delete your account and all data is wiped.', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          { icon: Unlock, title: 'Revoke Anytime', desc: 'Each integration has an independent revoke button. Revoking instantly removes all cached data from that source within 60 seconds.', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm flex items-start gap-3">
              <span className={`p-2.5 rounded-xl border shrink-0 ${t.color}`}>
                <Icon size={15} />
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-neutral-900 mb-0.5">{t.title}</h4>
                <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">{t.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connected count bar */}
      <div className="flex items-center gap-3 bg-white border border-neutral-100 rounded-2xl px-5 py-3.5 shadow-sm">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">Integrations Active</span>
            <span className="text-xs font-bold text-neutral-700">{connectedCount} / {apps.filter(a => a.available).length} connected</span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(connectedCount / apps.filter(a => a.available).length) * 100}%` }}
            />
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            OAuth 2.0 Secured
          </span>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((app) => {
          const isConnected = connectedApps[app.id];
          const isExpanded = expandedApp === app.id;
          const writeScopes = app.scopes.filter(s => s.write);

          return (
            <div
              key={app.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm text-left ${
                isConnected ? 'border-emerald-100 hover:border-emerald-200' : 'border-neutral-100 hover:border-neutral-200 hover:shadow-md'
              }`}
            >
              {/* Card top */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl shrink-0 ${app.color}`}>
                      {app.logo}
                    </span>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm leading-snug">{app.name}</h4>
                      <p className="text-[10px] text-neutral-500 font-medium">{app.description}</p>
                    </div>
                  </div>
                  {!app.available ? (
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-neutral-100 text-neutral-500 uppercase tracking-widest border border-neutral-200 shrink-0">
                      Soon
                    </span>
                  ) : isConnected ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                      <CheckCircle size={9} />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-neutral-50 text-neutral-400 uppercase tracking-wider border border-neutral-100 shrink-0">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Permission Scopes — always visible when connected or expanded */}
                {app.available && (isConnected || isExpanded) && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[8px] font-extrabold text-neutral-400 uppercase tracking-widest block">Permission Scopes</span>
                    <div className="space-y-1">
                      {app.scopes.map((scope, si) => (
                        <div key={si} className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${scope.write ? 'bg-amber-50 border border-amber-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                            {scope.write
                              ? <Eye size={7} className="text-amber-600" />
                              : <Eye size={7} className="text-emerald-600" />
                            }
                          </span>
                          <span className="text-[10px] font-medium text-neutral-600 flex-1">{scope.label}</span>
                          <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border ${scope.write ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                            {scope.write ? 'WRITE' : 'READ'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <span className="text-[8px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-0.5">Data Stored</span>
                      <p className="text-[10px] text-neutral-600 font-medium">{app.dataStored}</p>
                    </div>
                    {isConnected && (
                      <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-semibold">
                        <RefreshCw size={9} />
                        <span>Last synced: {app.lastSync}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card footer */}
              {app.available && (
                <div className="px-5 pb-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleConnectClick(app)}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      isConnected
                        ? 'border border-rose-100 text-rose-600 hover:bg-rose-50 bg-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-100'
                    }`}
                  >
                    {isConnected ? 'Revoke Access' : 'Connect Account'}
                  </button>
                  {!isConnected && (
                    <button
                      type="button"
                      onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                      className="p-2 rounded-xl border border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-all cursor-pointer"
                      title="View permission scopes"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Privacy Footer */}
      <div className="bg-neutral-950 rounded-3xl p-6 text-left space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={15} className="text-purple-400" />
          <h3 className="text-xs font-extrabold text-white uppercase tracking-widest">Your Data Rights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: FileJson, title: 'Full data export', desc: 'Download everything CreatorOS holds about you — deals, payments, pipeline cards, team notes — in JSON or CSV.' },
            { icon: Trash2, title: 'Right to deletion', desc: 'Delete your account and all associated data is permanently purged from our servers within 30 days.' },
            { icon: EyeOff, title: 'No training on your data', desc: 'CreatorOS AI features are powered by shared model weights. Your deal data is never used to train AI models.' },
            { icon: Lock, title: 'End-to-end encryption', desc: 'All integration tokens are stored encrypted at rest using AES-256. Token refreshes happen server-side only.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <Icon size={14} className="text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-extrabold text-neutral-200 block">{item.title}</span>
                  <p className="text-[9px] text-neutral-500 font-medium leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OAuth Auth Modal */}
      {authModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <div className="bg-white rounded-3xl border border-neutral-100 w-full max-w-sm p-6 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-100">
              <span className="text-3xl">{authModal.logo}</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-neutral-950 text-sm">Connect {authModal.name} to CreatorOS?</h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed px-2">
                CreatorOS will only request the permissions listed below. You can revoke access anytime.
              </p>
            </div>

            <div className="text-left space-y-1.5 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="text-[8px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-2">Requested Permissions</span>
              {authModal.scopes.map((scope, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${scope.write ? 'bg-amber-50 border border-amber-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                    <Eye size={7} className={scope.write ? 'text-amber-600' : 'text-emerald-600'} />
                  </span>
                  <span className="text-[10px] font-medium text-neutral-600 flex-1">{scope.label}</span>
                  <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border ${scope.write ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                    {scope.write ? 'WRITE' : 'READ'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/50 text-left">
              <ShieldAlert size={14} className="text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-indigo-700 font-medium leading-relaxed">
                OAuth 2.0 sandbox mode. Authorization tokens are stored in encrypted local session only. No data leaves the demo environment.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={connecting}
                onClick={() => setAuthModal(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-neutral-500 border border-neutral-200 hover:bg-neutral-50 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={connecting}
                onClick={executeAuth}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-purple-100 disabled:opacity-50"
              >
                {connecting ? (
                  <><RefreshCw size={12} className="animate-spin" /><span>Authorizing...</span></>
                ) : (
                  <span>Grant Access</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Confirmation Modal */}
      {revokeModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <div className="bg-white rounded-3xl border border-neutral-100 w-full max-w-sm p-6 shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto border border-rose-100">
              <AlertTriangle size={20} className="text-rose-500" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-neutral-950 text-sm">Revoke {revokeModal.name} access?</h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed px-2">
                This will immediately disconnect {revokeModal.name} and permanently remove all cached data from this integration. Your original account data is not affected.
              </p>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-left">
              <Info size={13} className="text-rose-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-rose-700 font-medium">
                Cached: <span className="font-bold">{revokeModal.dataStored}</span> — will be wiped.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={revoking}
                onClick={() => setRevokeModal(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-neutral-500 border border-neutral-200 hover:bg-neutral-50 cursor-pointer disabled:opacity-50"
              >
                Keep Connected
              </button>
              <button
                type="button"
                disabled={revoking}
                onClick={executeRevoke}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md shadow-rose-100"
              >
                {revoking ? (
                  <><RefreshCw size={12} className="animate-spin" /><span>Revoking...</span></>
                ) : (
                  <><Trash2 size={12} /><span>Revoke & Delete</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Export Modal */}
      {exportModal && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-fade-in">
          <div className="bg-white rounded-3xl border border-neutral-100 w-full max-w-sm p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <Download size={18} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Export Your Data</h3>
                <p className="text-[10px] text-neutral-500 font-medium">Full portable export of everything CreatorOS holds</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
              <span className="text-[8px] font-extrabold text-neutral-400 uppercase tracking-widest block">Included in export</span>
              {['Brand deals & contracts', 'Invoices & payment history', 'Content pipeline cards', 'Team member list', 'Calendar events', 'Connected app permissions log', 'AI activity logs'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-neutral-600 font-medium">
                  <CheckCircle size={10} className="text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {!exportDone ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={exporting}
                  onClick={() => executeExport('json')}
                  className="py-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {exporting ? <RefreshCw size={12} className="animate-spin" /> : <FileJson size={14} className="text-purple-600" />}
                  <span>JSON Export</span>
                </button>
                <button
                  type="button"
                  disabled={exporting}
                  onClick={() => executeExport('csv')}
                  className="py-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {exporting ? <RefreshCw size={12} className="animate-spin" /> : <FileText size={14} className="text-indigo-600" />}
                  <span>CSV Export</span>
                </button>
              </div>
            ) : (
              <div className="py-4 text-center space-y-2">
                <CheckCircle size={28} className="text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-emerald-700">Export ready!</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setExportModal(false)}
              className="w-full py-2 rounded-xl text-xs font-bold text-neutral-500 border border-neutral-200 hover:bg-neutral-50 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
