import { Card, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { FileText, Users, DollarSign, Package, TrendingUp, Activity, BarChart2, Eye, Download, Plus } from 'lucide-react'

const reports = [
  { id:'1', title:'Sales Performance Report', desc:'Comprehensive sales performance, pipeline metrics, and team results.', icon:TrendingUp, category:'Sales', updated:'Today, 9:00 AM', pages:24, color:'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400', status:'ready' },
  { id:'2', title:'Customer Analytics Report', desc:'Customer acquisition, retention, churn analysis, and health score trends.', icon:Users, category:'Customers', updated:'Yesterday', pages:18, color:'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400', status:'ready' },
  { id:'3', title:'Financial Overview Report', desc:'Revenue, P&L, cash flow analysis and budget utilization.', icon:DollarSign, category:'Finance', updated:'Jan 12', pages:32, color:'bg-success-50 dark:bg-success-900/20 text-success-600 dark:text-success-400', status:'ready' },
  { id:'4', title:'Inventory & Product Report', desc:'Stock levels, turnover rates, product performance, and reorder forecasting.', icon:Package, category:'Inventory', updated:'Jan 10', pages:15, color:'bg-warning-50 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400', status:'generating' },
  { id:'5', title:'Marketing Performance Report', desc:'Campaign results, channel performance, lead attribution, and ROI analysis.', icon:BarChart2, category:'Marketing', updated:'Jan 8', pages:21, color:'bg-danger-50 dark:bg-danger-900/20 text-danger-600 dark:text-danger-400', status:'ready' },
  { id:'6', title:'Operations Report', desc:'Team productivity, process efficiency, SLA compliance and operational KPIs.', icon:Activity, category:'Operations', updated:'Jan 7', pages:28, color:'bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400', status:'ready' },
]

const recent = [
  { name:'Q4 2023 Sales Summary', size:'2.4 MB', fmt:'PDF', date:'Jan 15, 2024' },
  { name:'Customer Churn Analysis', size:'1.8 MB', fmt:'PDF', date:'Jan 14, 2024' },
  { name:'Revenue Forecast Q1 2024', size:'956 KB', fmt:'XLS', date:'Jan 13, 2024' },
  { name:'Marketing ROI December', size:'1.2 MB', fmt:'PDF', date:'Jan 12, 2024' },
]

export function ReportsPage() {
  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Reports</h1><p className="text-sm text-neutral-500 mt-1">Generate, view, and export business reports.</p></div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>Create Report</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label:'Total Reports', value:'148', sub:'All time' }, { label:'This Month', value:'24', sub:'+8 vs last month' }, { label:'Scheduled', value:'12', sub:'Auto-generated' }, { label:'Shared', value:'36', sub:'Across team' }].map(s => (
          <Card key={s.label} className="p-5 text-center">
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{s.value}</p>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1">{s.label}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Report Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map(r => {
            const Icon = r.icon
            return (
              <Card key={r.id} className="p-5 hover:shadow-card-hover transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.color}`}><Icon className="w-5 h-5" /></div>
                  <Badge variant={r.status === 'ready' ? 'success' : 'warning'}>{r.status === 'ready' ? 'Ready' : 'Generating…'}</Badge>
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">{r.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">{r.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                  <div><Badge variant="neutral" className="text-[10px]">{r.category}</Badge><p className="text-[10px] text-neutral-400 mt-1">{r.pages} pages · {r.updated}</p></div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="xs" icon={<Eye className="w-3 h-3" />} />
                    <Button variant="ghost" size="xs" icon={<Download className="w-3 h-3" />} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="p-5">
        <CardHeader title="Recent Reports" subtitle="Previously generated reports" />
        <div className="space-y-2">
          {recent.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors group">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center"><FileText className="w-4 h-4 text-neutral-500" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{r.name}</p><p className="text-xs text-neutral-400">{r.size} · {r.date}</p></div>
              <Badge variant="neutral" className="text-[10px] flex-shrink-0">{r.fmt}</Badge>
              <Button variant="ghost" size="xs" icon={<Download className="w-3.5 h-3.5" />} className="opacity-0 group-hover:opacity-100 transition-opacity">Download</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
