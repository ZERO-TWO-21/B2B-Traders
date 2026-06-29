import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import { Card, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { revenueData, salesData, growthData, trafficSourceData } from '../data/mockData'
import { formatCurrency } from '../utils'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

const geoData = [
  { region: 'North America', revenue: 1240000, share: 43.7, customers: 5840, growth: 12.4 },
  { region: 'Europe', revenue: 820000, share: 28.9, customers: 3290, growth: 8.7 },
  { region: 'Asia Pacific', revenue: 480000, share: 16.9, customers: 2180, growth: 22.1 },
  { region: 'Latin America', revenue: 180000, share: 6.3, customers: 980, growth: 15.6 },
  { region: 'Middle East & Africa', revenue: 120000, share: 4.2, customers: 557, growth: 31.2 },
]

const performanceData = [
  { metric: 'Revenue', current: 88 }, { metric: 'Customers', current: 94 },
  { metric: 'Conversion', current: 72 }, { metric: 'Retention', current: 91 },
  { metric: 'CSAT', current: 96 }, { metric: 'NPS', current: 78 },
]

function ChartTip({ active, payload, label, fmt }: { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string; fmt?: (v: number) => string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-medium text-neutral-500 mb-1.5">{label}</p>
      {payload.map((p, i) => <div key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: p.color }} /><span className="text-neutral-500">{p.name}:</span><span className="font-semibold text-neutral-900 dark:text-neutral-100">{fmt ? fmt(p.value) : p.value}</span></div>)}
    </div>
  )
}

export function AnalyticsPage() {
  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Analytics</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Deep dive into your business metrics and performance.</p>
        </div>
        <select className="input text-sm py-2 w-auto"><option>Last 12 months</option><option>Last 6 months</option><option>Last quarter</option></select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$28.4M', change: '+14.5%', icon: DollarSign, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
          { label: 'Avg Revenue / Customer', value: '$2,210', change: '+8.9%', icon: TrendingUp, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20' },
          { label: 'Active Users', value: '48.2K', change: '+22.1%', icon: Users, color: 'text-secondary-600', bg: 'bg-secondary-50 dark:bg-secondary-900/20' },
          { label: 'Avg Session', value: '8m 32s', change: '+2.4%', icon: Activity, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20' },
        ].map(m => (
          <Card key={m.label} className="p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${m.bg}`}><m.icon className={`w-[18px] h-[18px] ${m.color}`} /></div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{m.label}</p>
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{m.value}</p>
            <p className="text-xs text-success-600 dark:text-success-400 mt-0.5">{m.change} vs last period</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <CardHeader title="Revenue Trend" subtitle="Monthly revenue performance" action={<Badge variant="success" dot>Live</Badge>} />
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} className="fill-neutral-400" axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
            <Tooltip content={<ChartTip fmt={v => `$${(v/1000).toFixed(0)}K`} />} />
            <Area type="monotone" dataKey="value2" name="Last Year" stroke="#94a3b8" strokeWidth={1.5} fill="none" strokeDasharray="5 3" />
            <Area type="monotone" dataKey="value" name="This Year" stroke="#3b82f6" strokeWidth={2.5} fill="url(#ag1)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <CardHeader title="Geographic Revenue" subtitle="Revenue by region" />
          <div className="space-y-3">
            {geoData.map(r => (
              <div key={r.region}>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span className="text-neutral-700 dark:text-neutral-300 truncate">{r.region}</span>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(r.revenue, true)}</span>
                    <Badge variant="success" className="text-[10px]">+{r.growth}%</Badge>
                  </div>
                </div>
                <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${r.share}%` }} /></div>
                <div className="flex justify-between mt-0.5 text-[10px] text-neutral-400"><span>{r.customers.toLocaleString()} customers</span><span>{r.share}%</span></div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Performance Score" subtitle="KPI vs targets" />
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={performanceData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="currentColor" className="text-neutral-200 dark:text-neutral-700" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} className="fill-neutral-500" />
              <Radar name="Score" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <CardHeader title="Monthly Sales Volume" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="value" name="New" fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={28} />
              <Bar dataKey="value2" name="Renewals" fill="#4ade80" radius={[4,4,0,0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <CardHeader title="Growth Rate" subtitle="Month-over-month %" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<ChartTip fmt={v => `${v}%`} />} />
              <Line type="monotone" dataKey="value" name="Growth" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <CardHeader title="Traffic Source Breakdown" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trafficSourceData.map(s => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/30">
              <div className={`w-10 h-10 rounded-full ${s.color} mx-auto mb-2 opacity-80`} />
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{s.value}%</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
