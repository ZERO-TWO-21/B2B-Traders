import { Card, CardHeader } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar, ProgressBar } from '../components/ui/Misc'
import { salesRepsData, pipelineStages } from '../data/mockData'
import { formatCurrency } from '../utils'
import { Plus, Target, TrendingUp, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const columns: Column<typeof salesRepsData[0]>[] = [
  { key: 'rank', label: '#', render: v => <span className={`text-sm font-bold ${(v as number) <= 3 ? 'text-warning-500' : 'text-neutral-400'}`}>#{v as number}</span> },
  { key: 'name', label: 'Rep', sortable: true, render: v => <div className="flex items-center gap-2.5"><Avatar name={v as string} size="sm" /><span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{v as string}</span></div> },
  { key: 'deals', label: 'Deals', sortable: true, render: v => <span className="font-semibold">{v as number}</span> },
  { key: 'revenue', label: 'Revenue', sortable: true, render: v => <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(v as number)}</span> },
  { key: 'quota', label: 'Quota', render: v => <span className="text-neutral-500">{formatCurrency(v as number)}</span> },
  { key: 'progress', label: 'Quota %', sortable: true, render: (_, r) => <div className="flex items-center gap-2"><ProgressBar value={r.progress} max={120} color={r.progress >= 100 ? 'success' : r.progress >= 80 ? 'warning' : 'danger'} className="w-20" /><span className={`text-xs font-semibold ${r.progress >= 100 ? 'text-success-600 dark:text-success-400' : r.progress >= 80 ? 'text-warning-600 dark:text-warning-400' : 'text-danger-600 dark:text-danger-400'}`}>{r.progress.toFixed(1)}%</span></div> },
]

const kanban = {
  prospecting: [{ id:'1', name:'CloudScale Technologies', value:48000, owner:'Alex R.' }, { id:'2', name:'DataPeak Inc', value:24000, owner:'Sophie T.' }],
  qualification: [{ id:'3', name:'Vertex Analytics', value:72000, owner:'Nia O.' }, { id:'4', name:'PrimeFlow Solutions', value:18000, owner:'Alex R.' }],
  proposal: [{ id:'5', name:'GlobalSoft Corp', value:96000, owner:'Sophie T.' }],
  negotiation: [{ id:'6', name:'MegaCorp International', value:144000, owner:'Alex R.' }],
  closed: [{ id:'7', name:'InnovateCo', value:84000, owner:'Sophie T.' }, { id:'8', name:'SpeedTech AI', value:60000, owner:'Rachel K.' }],
}
const stageTitles: Record<string, string> = { prospecting:'Prospecting', qualification:'Qualification', proposal:'Proposal', negotiation:'Negotiation', closed:'Closed Won' }
const stageBorder: Record<string, string> = { prospecting:'border-l-neutral-400', qualification:'border-l-primary-400', proposal:'border-l-secondary-400', negotiation:'border-l-warning-400', closed:'border-l-success-400' }

const winLoss = [
  { label:'Jan', won:24, lost:12 }, { label:'Feb', won:28, lost:14 }, { label:'Mar', won:22, lost:16 },
  { label:'Apr', won:32, lost:10 }, { label:'May', won:36, lost:11 }, { label:'Jun', won:30, lost:13 },
]

export function SalesPage() {
  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Sales</h1><p className="text-sm text-neutral-500 mt-1">Pipeline, forecasts, and team performance.</p></div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Opportunity</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pipeline', value: formatCurrency(pipelineStages.reduce((s,p) => s+p.value, 0)), icon: Target, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
          { label: 'Deals This Month', value: '48', icon: TrendingUp, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20' },
          { label: 'Win Rate', value: '72.4%', icon: Award, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20' },
          { label: 'Avg Deal Size', value: formatCurrency(42800), icon: Target, color: 'text-secondary-600', bg: 'bg-secondary-50 dark:bg-secondary-900/20' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}><s.icon className={`w-[18px] h-[18px] ${s.color}`} /></div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p>
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Kanban */}
      <Card className="p-5">
        <CardHeader title="Sales Pipeline" subtitle="Deals by stage" />
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-[800px]">
            {Object.entries(kanban).map(([stage, opps]) => (
              <div key={stage} className="flex-1 min-w-[160px]">
                <div className="flex items-center justify-between mb-3"><h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{stageTitles[stage]}</h4><Badge variant="neutral">{opps.length}</Badge></div>
                <div className="space-y-2">
                  {opps.map(opp => (
                    <div key={opp.id} className={`bg-neutral-50 dark:bg-neutral-700/40 border border-neutral-200 dark:border-neutral-600 rounded-xl p-3 cursor-pointer hover:shadow-card transition-shadow border-l-4 ${stageBorder[stage]}`}>
                      <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">{opp.name}</p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-1">{formatCurrency(opp.value)}</p>
                      <p className="text-[10px] text-neutral-400 mt-1">{opp.owner}</p>
                    </div>
                  ))}
                  <button className="w-full py-2 text-[11px] text-neutral-400 border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-primary-300 hover:text-primary-500 transition-colors">+ Add deal</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <CardHeader title="Pipeline by Stage" />
          <div className="space-y-3">
            {pipelineStages.map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1 text-sm"><span className="text-neutral-700 dark:text-neutral-300">{s.name}</span><div className="flex items-center gap-3"><span className="text-neutral-400 text-xs">{s.count} deals</span><span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(s.value)}</span></div></div>
                  <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(s.value / pipelineStages[0].value)*100}%`, background: s.color }} /></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <CardHeader title="Win / Loss Analysis" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={winLoss} margin={{ top: 4, right: 4, left: -15, bottom: 0 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-700" opacity={0.5} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} className="fill-neutral-400" axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
              <Bar dataKey="won" name="Won" fill="#22c55e" radius={[4,4,0,0]} maxBarSize={20} />
              <Bar dataKey="lost" name="Lost" fill="#ef4444" radius={[4,4,0,0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <CardHeader title="Sales Leaderboard" subtitle="Rep performance this quarter" />
        <DataTable columns={columns} data={salesRepsData} getRowKey={r => r.id} searchable={false} exportable={false} pageSize={10} />
      </Card>
    </div>
  )
}
