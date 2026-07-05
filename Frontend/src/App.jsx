import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIOperationsAssistant from './components/AIOperationsAssistant';
import BrandDeals from './components/BrandDeals';
import KanbanBoard from './components/KanbanBoard';
import Payments from './components/Payments';
import Team from './components/Team';
import CalendarView from './components/CalendarView';
import AIInsights from './components/AIInsights';
import ConnectApps from './components/ConnectApps';
import FutureScope from './components/FutureScope';
import WhyCreatorOS from './components/WhyCreatorOS';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileKey, setProfileKey] = useState('youtube'); // 'youtube', 'instagram', 'podcast'
  const [isLoading, setIsLoading] = useState(false);

  // Auto-login on app load if credentials are stored
  useEffect(() => {
    const storedProfile = localStorage.getItem('creatorProfile');
    const onboardingDone = localStorage.getItem('onboardingComplete');
    if (storedProfile && onboardingDone === 'true') {
      const parsed = JSON.parse(storedProfile);
      setProfileData(prev => ({ ...prev, profile: { ...prev.profile, ...parsed } }));
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Loading effect when switching tabs (preserve previous logic)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab, profileKey]);

  // Master Data presets for different profiles
  const databasePresets = {
    youtube: {
      profile: {
        name: 'Alex 👋',
        role: 'Tech YouTuber',
        handle: '@alexcreates',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      },
      priorities: [
        { id: 1, text: 'Samsung campaign due tomorrow', completed: false, tag: 'Urgent' },
        { id: 2, text: '₹25,000 pending from Boat', completed: false, tag: 'Payment' },
        { id: 3, text: 'Amit waiting for review on Reel draft', completed: false, tag: 'Team' },
        { id: 4, text: 'Next upload schedule at 7 PM', completed: false, tag: 'Milestone' }
      ],
      brandDeals: [
        { id: 'deal-1', brand: 'Samsung', campaign: 'Galaxy S26 Reel', amount: 35000, deadline: 'Tomorrow', status: 'In Progress', manager: 'Rohan (Manager)' },
        { id: 'deal-2', brand: 'Boat', campaign: 'Audio Integration', amount: 25000, deadline: 'Today', status: 'In Progress', manager: 'Rohan (Manager)' },
        { id: 'deal-3', brand: 'Adobe', campaign: 'Creative Cloud sponsorship', amount: 12000, deadline: 'July 2', status: 'Paid', manager: 'Rohan (Manager)' },
        { id: 'deal-4', brand: 'Intel', campaign: 'Laptops Review Campaign', amount: 50000, deadline: 'July 28', status: 'Review', manager: 'Rohan (Manager)' }
      ],
      projects: [
        { id: 'proj-1', dealId: 'deal-2', title: 'Boat - Audio Integration edit', status: 'Editing', priority: 'Medium', deadline: 'Today', members: ['Amit (Editor)'], progress: 60 },
        { id: 'proj-2', dealId: 'deal-1', title: 'Samsung - Galaxy S26 Reel review', status: 'Review', priority: 'High', deadline: 'Tomorrow', members: ['Amit (Editor)', 'Rohan (Manager)'], progress: 90 },
        { id: 'proj-3', title: 'Productivity Tips script outline', status: 'Script', priority: 'Low', deadline: 'July 25', members: ['Nitin (Script Writer)'], progress: 20 },
        { id: 'proj-4', title: 'Intel laptop benchmarks', status: 'Shoot', priority: 'High', deadline: 'July 12', members: ['Alex (YouTuber)', 'Amit (Editor)'], progress: 40 },
        { id: 'proj-5', title: 'Keyboard unboxing quick review', status: 'Published', priority: 'Low', deadline: 'July 2', members: ['Amit (Editor)'], progress: 100 }
      ],
      payments: [
        { id: 'pay-1', brand: 'Boat', amount: 25000, invoiceNo: 'INV-2026-003', status: 'Overdue', dueDate: 'Today' },
        { id: 'pay-2', brand: 'Samsung', amount: 35000, invoiceNo: 'INV-2026-004', status: 'Pending', dueDate: 'Tomorrow' },
        { id: 'pay-3', brand: 'Adobe', amount: 12000, invoiceNo: 'INV-2026-002', status: 'Paid', dueDate: 'July 2' }
      ],
      teamMembers: [
        { id: 'tm-1', name: 'Amit Kumar', role: 'Editor', status: 'Active', currentTask: 'Cutting Galaxy S26 benchmarks reel', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', progress: 60 },
        { id: 'tm-2', name: 'Rohan Joshi', role: 'Manager', status: 'Active', currentTask: 'Negotiating Intel laptop contract rates', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', progress: 85 },
        { id: 'tm-3', name: 'Sneha Patel', role: 'Thumbnail Designer', status: 'Busy', currentTask: 'Rendering S26 unboxing cover graphic', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', progress: 40 },
        { id: 'tm-4', name: 'Nitin Roy', role: 'Script Writer', status: 'Away', currentTask: 'Drafting productivity tips outline doc', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80', progress: 20 }
      ],
      calendarEvents: [
        { day: 1, title: 'Intel Laptop Shoot', type: 'Shoot' },
        { day: 2, title: 'Adobe Invoice Paid', type: 'Invoice Due' },
        { day: 3, title: 'Samsung Sync Call', type: 'Brand Meeting' },
        { day: 5, title: 'Editing Galaxy Reel', type: 'Editing' },
        { day: 10, title: 'S26 Review Upload', type: 'Upload' },
        { day: 15, title: 'Boat Invoice Due', type: 'Invoice Due' }
      ],
      aiCards: [
        { id: 'card-samsung', type: 'deal', source: 'Gmail Contract Scan', title: 'Samsung campaign deadline tomorrow', description: 'Samsung Exclusivity Clause restricts smartphone sponsorships for 90 days. We suggest requesting a reduction to 30 days.' },
        { id: 'card-boat', type: 'payment', source: 'WhatsApp Auto-ping', title: 'Boat payment ₹25,000 overdue', description: 'Boat accounts representative confirmed invoice received but noted they require the published video URL to release payments.' },
        { id: 'card-editor', type: 'project', source: 'Drive Activity Sync', title: 'Amit uploaded "ZARA Haul" draft', description: 'AI video auditor verified dimensions, audio levels, and length (59s) are optimal. Ready for content creator review.' },
        { id: 'card-time', type: 'insights', source: 'Studio Analytics AI', title: 'Best posting time today is 7:00 PM', description: 'Historical subscriber engagement patterns show a 24% uplift in watch time when uploads launch at 7:00 PM vs 5:00 PM.' }
      ]
    },
    instagram: {
      profile: {
        name: 'Priya ✨',
        role: 'Fashion & Style Creator',
        handle: '@priyastyles',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      },
      priorities: [
        { id: 1, text: 'Nykaa haul review due tonight', completed: false, tag: 'Urgent' },
        { id: 2, text: 'Confirm stylist invoice payout', completed: false, tag: 'Payment' },
        { id: 3, text: 'Pooja waiting for shoot location ping', completed: false, tag: 'Team' },
        { id: 4, text: 'Publish H&M summer lookbook Reel', completed: false, tag: 'Milestone' }
      ],
      brandDeals: [
        { id: 'deal-1', brand: 'Nykaa', campaign: 'Beauty Haul Reel', amount: 20000, deadline: 'Today', status: 'In Progress', manager: 'Karan (Manager)' },
        { id: 'deal-2', brand: 'H&M', campaign: 'Summer Lookbook Post', amount: 18000, deadline: 'Tomorrow', status: 'In Progress', manager: 'Karan (Manager)' },
        { id: 'deal-3', brand: 'Sugar Cosmetics', campaign: 'Lipstick Launch promo', amount: 15000, deadline: 'June 28', status: 'Paid', manager: 'Karan (Manager)' },
        { id: 'deal-4', brand: 'ZARA', campaign: 'Winter Jackets Preview', amount: 45000, deadline: 'July 25', status: 'Draft', manager: 'Karan (Manager)' }
      ],
      projects: [
        { id: 'proj-1', title: 'ZARA Collection fitting', status: 'Shoot', priority: 'Medium', deadline: 'July 15', members: ['Tanya (Stylist)'], progress: 30 },
        { id: 'proj-2', dealId: 'deal-1', title: 'Nykaa - haul transitions edit', status: 'Review', priority: 'High', deadline: 'Today', members: ['Raj (Editor)', 'Pooja (Photographer)'], progress: 95 },
        { id: 'proj-3', dealId: 'deal-2', title: 'H&M - Summer reels publish draft', status: 'Editing', priority: 'Low', deadline: 'Tomorrow', members: ['Raj (Editor)'], progress: 75 }
      ],
      payments: [
        { id: 'pay-1', brand: 'Nykaa', amount: 20000, invoiceNo: 'INV-2026-081', status: 'Pending', dueDate: 'Today' },
        { id: 'pay-2', brand: 'H&M', amount: 18000, invoiceNo: 'INV-2026-082', status: 'Pending', dueDate: 'Tomorrow' },
        { id: 'pay-3', brand: 'Sugar Cosmetics', amount: 15000, invoiceNo: 'INV-2026-079', status: 'Paid', dueDate: 'June 28' }
      ],
      teamMembers: [
        { id: 'tm-1', name: 'Raj Malhotra', role: 'Editor', status: 'Busy', currentTask: 'Adding custom transitions to H&M draft', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', progress: 75 },
        { id: 'tm-2', name: 'Karan Singhania', role: 'Manager', status: 'Active', currentTask: 'Negotiating ZARA winter brand rates', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80', progress: 90 },
        { id: 'tm-3', name: 'Tanya Sen', role: 'Stylist', status: 'Active', currentTask: 'Arranging look sets for ZARA campaign', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', progress: 50 },
        { id: 'tm-4', name: 'Pooja Hegde', role: 'Photographer', status: 'Away', currentTask: 'Setting studio lighting schedules', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', progress: 10 }
      ],
      calendarEvents: [
        { day: 1, title: 'Nykaa Haul Shoot', type: 'Shoot' },
        { day: 2, title: 'Sugar Invoice Paid', type: 'Invoice Due' },
        { day: 3, title: 'H&M Lookbook Meeting', type: 'Brand Meeting' },
        { day: 4, title: 'Publish Nykaa Reel', type: 'Upload' }
      ],
      aiCards: [
        { id: 'card-samsung', type: 'deal', source: 'Gmail Contract Scan', title: 'H&M lookbook review due today', description: 'Review required on campaign deliverables before H&M scheduling contract goes active.' },
        { id: 'card-boat', type: 'payment', source: 'WhatsApp Auto-ping', title: 'Sugar payment verified', description: 'Sugar Cosmetics cleared sponsorship read payout of ₹15,000. CreatorOS has auto-recorded the payment.' },
        { id: 'card-editor', type: 'project', source: 'Drive Activity Sync', title: 'Raj uploaded Reels Draft', description: 'Transitions align with background audio margins. Recommended review before direct upload.' }
      ]
    },
    podcast: {
      profile: {
        name: 'Rahul 🎙️',
        role: 'Business & Finance Podcaster',
        handle: '@rahultalksmoney',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      },
      priorities: [
        { id: 1, text: 'Upload Spotify Episode #89', completed: false, tag: 'Urgent' },
        { id: 2, text: '₹22,000 payment due from Hostinger', completed: false, tag: 'Payment' },
        { id: 3, text: 'Vicky waiting for sound mix approval', completed: false, tag: 'Team' },
        { id: 4, text: 'Confirm guests booking for next Monday', completed: false, tag: 'Milestone' }
      ],
      brandDeals: [
        { id: 'deal-1', brand: 'CoinSwitch', campaign: 'Sponsor Read readouts', amount: 40000, deadline: 'Tomorrow', status: 'In Progress', manager: 'Dev (Manager)' },
        { id: 'deal-2', brand: 'Hostinger', campaign: 'Hosting integration', amount: 22000, deadline: 'Today', status: 'In Progress', manager: 'Dev (Manager)' },
        { id: 'deal-3', brand: 'Groww App', campaign: 'Mutual funds awareness read', amount: 50000, deadline: 'June 30', status: 'Paid', manager: 'Dev (Manager)' }
      ],
      projects: [
        { id: 'proj-1', dealId: 'deal-2', title: 'Hostinger - Episode #89 sound mixing', status: 'Editing', priority: 'High', deadline: 'Today', members: ['Vicky (Audio Engineer)'], progress: 85 },
        { id: 'proj-2', dealId: 'deal-1', title: 'CoinSwitch sponsor script draft', status: 'Script', priority: 'Medium', deadline: 'Tomorrow', members: ['Vikram (Researcher)'], progress: 50 },
        { id: 'proj-3', title: 'Aggregated Episode analytics report', status: 'Published', priority: 'Low', deadline: 'June 30', members: ['Dev (Manager)'], progress: 100 }
      ],
      payments: [
        { id: 'pay-1', brand: 'Hostinger', amount: 22000, invoiceNo: 'INV-2026-101', status: 'Overdue', dueDate: 'Today' },
        { id: 'pay-2', brand: 'CoinSwitch', amount: 40000, invoiceNo: 'INV-2026-102', status: 'Pending', dueDate: 'Tomorrow' },
        { id: 'pay-3', brand: 'Groww App', amount: 50000, invoiceNo: 'INV-2026-099', status: 'Paid', dueDate: 'June 30' }
      ],
      teamMembers: [
        { id: 'tm-1', name: 'Vicky Kaushal', role: 'Audio Engineer', status: 'Active', currentTask: 'Adding sound compression to Episode 89 mix', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', progress: 85 },
        { id: 'tm-2', name: 'Dev Anand', role: 'Manager', status: 'Active', currentTask: 'Booking sound proofing slots', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', progress: 95 },
        { id: 'tm-3', name: 'Meera Rajput', role: 'Social Media Manager', status: 'Busy', currentTask: 'Drafting LinkedIn threads for Groww Ep', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', progress: 40 },
        { id: 'tm-4', name: 'Vikram Seth', role: 'Researcher', status: 'Away', currentTask: 'Fact checking inflation details', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80', progress: 50 }
      ],
      calendarEvents: [
        { day: 1, title: 'Crypto Episode Mix', type: 'Shoot' },
        { day: 2, title: 'Groww Sponsor Paid', type: 'Invoice Due' },
        { day: 3, title: 'Hostinger Sponsorship Sync', type: 'Brand Meeting' }
      ],
      aiCards: [
        { id: 'card-samsung', type: 'deal', source: 'Gmail Contract Scan', title: 'CoinSwitch script review due tomorrow', description: 'Script read draft flags terms. We recommend updating rates matching index.' },
        { id: 'card-boat', type: 'payment', source: 'WhatsApp Auto-ping', title: 'Hostinger payment ₹22,000 overdue', description: 'Hostinger confirmed that their payout cycles run weekly on Saturdays.' }
      ]
    }
  };

  // State loaded based on active profile
  const [profileData, setProfileData] = useState(databasePresets.youtube);
  const [activeRole, setActiveRole] = useState('Owner'); // 'Owner', 'Manager', 'Editor', 'Designer', 'Writer'
  const [teamActivities, setTeamActivities] = useState([
    { id: 1, user: 'Amit Kumar', role: 'Editor', action: 'updated progress to 65%', target: 'Boat Audio Integration edit', time: '12m ago', type: 'project' },
    { id: 2, user: 'Rohan Joshi', role: 'Manager', action: 'negotiated contract amount', target: 'Samsung deal', time: '1h ago', type: 'deal' },
    { id: 3, user: 'Alex', role: 'Owner', action: 'moved project to Review', target: 'Galaxy S26 Review', time: '3h ago', type: 'project' }
  ]);

  const logTeamActivity = (user, role, action, target, type) => {
    setTeamActivities(prev => [
      {
        id: Date.now(),
        user,
        role,
        action,
        target,
        time: 'Just now',
        type
      },
      ...prev
    ]);
  };

  // Redirect restricted views when role changes
  useEffect(() => {
    const restrictedTabs = ['brand-deals', 'payments', 'ai-assistant', 'ai-insights'];
    if (restrictedTabs.includes(activeTab) && activeRole !== 'Owner' && activeRole !== 'Manager') {
      setActiveTab('dashboard');
    }
  }, [activeRole, activeTab]);

  // App connection toggling
  const [connectedApps, setConnectedApps] = useState({
    youtube: true,
    whatsapp: false,
    gmail: true,
    drive: true,
    calendar: true,
    stripe: false,
    instagram: false
  });

  const handleLogin = (selectedProfile, onboardingData = {}) => {
    setProfileKey(selectedProfile);
    const preset = databasePresets[selectedProfile];
    // Map onboarding fields to profile structure
    const mergedProfile = {
      ...preset.profile,
      name: onboardingData.name || preset.profile.name,
      // Use onboarding 'type' as role if provided
      role: onboardingData.type || preset.profile.role,
      // Optionally store platform, audience, goal in separate keys on profile
      platform: onboardingData.platform || undefined,
      audienceSize: onboardingData.audience || undefined,
      goal: onboardingData.goal || undefined,
    };
    setProfileData({ ...preset, profile: mergedProfile });
    localStorage.setItem('creatorProfile', JSON.stringify(mergedProfile));
    localStorage.setItem('onboardingComplete', 'true');
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSwitchProfile = (key) => {
    setProfileKey(key);
    setProfileData(databasePresets[key]);
    setActiveTab('dashboard');
  };

  const handleJumpToDeal = (dealId) => {
    setActiveTab('brand-deals');
    localStorage.setItem('creatoros_highlight_deal', dealId);
  };

  // Priority Checklist Handler
  const handleTogglePriority = (id) => {
    setProfileData(prev => ({
      ...prev,
      priorities: prev.priorities.map(p => p.id === id ? { ...p, completed: !p.completed } : p)
    }));
  };

  // Brand Deals Handlers
  const handleAddDeal = (deal) => {
    const newId = `deal-${Date.now()}`;
    const newDeal = {
      ...deal,
      id: newId
    };
    
    setProfileData(prev => {
      let updatedProjects = prev.projects;
      if (deal.status === 'In Progress' || deal.status === 'Signed') {
        const newProject = {
          id: `proj-${Date.now()}`,
          dealId: newId,
          title: `${deal.brand} - ${deal.campaign}`,
          status: 'Ideas',
          priority: 'Medium',
          deadline: deal.deadline,
          members: [prev.teamMembers[0]?.name || 'Amit Kumar'],
          progress: 0
        };
        updatedProjects = [newProject, ...prev.projects];
      }
      
      return {
        ...prev,
        brandDeals: [newDeal, ...prev.brandDeals],
        projects: updatedProjects
      };
    });

    logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, 'logged sponsorship deal', deal.brand, 'deal');
  };

  const handleUpdateDealStatus = (id, status, amount, deadline) => {
    const deal = profileData.brandDeals.find(d => d.id === id);

    setProfileData(prev => {
      const dealItem = prev.brandDeals.find(d => d.id === id);
      if (!dealItem) return prev;

      const updatedDeals = prev.brandDeals.map(d => d.id === id ? { 
        ...d, 
        status, 
        amount: amount !== undefined ? amount : d.amount, 
        deadline: deadline !== undefined ? deadline : d.deadline 
      } : d);

      const projectExists = prev.projects.some(p => p.dealId === id);
      let updatedProjects = prev.projects;

      if ((status === 'In Progress' || status === 'Signed') && !projectExists) {
        const newProject = {
          id: `proj-${Date.now()}`,
          dealId: id,
          title: `${dealItem.brand} - ${dealItem.campaign}`,
          status: 'Ideas',
          priority: 'Medium',
          deadline: deadline || dealItem.deadline,
          members: [prev.teamMembers[0]?.name || 'Amit Kumar'],
          progress: 0
        };
        updatedProjects = [newProject, ...prev.projects];
      }

      return {
        ...prev,
        brandDeals: updatedDeals,
        projects: updatedProjects
      };
    });

    if (deal) {
      logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, `updated sponsorship status to "${status}"`, deal.brand, 'deal');
    }
  };

  const handleDeleteDeal = (id) => {
    const deal = profileData.brandDeals.find(d => d.id === id);
    setProfileData(prev => ({
      ...prev,
      brandDeals: prev.brandDeals.filter(d => d.id !== id),
      projects: prev.projects.filter(p => p.dealId !== id) // Cascade deletion
    }));

    if (deal) {
      logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, 'removed sponsorship deal', deal.brand, 'deal');
    }
  };

  // Kanban Handlers
  const handleAddProject = (project) => {
    const newProj = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProfileData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));

    logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, 'added a new deliverable card', project.title, 'project');
  };

  const handleMoveProject = (id, newCol) => {
    const project = profileData.projects.find(p => p.id === id);
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { 
        ...p, 
        status: newCol,
        progress: newCol === 'Published' ? 100 : newCol === 'Review' ? 90 : newCol === 'Editing' ? 65 : newCol === 'Shoot' ? 35 : newCol === 'Script' ? 15 : p.progress 
      } : p)
    }));

    if (project) {
      logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, `moved content phase to "${newCol}"`, project.title, 'project');
    }
  };

  const handleUpdateProjectProgress = (id, progress) => {
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, progress } : p)
    }));
  };

  const handleUpdateProjectMembers = (id, members) => {
    const project = profileData.projects.find(p => p.id === id);
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, members } : p)
    }));

    if (project) {
      logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, `assigned content card to ${members[0]}`, project.title, 'project');
    }
  };

  const handleUpdateProjectDeadline = (id, deadline) => {
    const project = profileData.projects.find(p => p.id === id);
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, deadline } : p)
    }));

    if (project) {
      logTeamActivity(profileData.profile.name.split(' ')[0], activeRole, `updated content deadline to "${deadline}"`, project.title, 'project');
    }
  };

  // Payments Handlers
  const handleAddPayment = (pay) => {
    const newPay = {
      ...pay,
      id: `pay-${Date.now()}`
    };
    setProfileData(prev => ({
      ...prev,
      payments: [newPay, ...prev.payments]
    }));
  };

  const handleMarkPaid = (id) => {
    setProfileData(prev => ({
      ...prev,
      payments: prev.payments.map(p => p.id === id ? { ...p, status: 'Paid' } : p)
    }));
  };

  const handleDeletePayment = (id) => {
    setProfileData(prev => ({
      ...prev,
      payments: prev.payments.filter(p => p.id !== id)
    }));
  };

  // Team Handlers
  const handleUpdateTeamMember = (id, updates) => {
    setProfileData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(tm => tm.id === id ? { ...tm, ...updates } : tm)
    }));
  };

  // Calendar Handlers
  const handleAddEvent = (evt) => {
    const newEvt = {
      ...evt,
      id: `evt-${Date.now()}`
    };
    setProfileData(prev => ({
      ...prev,
      calendarEvents: [...prev.calendarEvents, newEvt]
    }));
  };

  // AI Assistant Card actions
  const handleDismissCard = (id) => {
    setProfileData(prev => ({
      ...prev,
      aiCards: prev.aiCards.filter(c => c.id !== id)
    }));
  };

  const handleScanNewActivities = () => {
    // Inject a new card simulating scanned activities
    const randomScanCard = {
      id: `card-scan-${Date.now()}`,
      type: 'deal',
      source: 'Gmail Spam Folder Scanner',
      title: 'New proposal found: Myntra Autumn Lookbook',
      description: 'ZARA rep contacted you offering ₹30,000 sponsorship read. AI extracted contract draft templates for click-replying.'
    };

    setProfileData(prev => {
      // Avoid duplicate insert of same scan card
      if (prev.aiCards.find(c => c.id.includes('scan'))) return prev;
      return {
        ...prev,
        aiCards: [randomScanCard, ...prev.aiCards]
      };
    });
  };

  const handleToggleConnect = (appId, val) => {
    setConnectedApps(prev => ({
      ...prev,
      [appId]: val
    }));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Active user details
  const activeUserProfile = profileData.profile;

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf9fc]">
      
      {/* Sidebar Layout */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={activeUserProfile}
        onLogout={handleLogout}
        onSwitchProfile={handleSwitchProfile}
        aiCardsCount={profileData.aiCards.length}
        pendingPrioritiesCount={profileData.priorities.filter(p => !p.completed).length}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-y-auto p-8 relative flex flex-col justify-between">
        
        {/* Navigation Tab routing render */}
        <div className="flex-1 max-w-6xl mx-auto w-full pb-12">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  userProfile={activeUserProfile}
                  priorities={profileData.priorities}
                  onTogglePriority={handleTogglePriority}
                  brandDeals={profileData.brandDeals}
                  projects={profileData.projects}
                  payments={profileData.payments}
                  setActiveTab={setActiveTab}
                  activeRole={activeRole}
                  teamActivities={teamActivities}
                />
              )}

              {activeTab === 'ai-assistant' && (
                <AIOperationsAssistant
                  cards={profileData.aiCards}
                  onDismissCard={handleDismissCard}
                  setActiveTab={setActiveTab}
                  onScanNewActivities={handleScanNewActivities}
                  onAddDeal={handleAddDeal}
                />
              )}

              {activeTab === 'brand-deals' && (
                <BrandDeals
                  brandDeals={profileData.brandDeals}
                  projects={profileData.projects}
                  onAddDeal={handleAddDeal}
                  onUpdateDealStatus={handleUpdateDealStatus}
                  onDeleteDeal={handleDeleteDeal}
                />
              )}

              {activeTab === 'projects' && (
                <KanbanBoard
                  projects={profileData.projects}
                  onAddProject={handleAddProject}
                  onMoveProject={handleMoveProject}
                  onUpdateProjectProgress={handleUpdateProjectProgress}
                  onUpdateProjectMembers={handleUpdateProjectMembers}
                  onUpdateProjectDeadline={handleUpdateProjectDeadline}
                  onJumpToDeal={handleJumpToDeal}
                />
              )}

              {activeTab === 'payments' && (
                <Payments
                  payments={profileData.payments}
                  onAddPayment={handleAddPayment}
                  onMarkPaid={handleMarkPaid}
                  onDeletePayment={handleDeletePayment}
                />
              )}

              {activeTab === 'team' && (
                <Team
                  teamMembers={profileData.teamMembers}
                  onUpdateTeamMember={handleUpdateTeamMember}
                  activeRole={activeRole}
                  setActiveRole={setActiveRole}
                />
              )}

              {activeTab === 'calendar' && (
                <CalendarView
                  events={profileData.calendarEvents}
                  onAddEvent={handleAddEvent}
                />
              )}

              {activeTab === 'ai-insights' && (
                <AIInsights
                  userProfile={activeUserProfile}
                  brandDeals={profileData.brandDeals}
                  payments={profileData.payments}
                />
              )}

              {activeTab === 'connect-apps' && (
                <ConnectApps
                  connectedApps={connectedApps}
                  onToggleConnect={handleToggleConnect}
                />
              )}

              {activeTab === 'future-scope' && (
                <FutureScope />
              )}

              {activeTab === 'why-creatoros' && (
                <WhyCreatorOS setActiveTab={setActiveTab} />
              )}
            </>
          )}
        </div>

        {/* Footer Hackathon Branding */}
        <footer className="text-center text-[10px] text-neutral-400 font-medium py-3 border-t border-neutral-100 max-w-6xl mx-auto w-full shrink-0">
          <span>CreatorOS MVP Prototype for Hackathon Judges • Designed with Tailwind CSS & React</span>
        </footer>

      </main>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse p-2 text-left">
      <div className="space-y-2">
        <div className="h-8 bg-neutral-200 rounded-lg w-1/4"></div>
        <div className="h-4 bg-neutral-100 rounded-lg w-2/5"></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-36 bg-neutral-100 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="w-10 h-10 bg-neutral-200 rounded-xl"></div>
            <div className="space-y-1.5">
              <div className="h-3 bg-neutral-200 rounded-sm w-2/3"></div>
              <div className="h-6 bg-neutral-200 rounded-md w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="h-64 bg-neutral-100 rounded-3xl p-6 space-y-4">
          <div className="h-6 bg-neutral-200 rounded-md w-1/3"></div>
          <div className="h-1 bg-neutral-150 w-full"></div>
          <div className="space-y-2.5">
            <div className="h-10 bg-neutral-50 rounded-xl"></div>
            <div className="h-10 bg-neutral-50 rounded-xl"></div>
            <div className="h-10 bg-neutral-50 rounded-xl"></div>
          </div>
        </div>
        <div className="h-64 bg-neutral-100 rounded-3xl p-6 space-y-4">
          <div className="h-6 bg-neutral-200 rounded-md w-1/3"></div>
          <div className="h-1 bg-neutral-150 w-full"></div>
          <div className="space-y-2.5">
            <div className="h-10 bg-neutral-50 rounded-xl"></div>
            <div className="h-10 bg-neutral-50 rounded-xl"></div>
            <div className="h-10 bg-neutral-50 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
