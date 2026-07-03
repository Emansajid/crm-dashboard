export const customers = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah.mitchell@techsol.com', phone: '+1 (555) 234-5612', company: 'Tech Solutions Inc.', status: 'active', value: '$24,500', joined: 'Jan 12, 2024', avatar: 'SM' },
  { id: 2, name: 'Ahmed Khan', email: 'ahmed.khan@globaltech.pk', phone: '+92 300 1234567', company: 'GlobalTech Pakistan', status: 'active', value: '$18,200', joined: 'Feb 03, 2024', avatar: 'AK' },
  { id: 3, name: 'Emily Chen', email: 'emily.chen@brightcorp.com', phone: '+1 (555) 876-2341', company: 'BrightCorp Media', status: 'pending', value: '$9,800', joined: 'Mar 18, 2024', avatar: 'EC' },
  { id: 4, name: 'Michael Rodriguez', email: 'm.rodriguez@apexbuild.com', phone: '+1 (555) 432-9087', company: 'Apex Builders', status: 'inactive', value: '$5,300', joined: 'Apr 22, 2024', avatar: 'MR' },
  { id: 5, name: 'Fatima Noor', email: 'fatima.noor@noorlogistics.pk', phone: '+92 321 9988776', company: 'Noor Logistics', status: 'active', value: '$31,750', joined: 'May 09, 2024', avatar: 'FN' },
  { id: 6, name: 'James Wilson', email: 'james.wilson@wilsonfinance.com', phone: '+1 (555) 765-4321', company: 'Wilson Finance Group', status: 'active', value: '$42,100', joined: 'Jun 14, 2024', avatar: 'JW' },
  { id: 7, name: 'Aisha Malik', email: 'aisha.malik@malikretail.pk', phone: '+92 333 1122334', company: 'Malik Retail Chain', status: 'pending', value: '$12,400', joined: 'Jul 01, 2024', avatar: 'AM' },
  { id: 8, name: 'David Park', email: 'david.park@parktech.com', phone: '+1 (555) 998-1122', company: 'Park Technologies', status: 'active', value: '$27,900', joined: 'Jul 28, 2024', avatar: 'DP' },
  { id: 9, name: 'Linda Thompson', email: 'linda.t@thompsonlaw.com', phone: '+1 (555) 334-5566', company: 'Thompson Law Associates', status: 'inactive', value: '$8,600', joined: 'Aug 15, 2024', avatar: 'LT' },
  { id: 10, name: 'Hassan Raza', email: 'hassan.raza@razaindustries.pk', phone: '+92 345 6677889', company: 'Raza Industries', status: 'active', value: '$36,200', joined: 'Sep 02, 2024', avatar: 'HR' },
  { id: 11, name: 'Sophie Turner', email: 'sophie.turner@turnerdesign.com', phone: '+1 (555) 221-3344', company: 'Turner Design Studio', status: 'active', value: '$15,800', joined: 'Sep 20, 2024', avatar: 'ST' },
  { id: 12, name: 'Bilal Ahmed', email: 'bilal.ahmed@ahmedtraders.pk', phone: '+92 312 4455667', company: 'Ahmed Traders', status: 'pending', value: '$6,900', joined: 'Oct 05, 2024', avatar: 'BA' },
]

export const leads = [
  { id: 1, name: 'Robert Hayes', email: 'robert.hayes@newventure.com', phone: '+1 (555) 112-3344', company: 'New Venture Capital', source: 'Website', status: 'new', score: 82, assignedTo: 'Admin User', created: '2 days ago', avatar: 'RH' },
  { id: 2, name: 'Zainab Sheikh', email: 'zainab.sheikh@sheikhgroup.pk', phone: '+92 301 2233445', company: 'Sheikh Group', source: 'Referral', status: 'contacted', score: 65, assignedTo: 'Admin User', created: '4 days ago', avatar: 'ZS' },
  { id: 3, name: 'Kevin Brooks', email: 'kevin.brooks@brooksmedia.com', phone: '+1 (555) 887-6655', company: 'Brooks Media Group', source: 'LinkedIn', status: 'qualified', score: 91, assignedTo: 'Sarah Lee', created: '1 week ago', avatar: 'KB' },
  { id: 4, name: 'Mariam Yousaf', email: 'mariam.yousaf@yousafco.pk', phone: '+92 333 5566778', company: 'Yousaf & Co.', source: 'Cold Call', status: 'lost', score: 28, assignedTo: 'Admin User', created: '1 week ago', avatar: 'MY' },
  { id: 5, name: 'Tom Sanders', email: 'tom.sanders@sandersretail.com', phone: '+1 (555) 443-2211', company: 'Sanders Retail Co.', source: 'Website', status: 'won', score: 95, assignedTo: 'Sarah Lee', created: '2 weeks ago', avatar: 'TS' },
  { id: 6, name: 'Sana Iqbal', email: 'sana.iqbal@iqbalsolutions.pk', phone: '+92 345 8899001', company: 'Iqbal Solutions', source: 'Referral', status: 'new', score: 54, assignedTo: 'Admin User', created: '3 days ago', avatar: 'SI' },
  { id: 7, name: 'Chris Evans', email: 'chris.evans@evanslogistics.com', phone: '+1 (555) 667-8899', company: 'Evans Logistics', source: 'LinkedIn', status: 'contacted', score: 71, assignedTo: 'Sarah Lee', created: '5 days ago', avatar: 'CE' },
  { id: 8, name: 'Usman Tariq', email: 'usman.tariq@tariqtech.pk', phone: '+92 321 7788990', company: 'Tariq Technologies', source: 'Website', status: 'qualified', score: 88, assignedTo: 'Admin User', created: '6 days ago', avatar: 'UT' },
]

export const employees = [
  { id: 1, name: 'Sarah Lee', avatar: 'SL', role: 'Sales Manager', department: 'Sales', email: 'sarah.lee@nexacrm.com', phone: '+1 (555) 101-2020', status: 'active', tasks: 8, completed: 6, joined: 'Jan 2022', location: 'New York' },
  { id: 2, name: 'James Carter', avatar: 'JC', role: 'Frontend Developer', department: 'Engineering', email: 'james.carter@nexacrm.com', phone: '+1 (555) 202-3030', status: 'active', tasks: 12, completed: 9, joined: 'Mar 2022', location: 'Austin' },
  { id: 3, name: 'Amna Farooq', avatar: 'AF', role: 'HR Specialist', department: 'HR', email: 'amna.farooq@nexacrm.com', phone: '+92 321 5566778', status: 'active', tasks: 5, completed: 5, joined: 'Jun 2022', location: 'Lahore' },
  { id: 4, name: 'David Kim', avatar: 'DK', role: 'Backend Engineer', department: 'Engineering', email: 'david.kim@nexacrm.com', phone: '+1 (555) 303-4040', status: 'active', tasks: 15, completed: 10, joined: 'Aug 2022', location: 'Seattle' },
  { id: 5, name: 'Nadia Hassan', avatar: 'NH', role: 'Marketing Lead', department: 'Marketing', email: 'nadia.hassan@nexacrm.com', phone: '+92 333 6677889', status: 'active', tasks: 7, completed: 4, joined: 'Oct 2022', location: 'Karachi' },
  { id: 6, name: 'Ryan Moore', avatar: 'RM', role: 'Account Executive', department: 'Sales', email: 'ryan.moore@nexacrm.com', phone: '+1 (555) 404-5050', status: 'inactive', tasks: 6, completed: 6, joined: 'Dec 2022', location: 'Chicago' },
  { id: 7, name: 'Zara Ali', avatar: 'ZA', role: 'UI/UX Designer', department: 'Design', email: 'zara.ali@nexacrm.com', phone: '+92 300 7788990', status: 'active', tasks: 9, completed: 7, joined: 'Feb 2023', location: 'Islamabad' },
  { id: 8, name: 'Tom Bailey', avatar: 'TB', role: 'DevOps Engineer', department: 'Engineering', email: 'tom.bailey@nexacrm.com', phone: '+1 (555) 505-6060', status: 'active', tasks: 11, completed: 8, joined: 'Apr 2023', location: 'Denver' },
]

export const tasks = [
  { id: 1, title: 'Follow up with Tech Solutions Inc.', description: 'Send proposal and schedule demo call', priority: 'high', status: 'in-progress', assignedTo: 'Sarah Lee', assignedAvatar: 'SL', dueDate: 'Jul 3, 2026', category: 'Sales', progress: 60 },
  { id: 2, title: 'Prepare quarterly revenue report', description: 'Compile Q2 data and create presentation slides', priority: 'high', status: 'todo', assignedTo: 'Admin User', assignedAvatar: 'AU', dueDate: 'Jul 5, 2026', category: 'Reports', progress: 0 },
  { id: 3, title: 'Update CRM customer database', description: 'Clean duplicates and verify contact info', priority: 'medium', status: 'in-progress', assignedTo: 'James Carter', assignedAvatar: 'JC', dueDate: 'Jul 4, 2026', category: 'Operations', progress: 35 },
  { id: 4, title: 'Interview candidates for Sales role', description: 'Review 5 shortlisted CVs and conduct calls', priority: 'medium', status: 'todo', assignedTo: 'Amna Farooq', assignedAvatar: 'AF', dueDate: 'Jul 7, 2026', category: 'HR', progress: 0 },
  { id: 5, title: 'Design new onboarding email template', description: 'Create HTML email for new customer welcome', priority: 'low', status: 'completed', assignedTo: 'Zara Ali', assignedAvatar: 'ZA', dueDate: 'Jun 28, 2026', category: 'Marketing', progress: 100 },
  { id: 6, title: 'Fix dashboard loading bug', description: 'Revenue chart not rendering on Safari browser', priority: 'high', status: 'in-progress', assignedTo: 'David Kim', assignedAvatar: 'DK', dueDate: 'Jul 2, 2026', category: 'Engineering', progress: 80 },
  { id: 7, title: 'Contract renewal — GlobalTech', description: 'Prepare renewal documents and send for signature', priority: 'high', status: 'overdue', assignedTo: 'Ryan Moore', assignedAvatar: 'RM', dueDate: 'Jun 29, 2026', category: 'Sales', progress: 20 },
  { id: 8, title: 'Social media campaign — July', description: 'Plan and schedule LinkedIn + Instagram posts', priority: 'low', status: 'todo', assignedTo: 'Nadia Hassan', assignedAvatar: 'NH', dueDate: 'Jul 10, 2026', category: 'Marketing', progress: 0 },
  { id: 9, title: 'Server infrastructure audit', description: 'Review cloud costs and optimize resource usage', priority: 'medium', status: 'completed', assignedTo: 'Tom Bailey', assignedAvatar: 'TB', dueDate: 'Jun 27, 2026', category: 'Engineering', progress: 100 },
  { id: 10, title: 'Onboard new employee — Bilal Ahmed', description: 'Setup accounts, orientation, and tools access', priority: 'medium', status: 'todo', assignedTo: 'Amna Farooq', assignedAvatar: 'AF', dueDate: 'Jul 8, 2026', category: 'HR', progress: 0 },
]
export const meetings = [
  { id: 1, title: 'Q3 Sales Review', date: '2026-07-03', time: '10:00 AM', duration: '1h', type: 'internal', attendees: ['Sarah Lee', 'Admin User', 'James Carter'], status: 'upcoming', location: 'Conference Room A' },
  { id: 2, title: 'Client Demo — Tech Solutions', date: '2026-07-03', time: '2:00 PM', duration: '45m', type: 'client', attendees: ['Sarah Lee', 'Ahmed Khan'], status: 'upcoming', location: 'Zoom Call' },
  { id: 3, title: 'HR Onboarding Session', date: '2026-07-04', time: '9:00 AM', duration: '2h', type: 'internal', attendees: ['Amna Farooq', 'Bilal Ahmed'], status: 'upcoming', location: 'HR Office' },
  { id: 4, title: 'Product Roadmap Planning', date: '2026-07-07', time: '11:00 AM', duration: '1.5h', type: 'internal', attendees: ['Admin User', 'Zara Ali', 'David Kim'], status: 'upcoming', location: 'Board Room' },
  { id: 5, title: 'Contract Negotiation — GlobalTech', date: '2026-07-08', time: '3:00 PM', duration: '1h', type: 'client', attendees: ['Ryan Moore', 'Admin User'], status: 'upcoming', location: 'Client Office' },
  { id: 6, title: 'Weekly Team Standup', date: '2026-07-10', time: '9:30 AM', duration: '30m', type: 'internal', attendees: ['All Team'], status: 'upcoming', location: 'Google Meet' },
  { id: 7, title: 'Marketing Campaign Review', date: '2026-07-14', time: '1:00 PM', duration: '1h', type: 'internal', attendees: ['Nadia Hassan', 'Admin User'], status: 'upcoming', location: 'Marketing Office' },
  { id: 8, title: 'Investor Update Call', date: '2026-07-15', time: '4:00 PM', duration: '45m', type: 'client', attendees: ['Admin User'], status: 'upcoming', location: 'Zoom Call' },
]

export const notifications = [
  { id: 1, type: 'meeting', title: 'Meeting starting soon', message: 'Q3 Sales Review starts in 15 minutes', time: '5 min ago', read: false, icon: 'calendar' },
  { id: 2, type: 'task', title: 'Task overdue', message: 'Contract renewal — GlobalTech is 4 days overdue', time: '1 hr ago', read: false, icon: 'alert' },
  { id: 3, type: 'lead', title: 'New lead assigned', message: 'Kevin Brooks (Brooks Media Group) has been assigned to you', time: '2 hrs ago', read: false, icon: 'trending' },
  { id: 4, type: 'customer', title: 'Customer added', message: 'Hassan Raza from Raza Industries was added', time: '3 hrs ago', read: true, icon: 'user' },
  { id: 5, type: 'report', title: 'Monthly report ready', message: 'June 2026 performance report is available for review', time: '5 hrs ago', read: true, icon: 'file' },
  { id: 6, type: 'task', title: 'Task completed', message: 'Server infrastructure audit marked as complete by Tom Bailey', time: '6 hrs ago', read: true, icon: 'check' },
  { id: 7, type: 'meeting', title: 'Meeting rescheduled', message: 'Investor Update Call moved to July 15 at 4:00 PM', time: '1 day ago', read: true, icon: 'calendar' },
  { id: 8, type: 'lead', title: 'Lead status changed', message: 'Tom Sanders (Sanders Retail) converted to Won', time: '1 day ago', read: true, icon: 'trending' },
  { id: 9, type: 'customer', title: 'Contract renewed', message: 'Wilson Finance Group renewed their annual contract', time: '2 days ago', read: true, icon: 'file' },
  { id: 10, type: 'task', title: 'New task assigned', message: 'You have been assigned: Prepare quarterly revenue report', time: '2 days ago', read: true, icon: 'check' },
]