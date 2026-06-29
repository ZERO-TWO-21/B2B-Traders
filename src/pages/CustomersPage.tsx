import { useState } from 'react'
import { Card, CardHeader } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { Badge, StatusBadge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar, ProgressBar } from '../components/ui/Misc'
import { customersData } from '../data/mockData'
import { formatCurrency, getHealthScoreColor, getHealthScoreBg } from '../utils'
import { UserPlus, TrendingUp, Users, AlertTriangle, Star } from 'lucide-react'

const segments = ['All', 'Enterprise', 'Mid-Market', 'SMB']
const statuses = ['All', 'active', 'at-risk', 'trial', 'churned']

const columns: Column<typeof customersData[0]>[] = [
  { key: 'name', label: 'Customer', sortable: true, render: (_, r) => <div className="flex items-center gap-3"><Avatar name={r.name} size="sm" /><div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{r.name}</p><p className="text-xs text-neutral-400">{r.email}</p></div></div> },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={v as string} /> },
  { key: 'plan', label: 'Plan', render: v => <Badge variant="secondary">{v as string}</Badge> },
  { key: 'mrr', label: 'MRR', sortable: true, render: v => <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(v as number)}</span> },
  { key: 'healthScore', label: 'Health', sortable: true, render: (v, r) => <div className="flex items-center gap-2"><ProgressBar value={r.healthScore} color={r.healthScore >= 80 ? 'success' : r.healthScore >= 60 ? 'warning' : 'danger'} className="w-16" /><span className={`text-xs font-semibold ${getHealthScoreColor(r.healthScore)}`}>{r.healthScore}</span></div> },
  { key: 'lastActivity', label: 'Last Active', render: v => <span className="text-xs text-neutral-400">{v as string}</span> },
]

export function CustomersPage() {
  const [seg, setSeg] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = customersData.filter(c => {
    if (seg !== 'All' && c.segment !== seg) return false
    if (status !== 'All' && c.status !== status) return false
    return true
  })

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Customers</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Manage and monitor your customer relationships.</p>
        </div>
        <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>Add Customer</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: customersData.length, icon: Users, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20', sub: '+12% this month' },
          { label: 'Active', value: customersData.filter(c => c.status === 'active').length, icon: TrendingUp, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20', sub: 'Currently subscribed' },
          { label: 'At Risk', value: customersData.filter(c => c.status === 'at-risk').length, icon: AlertTriangle, color: 'text-danger-600', bg: 'bg-danger-50 dark:bg-danger-900/20', sub: 'Needs attention' },
          { label: 'Total MRR', value: formatCurrency(customersData.reduce((s,c) => s+c.mrr, 0)), icon: Star, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20', sub: 'Monthly recurring' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}><s.icon className={`w-[18px] h-[18px] ${s.color}`} /></div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p>
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{s.value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-neutral-500">Segment:</span>
        {segments.map(s => <button key={s} onClick={() => setSeg(s)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${seg === s ? 'bg-primary-600 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'}`}>{s}</button>)}
        <span className="text-xs font-medium text-neutral-500 ml-4">Status:</span>
        {statuses.map(s => <button key={s} onClick={() => setStatus(s)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${status === s ? 'bg-primary-600 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'}`}>{s === 'All' ? 'All' : s.replace('-', ' ')}</button>)}
      </div>

      <DataTable columns={columns} data={filtered} getRowKey={r => r.id} selectable searchable searchPlaceholder="Search customers…" exportable pageSize={8} />

      <div>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Customer Health Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {customersData.slice(0, 4).map(c => (
            <Card key={c.id} className="p-4 hover:shadow-card-hover transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3"><Avatar name={c.name} size="md" /><div className="flex-1 min-w-0"><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{c.name}</p><p className="text-xs text-neutral-400 truncate">{c.company}</p></div></div>
              <div className="flex items-center justify-between mb-2"><StatusBadge status={c.status} /><span className="text-xs font-semibold text-neutral-500">{formatCurrency(c.mrr)}/mo</span></div>
              <div className="flex items-center justify-between mb-1 text-xs"><span className="text-neutral-500">Health</span><span className={`font-bold ${getHealthScoreColor(c.healthScore)}`}>{c.healthScore}</span></div>
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className={`h-full rounded-full ${getHealthScoreBg(c.healthScore)}`} style={{ width: `${c.healthScore}%` }} /></div>
              <p className="text-[10px] text-neutral-400 mt-2">Last active: {c.lastActivity}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
