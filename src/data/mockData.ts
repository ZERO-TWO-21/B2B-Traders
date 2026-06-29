export const kpiData = [
  { id: 'revenue', label: 'Total Revenue', value: '$2.84M', change: 14.5, changeType: 'increase' as const, icon: 'DollarSign', color: 'primary' as const, sparklineData: [42,48,45,52,58,55,62,68,65,72,78,84], comparison: '+$352K vs last month' },
  { id: 'mrr', label: 'Monthly Recurring Revenue', value: '$486K', change: 8.2, changeType: 'increase' as const, icon: 'TrendingUp', color: 'success' as const, sparklineData: [38,42,40,45,48,46,51,54,52,58,62,64], comparison: '+$37K vs last month' },
  { id: 'customers', label: 'Active Customers', value: '12,847', change: 5.3, changeType: 'increase' as const, icon: 'Users', color: 'secondary' as const, sparklineData: [80,82,85,83,87,89,88,91,93,94,96,98], comparison: '+645 vs last month' },
  { id: 'leads', label: 'New Leads', value: '3,291', change: 12.1, changeType: 'increase' as const, icon: 'UserPlus', color: 'primary' as const, sparklineData: [28,32,30,35,38,36,40,42,45,48,46,50], comparison: '+356 vs last month' },
  { id: 'conversion', label: 'Conversion Rate', value: '24.6%', change: 1.8, changeType: 'increase' as const, icon: 'Target', color: 'success' as const, sparklineData: [18,20,19,21,22,21,23,24,23,25,24,25], comparison: '+1.8pp vs last month' },
  { id: 'churn', label: 'Churn Rate', value: '2.1%', change: 0.3, changeType: 'decrease' as const, icon: 'UserMinus', color: 'danger' as const, sparklineData: [3.2,3.0,2.8,2.9,2.7,2.6,2.5,2.4,2.3,2.2,2.1,2.1], comparison: '-0.3pp vs last month' },
  { id: 'profit', label: 'Net Profit', value: '$892K', change: 18.4, changeType: 'increase' as const, icon: 'BarChart2', color: 'success' as const, sparklineData: [52,55,54,58,62,60,65,68,70,74,78,82], comparison: '+$138K vs last month' },
  { id: 'csat', label: 'Customer Satisfaction', value: '94.2%', change: 2.1, changeType: 'increase' as const, icon: 'Star', color: 'warning' as const, sparklineData: [88,89,90,89,91,92,91,93,92,94,93,94], comparison: '+2.1pp vs last month' },
]

export const revenueData = [
  { label:'Jan', value:2100000, value2:1650000 }, { label:'Feb', value:2280000, value2:1720000 },
  { label:'Mar', value:2150000, value2:1680000 }, { label:'Apr', value:2490000, value2:1890000 },
  { label:'May', value:2620000, value2:1950000 }, { label:'Jun', value:2440000, value2:1820000 },
  { label:'Jul', value:2710000, value2:2050000 }, { label:'Aug', value:2850000, value2:2180000 },
  { label:'Sep', value:2720000, value2:2080000 }, { label:'Oct', value:2940000, value2:2250000 },
  { label:'Nov', value:2840000, value2:2180000 }, { label:'Dec', value:3120000, value2:2380000 },
]

export const salesData = [
  { label:'Jan', value:480, value2:320 }, { label:'Feb', value:520, value2:380 },
  { label:'Mar', value:490, value2:350 }, { label:'Apr', value:580, value2:420 },
  { label:'May', value:610, value2:450 }, { label:'Jun', value:560, value2:400 },
  { label:'Jul', value:640, value2:480 }, { label:'Aug', value:680, value2:510 },
  { label:'Sep', value:650, value2:490 }, { label:'Oct', value:720, value2:540 },
  { label:'Nov', value:690, value2:520 }, { label:'Dec', value:760, value2:580 },
]

export const growthData = [
  { label:'Jan', value:5.2 }, { label:'Feb', value:8.5 }, { label:'Mar', value:6.8 },
  { label:'Apr', value:11.2 }, { label:'May', value:9.8 }, { label:'Jun', value:13.5 },
  { label:'Jul', value:12.1 }, { label:'Aug', value:15.4 }, { label:'Sep', value:14.2 },
  { label:'Oct', value:16.8 }, { label:'Nov', value:18.2 }, { label:'Dec', value:20.5 },
]

export const cashFlowData = [
  { label:'Jan', value:380000, value2:240000 }, { label:'Feb', value:420000, value2:280000 },
  { label:'Mar', value:395000, value2:260000 }, { label:'Apr', value:460000, value2:300000 },
  { label:'May', value:490000, value2:320000 }, { label:'Jun', value:445000, value2:295000 },
  { label:'Jul', value:510000, value2:340000 }, { label:'Aug', value:535000, value2:355000 },
  { label:'Sep', value:520000, value2:345000 }, { label:'Oct', value:560000, value2:370000 },
  { label:'Nov', value:540000, value2:360000 }, { label:'Dec', value:590000, value2:385000 },
]

export const productRevenueData = [
  { name:'Enterprise Plan', value:42, color:'#3b82f6' },
  { name:'Professional Plan', value:31, color:'#6366f1' },
  { name:'Starter Plan', value:15, color:'#22c55e' },
  { name:'Add-ons', value:8, color:'#f97316' },
  { name:'Services', value:4, color:'#64748b' },
]

export const trafficSourceData = [
  { label:'Organic Search', value:38, color:'bg-primary-500' },
  { label:'Direct', value:24, color:'bg-secondary-500' },
  { label:'Referral', value:18, color:'bg-success-500' },
  { label:'Social Media', value:12, color:'bg-warning-500' },
  { label:'Email', value:8, color:'bg-danger-500' },
]

export const funnelData = [
  { label:'Website Visits', value:45820, percentage:100 },
  { label:'Sign-ups', value:12940, percentage:28.2 },
  { label:'Qualified Leads', value:6480, percentage:14.1 },
  { label:'Demos Scheduled', value:2840, percentage:6.2 },
  { label:'Proposals Sent', value:1520, percentage:3.3 },
  { label:'Closed Won', value:798, percentage:1.7 },
]

export const aiInsights = [
  { id:'1', type:'prediction', title:'Revenue Forecast', description:'Q1 2024 revenue projected to reach $3.2M — 12.7% above target.', confidence:87, color:'success' },
  { id:'2', type:'churn', title:'Churn Risk Alert', description:'3 enterprise accounts show high churn signals. Immediate outreach recommended.', confidence:82, color:'danger' },
  { id:'3', type:'opportunity', title:'Upsell Opportunity', description:'12 Professional accounts match Enterprise usage patterns. Est. $48K ARR expansion.', confidence:74, color:'warning' },
  { id:'4', type:'action', title:'Optimize Pricing', description:'API Add-on is underpriced vs. market. +15% price could add $62K ARR.', confidence:69, color:'primary' },
]

export const customersData = [
  { id:'1', name:'Sarah Chen', email:'sarah.chen@techcorp.io', company:'TechCorp Inc', status:'active', mrr:4800, healthScore:92, lastActivity:'2 hours ago', joinDate:'2023-03-15', plan:'Enterprise', location:'San Francisco, CA', segment:'Enterprise' },
  { id:'2', name:'Marcus Williams', email:'marcus@growthco.com', company:'GrowthCo', status:'active', mrr:2400, healthScore:78, lastActivity:'1 day ago', joinDate:'2023-06-22', plan:'Professional', location:'Austin, TX', segment:'Mid-Market' },
  { id:'3', name:'Elena Rossi', email:'elena.rossi@nexuslab.eu', company:'NexusLab', status:'at-risk', mrr:1200, healthScore:45, lastActivity:'8 days ago', joinDate:'2023-01-10', plan:'Professional', location:'Milan, Italy', segment:'SMB' },
  { id:'4', name:'James Park', email:'jpark@innovate.ai', company:'Innovate.AI', status:'active', mrr:9600, healthScore:97, lastActivity:'30 min ago', joinDate:'2022-11-05', plan:'Enterprise', location:'Seoul, Korea', segment:'Enterprise' },
  { id:'5', name:'Amanda Foster', email:'amanda@startuphq.co', company:'StartupHQ', status:'trial', mrr:0, healthScore:62, lastActivity:'3 hours ago', joinDate:'2024-01-02', plan:'Trial', location:'London, UK', segment:'SMB' },
  { id:'6', name:'David Martinez', email:'d.martinez@cloudbase.net', company:'CloudBase', status:'active', mrr:3600, healthScore:88, lastActivity:'5 hours ago', joinDate:'2023-08-18', plan:'Professional', location:'Miami, FL', segment:'Mid-Market' },
  { id:'7', name:'Priya Sharma', email:'priya.s@dataflow.in', company:'DataFlow India', status:'churned', mrr:0, healthScore:20, lastActivity:'32 days ago', joinDate:'2022-05-14', plan:'Starter', location:'Bangalore, India', segment:'SMB' },
  { id:'8', name:'Liam Thompson', email:'liam@vertexsystems.ca', company:'Vertex Systems', status:'active', mrr:7200, healthScore:91, lastActivity:'1 hour ago', joinDate:'2022-09-28', plan:'Enterprise', location:'Toronto, Canada', segment:'Enterprise' },
]

export const ordersData = [
  { id:'1', orderNumber:'ORD-2024-8841', customer:'TechCorp Inc', customerEmail:'billing@techcorp.io', status:'delivered', total:4800, items:3, date:'2024-01-15', paymentStatus:'paid', fulfillmentStatus:'fulfilled' },
  { id:'2', orderNumber:'ORD-2024-8840', customer:'GrowthCo', customerEmail:'ops@growthco.com', status:'shipped', total:2400, items:2, date:'2024-01-15', paymentStatus:'paid', fulfillmentStatus:'partial' },
  { id:'3', orderNumber:'ORD-2024-8839', customer:'Innovate.AI', customerEmail:'finance@innovate.ai', status:'processing', total:9600, items:5, date:'2024-01-14', paymentStatus:'paid', fulfillmentStatus:'unfulfilled' },
  { id:'4', orderNumber:'ORD-2024-8838', customer:'NexusLab', customerEmail:'admin@nexuslab.eu', status:'pending', total:1200, items:1, date:'2024-01-14', paymentStatus:'pending', fulfillmentStatus:'unfulfilled' },
  { id:'5', orderNumber:'ORD-2024-8837', customer:'CloudBase', customerEmail:'billing@cloudbase.net', status:'delivered', total:3600, items:4, date:'2024-01-13', paymentStatus:'paid', fulfillmentStatus:'fulfilled' },
  { id:'6', orderNumber:'ORD-2024-8836', customer:'Vertex Systems', customerEmail:'accounts@vertexsystems.ca', status:'cancelled', total:7200, items:6, date:'2024-01-13', paymentStatus:'refunded', fulfillmentStatus:'unfulfilled' },
  { id:'7', orderNumber:'ORD-2024-8835', customer:'DataFlow India', customerEmail:'billing@dataflow.in', status:'delivered', total:1800, items:2, date:'2024-01-12', paymentStatus:'paid', fulfillmentStatus:'fulfilled' },
  { id:'8', orderNumber:'ORD-2024-8834', customer:'StartupHQ', customerEmail:'founder@startuphq.co', status:'shipped', total:480, items:1, date:'2024-01-12', paymentStatus:'paid', fulfillmentStatus:'partial' },
]

export const productsData = [
  { id:'1', name:'Enterprise Suite', sku:'ENT-001', category:'Software', price:9600, stock:999, reorderPoint:0, sold:142, status:'in-stock' },
  { id:'2', name:'Professional Plan', sku:'PRO-001', category:'Software', price:2400, stock:999, reorderPoint:0, sold:428, status:'in-stock' },
  { id:'3', name:'API Access Pack', sku:'API-001', category:'Add-on', price:480, stock:23, reorderPoint:50, sold:892, status:'low-stock' },
  { id:'4', name:'Analytics Module', sku:'ANL-001', category:'Add-on', price:360, stock:8, reorderPoint:20, sold:634, status:'low-stock' },
  { id:'5', name:'Support Package', sku:'SUP-001', category:'Service', price:1200, stock:0, reorderPoint:10, sold:215, status:'out-of-stock' },
  { id:'6', name:'Starter Kit', sku:'STR-001', category:'Software', price:480, stock:999, reorderPoint:0, sold:1284, status:'in-stock' },
  { id:'7', name:'Data Export Tool', sku:'DAT-001', category:'Add-on', price:240, stock:15, reorderPoint:30, sold:378, status:'low-stock' },
  { id:'8', name:'Custom Integration', sku:'INT-001', category:'Service', price:4800, stock:0, reorderPoint:5, sold:48, status:'out-of-stock' },
]

export const salesRepsData = [
  { id:'1', name:'Alex Rivera', rank:1, deals:48, revenue:284000, quota:250000, progress:113.6 },
  { id:'2', name:'Sophie Turner', rank:2, deals:42, revenue:256000, quota:250000, progress:102.4 },
  { id:'3', name:'Chris Anderson', rank:3, deals:38, revenue:218000, quota:200000, progress:109 },
  { id:'4', name:'Nia Okafor', rank:4, deals:35, revenue:196000, quota:200000, progress:98 },
  { id:'5', name:'Tommy Lee', rank:5, deals:29, revenue:162000, quota:180000, progress:90 },
  { id:'6', name:'Rachel Kim', rank:6, deals:24, revenue:128000, quota:150000, progress:85.3 },
]

export const pipelineStages = [
  { id:'1', name:'Prospecting', value:840000, count:48, color:'#94a3b8' },
  { id:'2', name:'Qualification', value:620000, count:32, color:'#60a5fa' },
  { id:'3', name:'Proposal', value:480000, count:21, color:'#6366f1' },
  { id:'4', name:'Negotiation', value:320000, count:14, color:'#f97316' },
  { id:'5', name:'Closed Won', value:180000, count:8, color:'#22c55e' },
]

export const teamData = [
  { id:'1', name:'Sarah Chen', role:'Product Manager', department:'Product', email:'sarah@company.com', status:'online', tasksCompleted:24, tasksPending:6, performance:94 },
  { id:'2', name:'Marcus Williams', role:'Senior Engineer', department:'Engineering', email:'marcus@company.com', status:'busy', tasksCompleted:18, tasksPending:8, performance:88 },
  { id:'3', name:'Elena Rossi', role:'Designer', department:'Design', email:'elena@company.com', status:'online', tasksCompleted:31, tasksPending:3, performance:96 },
  { id:'4', name:'James Park', role:'Sales Lead', department:'Sales', email:'james@company.com', status:'away', tasksCompleted:15, tasksPending:12, performance:78 },
  { id:'5', name:'Amanda Foster', role:'Marketing Manager', department:'Marketing', email:'amanda@company.com', status:'online', tasksCompleted:22, tasksPending:5, performance:91 },
  { id:'6', name:'David Martinez', role:'DevOps Engineer', department:'Engineering', email:'david@company.com', status:'offline', tasksCompleted:11, tasksPending:9, performance:82 },
]

export const invoicesData = [
  { id:'1', number:'INV-2024-001', customer:'TechCorp Inc', amount:4800, status:'paid', dueDate:'2024-01-31', issueDate:'2024-01-01' },
  { id:'2', number:'INV-2024-002', customer:'GrowthCo', amount:2400, status:'pending', dueDate:'2024-01-25', issueDate:'2024-01-05' },
  { id:'3', number:'INV-2024-003', customer:'Innovate.AI', amount:9600, status:'paid', dueDate:'2024-01-20', issueDate:'2023-12-20' },
  { id:'4', number:'INV-2024-004', customer:'NexusLab', amount:1200, status:'overdue', dueDate:'2024-01-10', issueDate:'2023-12-10' },
  { id:'5', number:'INV-2024-005', customer:'CloudBase', amount:3600, status:'paid', dueDate:'2024-01-28', issueDate:'2024-01-08' },
  { id:'6', number:'INV-2024-006', customer:'StartupHQ', amount:480, status:'draft', dueDate:'2024-02-05', issueDate:'2024-01-15' },
]

export const notificationsData = [
  { id:'1', type:'alert', title:'NexusLab payment overdue', description:'Invoice INV-2024-004 is 15 days overdue ($1,200)', time:'10 min ago', read:false, actionLabel:'View Invoice' },
  { id:'2', type:'mention', title:'Sarah Chen mentioned you', description:'In Q1 Planning: "@you can you review the forecast?"', time:'25 min ago', read:false },
  { id:'3', type:'task', title:'Q4 Report due tomorrow', description:'Finance report for Q4 2023 needs to be submitted', time:'1 hour ago', read:false, actionLabel:'Open Report' },
  { id:'4', type:'approval', title:'New discount request', description:'Marcus Williams requests 20% discount for GrowthCo deal', time:'2 hours ago', read:false, actionLabel:'Approve' },
  { id:'5', type:'system', title:'API rate limit warning', description:'Your integration is approaching the monthly API limit', time:'3 hours ago', read:true },
  { id:'6', type:'task', title:'Team review meeting', description:'Q1 Performance review scheduled for tomorrow 2PM', time:'5 hours ago', read:true },
  { id:'7', type:'system', title:'Backup completed', description:'Daily data backup completed successfully', time:'8 hours ago', read:true },
]

export const budgetData = [
  { label:'Engineering', allocated:480000, spent:412000, percentage:85.8 },
  { label:'Sales & Marketing', allocated:320000, spent:298000, percentage:93.1 },
  { label:'Operations', allocated:240000, spent:198000, percentage:82.5 },
  { label:'Customer Success', allocated:160000, spent:142000, percentage:88.8 },
  { label:'G&A', allocated:120000, spent:108000, percentage:90 },
  { label:'R&D', allocated:200000, spent:164000, percentage:82 },
]
