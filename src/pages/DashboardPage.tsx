import { TrendingUp, TrendingDown, DollarSign, Users, UserPlus, Target, UserMinus, BarChart2, Star } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn, formatNumber } from '../utils'
import { Card, CardHeader } from '../components/ui/Card'
import { Sparkline } from '../components/ui/Misc'
import { Badge } from '../components/ui/Badge'
import { kpiData, revenueData, salesData, productRevenueData, trafficSourceData, growthData, aiInsights, funnelData } from '../data/mockData'

type KpiColor = 'primary' | 'success' | 'warning' | 'danger' | 'secondary'

const iconMap: Record<string, React.FC<{ className?: string }>> = { DollarSign, TrendingUp, Users, UserPlus, Target, UserMinus, BarChart2, Star }
const colorMap: Record<KpiColor, { text: string; bg: string; spark: string }> = {
  primary:   { text: 'text-primary-600 dark:text-primary-400',   bg: 'bg-primary-50 dark:bg-primary-900/20',   spark: '#3b82f6' },
  success:   { text: 'text-success-600 dark:text-success-400',   bg: 'bg-success-50 dark:bg-success-900/20',   spark: '#22c55e' },
  warning:   { text: 'text-warning-600 dark:text-warning-400',   bg: 'bg-warning-50 dark:bg-warning-900/20',   spark: '#f97316' },
  danger:    { text: 'text-danger-600 dark:text-danger-400',     bg: 'bg-danger-50 dark:bg-danger-900/20',     spark: '#ef4444' },
  secondary: { text: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-50 dark:bg-secondary-900/20', spark: '#6366f1' },
}
const aiCardBg: Record<string, string> = {
  success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/30',
  danger:  'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800/30',
  warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800/30',
  primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800/30',
}

function ChartTip({ active, payload, label, fmt }: { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string; fmt?: (v: number) => string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-medium text-neutral-500 mb-1.5">{label}</p>
      {payload.map((p, i) => <div key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: p.color }} /><span className="text-neutral-500">{p.name}:</span><span className="font-semibold text-neutral-900 dark:text-neutral-100">{fmt ? fmt(p.value) : p.value}</span></div>)}
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="page-container">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Good morning, Alex 👋</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Here's what's happening with your business today.</p>
        </div>
        <select className="input text-sm py-2 w-auto">
          <option>Last 30 days</option><option>Last 90 days</option><option>This year</option>
        </select>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map(kpi => {
          const Icon = iconMap[kpi.icon]
          const c = colorMap[kpi.color]
          const up = kpi.changeType === 'increase'
          const ChangeIcon = up ? TrendingUp : TrendingDown
          return (
            <Card key={kpi.id} className="p-5 hover:shadow-card-hover transition-shadow animate-in">
              <div className="flex items-start justify-between mb-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', c.bg)}><Icon className={cn('w-5 h-5', c.text)} /></div>
                <Sparkline data={kpi.sparklineData} color={c.spark} width={72} height={28} />
              </div>
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{kpi.label}</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mt-0.5">{kpi.value}</p>
              <div className="flex items-center justify-between mt-1">
                <div className={cn('flex items-center gap-1 text-xs font-medium', up ? 'stat-up' : 'stat-down')}>
                  <ChangeIcon className="w-3 h-3" /><span>{up ? '+' : '-'}{Math.abs(kpi.change)}%</span>
                </div>
                <p className="text-[11px] text-neutral-400">{kpi.comparison}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <CardHeader title="Revenue Trend" subtitle="Monthly revenue vs last year" action={<div className="flex items-center gap-3 text-xs text-neutral-500"><span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary-500 inline-block" />This Year</span><span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-neutral-300 dark:bg-neutral-600 inline-block" />Last Year</span></div>} />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
              <Tooltip content={<ChartTip fmt={v => `$${(v/1e6).toFixed(2)}M`} />} />
              <Area type="monotone" dataKey="value2" name="Last Year" stroke="#cbd5e1" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="value" name="This Year" stroke="#3b82f6" strokeWidth={2} fill="url(#rg1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <CardHeader title="Revenue by Product" subtitle="Distribution by plan" />
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={productRevenueData} cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={2} dataKey="value">
                {productRevenueData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: unknown) => `${v}%`} contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {productRevenueData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} /><span className="text-neutral-600 dark:text-neutral-400">{item.name}</span></div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <CardHeader title="Sales Performance" subtitle="Monthly deals closed" action={<div className="flex items-center gap-3 text-xs text-neutral-500"><span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary-500 inline-block" />New</span><span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-success-400 inline-block" />Renewal</span></div>} />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="value" name="New" fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={24} />
              <Bar dataKey="value2" name="Renewal" fill="#4ade80" radius={[4,4,0,0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <CardHeader title="Traffic Sources" />
          <div className="space-y-3.5">
            {trafficSourceData.map(s => (
              <div key={s.label}>
                <div className="flex justify-between mb-1"><span className="text-xs text-neutral-700 dark:text-neutral-300">{s.label}</span><span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{s.value}%</span></div>
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className={cn('h-full rounded-full', s.color)} style={{ width: `${s.value}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <CardHeader title="Acquisition Funnel" subtitle="Visitor to customer journey" />
          <div className="space-y-2.5">
            {funnelData.map((step, i) => (
              <div key={step.label}>
                <div className="flex justify-between mb-1 text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400">{step.label}</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatNumber(step.value)} <span className="text-neutral-400 font-normal">({step.percentage.toFixed(1)}%)</span></span>
                </div>
                <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${step.percentage}%` }} /></div>
                {i < funnelData.length - 1 && <div className="text-[10px] text-neutral-400 mt-0.5">↓ {((funnelData[i+1].value / step.value) * 100).toFixed(1)}% continue</div>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Monthly Growth" subtitle="MoM growth rate %" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.4} />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} className="fill-neutral-400" axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<ChartTip fmt={v => `${v}%`} />} />
              <Area type="monotone" dataKey="value" name="Growth" stroke="#22c55e" strokeWidth={2} fill="url(#gg)" dot={{ r: 3, fill: '#22c55e' }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <CardHeader title="AI Insights" subtitle="Smart business intelligence" action={<Badge variant="primary">4 new</Badge>} />
          <div className="space-y-2.5">
            {aiInsights.map(ins => (
              <div key={ins.id} className={cn('p-3 rounded-xl border text-xs cursor-pointer hover:shadow-sm transition-all', aiCardBg[ins.color])}>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">{ins.title}</p>
                <p className="text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed line-clamp-2">{ins.description}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="h-1 flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"><div className="h-full bg-current rounded-full opacity-50" style={{ width: `${ins.confidence}%` }} /></div>
                  <span className="text-[10px] text-neutral-400">{ins.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
