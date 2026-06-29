import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { StatusBadge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { invoicesData, cashFlowData, budgetData } from '../data/mockData'
import { formatCurrency } from '../utils'
import { Plus, CreditCard, TrendingUp, AlertCircle, FileText } from 'lucide-react'

const columns: Column<typeof invoicesData[0]>[] = [
  { key: 'number', label: 'Invoice #', sortable: true, render: v => <span className="font-mono font-medium text-primary-600 dark:text-primary-400">{v as string}</span> },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true, render: v => <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(v as number)}</span> },
  { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={v as string} /> },
  { key: 'issueDate', label: 'Issued', sortable: true, render: v => <span className="text-xs text-neutral-400">{v as string}</span> },
  { key: 'dueDate', label: 'Due Date', sortable: true, render: v => <span className="text-xs text-neutral-400">{v as string}</span> },
]

function ChartTip({ active, payload, label, fmt }: { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string; fmt?: (v: number) => string }) {
  if (!active || !payload?.length) return null
  return <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 shadow-xl text-xs"><p className="font-medium text-neutral-500 mb-1.5">{label}</p>{payload.map((p, i) => <div key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: p.color }} /><span className="text-neutral-500">{p.name}:</span><span className="font-semibold text-neutral-900 dark:text-neutral-100">{fmt ? fmt(p.value) : p.value}</span></div>)}</div>
}

export function FinancePage() {
  const totalInvoiced = invoicesData.reduce((s, i) => s + i.amount, 0)
  const paid = invoicesData.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const pending = invoicesData.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0)
  const overdue = invoicesData.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Finance</h1><p className="text-sm text-neutral-500 mt-1">Cash flow, invoices, and financial health.</p></div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Invoice</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoiced', value: formatCurrency(totalInvoiced), icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
          { label: 'Paid', value: formatCurrency(paid), icon: CreditCard, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20' },
          { label: 'Pending', value: formatCurrency(pending), icon: TrendingUp, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20' },
          { label: 'Overdue', value: formatCurrency(overdue), icon: AlertCircle, color: 'text-danger-600', bg: 'bg-danger-50 dark:bg-danger-900/20' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}><s.icon className={`w-[18px] h-[18px] ${s.color}`} /></div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p>
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <CardHeader title="Cash Flow" subtitle="Monthly income vs expenses" action={<div className="flex items-center gap-3 text-xs text-neutral-500"><span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-primary-500 inline-block"/>Income</span><span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-danger-400 inline-block"/>Expenses</span></div>} />
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={cashFlowData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
              <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<ChartTip fmt={v => `$${(v/1000).toFixed(0)}K`} />} />
            <Area type="monotone" dataKey="value" name="Income" stroke="#3b82f6" strokeWidth={2} fill="url(#ig)" />
            <Area type="monotone" dataKey="value2" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#eg)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-5">
        <CardHeader title="Budget Utilization" subtitle="Spend vs allocation by department" />
        <div className="space-y-4">
          {budgetData.map(d => (
            <div key={d.label} className="grid grid-cols-1 sm:grid-cols-[140px_1fr_180px] gap-3 items-center">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">{d.label}</span>
              <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className={`h-full rounded-full ${d.percentage >= 90 ? 'bg-danger-500' : d.percentage >= 80 ? 'bg-warning-500' : 'bg-primary-500'}`} style={{ width: `${d.percentage}%` }} /></div>
              <div className="flex justify-between sm:justify-end gap-4 text-xs"><span className="text-neutral-500">{formatCurrency(d.spent)} / {formatCurrency(d.allocated)}</span><span className={`font-semibold ${d.percentage >= 90 ? 'text-danger-600' : d.percentage >= 80 ? 'text-warning-600' : 'text-success-600'}`}>{d.percentage.toFixed(1)}%</span></div>
            </div>
          ))}
        </div>
      </Card>

      <DataTable columns={columns} data={invoicesData} getRowKey={r => r.id} selectable searchable searchPlaceholder="Search invoices…" exportable pageSize={8} />
    </div>
  )
}
