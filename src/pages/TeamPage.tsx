import { Card, CardHeader } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { StatusBadge, Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar, ProgressBar } from '../components/ui/Misc'
import { teamData } from '../data/mockData'
import { UserPlus, CheckCircle, Clock, BarChart2, Calendar } from 'lucide-react'

const columns: Column<typeof teamData[0]>[] = [
  { key: 'name', label: 'Member', sortable: true, render: (v, r) => <div className="flex items-center gap-3"><Avatar name={v as string} size="sm" status={r.status as 'online'|'offline'|'busy'|'away'} /><div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{v as string}</p><p className="text-xs text-neutral-400">{r.email}</p></div></div> },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'department', label: 'Dept', render: v => <Badge variant="secondary">{v as string}</Badge> },
  { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={v as string} /> },
  { key: 'tasksCompleted', label: 'Done', sortable: true, render: v => <span className="font-semibold text-success-600 dark:text-success-400">{v as number}</span> },
  { key: 'tasksPending', label: 'Pending', sortable: true, render: v => <span className="font-semibold text-warning-600 dark:text-warning-400">{v as number}</span> },
  { key: 'performance', label: 'Performance', sortable: true, render: (v) => <div className="flex items-center gap-2"><ProgressBar value={v as number} color={(v as number) >= 90 ? 'success' : (v as number) >= 75 ? 'warning' : 'danger'} className="w-20" /><span className="text-xs font-semibold">{v as number}%</span></div> },
]

const tasks = [
  { id:'1', title:'Q1 Product Roadmap Review', assignee:'Sarah Chen', due:'Tomorrow', priority:'high' },
  { id:'2', title:'Deploy new API endpoints', assignee:'Marcus Williams', due:'Jan 18', priority:'medium' },
  { id:'3', title:'Customer onboarding design', assignee:'Elena Rossi', due:'Jan 20', priority:'medium' },
  { id:'4', title:'Q4 Sales report', assignee:'James Park', due:'Jan 17', priority:'high' },
  { id:'5', title:'Email campaign setup', assignee:'Amanda Foster', due:'Jan 22', priority:'low' },
]

const feed = [
  { id:'1', user:'Sarah Chen', action:'completed', target:'Q4 Analytics Report', time:'10 min ago' },
  { id:'2', user:'Marcus Williams', action:'commented on', target:'API Documentation PR', time:'25 min ago' },
  { id:'3', user:'Elena Rossi', action:'uploaded to', target:'Brand Assets', time:'1 hour ago' },
  { id:'4', user:'James Park', action:'closed deal', target:'InnovateCo Enterprise', time:'2 hours ago' },
]

const priorityBg: Record<string, string> = {
  high: 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400',
  medium: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400',
  low: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400',
}

export function TeamPage() {
  const online = teamData.filter(m => m.status === 'online').length
  const completed = teamData.reduce((s, m) => s + m.tasksCompleted, 0)
  const pending = teamData.reduce((s, m) => s + m.tasksPending, 0)
  const avgPerf = Math.round(teamData.reduce((s, m) => s + m.performance, 0) / teamData.length)

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Team</h1><p className="text-sm text-neutral-500 mt-1">Performance, tasks, and collaboration.</p></div>
        <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>Invite Member</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Team Members', value: teamData.length.toString(), icon: () => <div className="flex -space-x-1.5">{teamData.slice(0,4).map(m => <Avatar key={m.id} name={m.name} size="xs" className="border-2 border-white dark:border-neutral-800" />)}</div>, sub: `${online} online`, isCustom: true },
          { label: 'Tasks Completed', value: completed.toString(), icon: CheckCircle, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20', sub: `${completed + pending} total` },
          { label: 'Tasks Pending', value: pending.toString(), icon: Clock, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20', sub: 'Across team' },
          { label: 'Avg Performance', value: `${avgPerf}%`, icon: BarChart2, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20', sub: 'Team average' },
        ].map((s, i) => (
          <Card key={s.label} className="p-5">
            {i === 0 ? (
              <><div className="mb-3"><s.icon /></div><p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p><p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{s.value}</p><p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p></>
            ) : (
              <><div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}><s.icon className={`w-[18px] h-[18px] ${s.color}`} /></div><p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p><p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{s.value}</p><p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p></>
            )}
          </Card>
        ))}
      </div>

      <DataTable columns={columns} data={teamData} getRowKey={r => r.id} selectable searchable searchPlaceholder="Search team…" exportable pageSize={8} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <CardHeader title="Assigned Tasks" action={<Button variant="outline" size="xs" icon={<Calendar className="w-3 h-3" />}>Schedule</Button>} />
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/30 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors">
                <input type="checkbox" className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{task.title}</p><p className="text-xs text-neutral-400">{task.assignee} · Due {task.due}</p></div>
                <span className={`badge text-[10px] ${priorityBg[task.priority]}`}>{task.priority}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <CardHeader title="Team Activity" subtitle="Recent updates" />
          <div className="space-y-4">
            {feed.map((item, i) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative"><Avatar name={item.user} size="sm" />{i < feed.length - 1 && <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-[calc(100%+4px)] bg-neutral-200 dark:bg-neutral-700" />}</div>
                <div className="flex-1 pb-4"><p className="text-sm text-neutral-700 dark:text-neutral-300"><span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.user}</span> {item.action} <span className="text-primary-600 dark:text-primary-400">{item.target}</span></p><p className="text-xs text-neutral-400 mt-0.5">{item.time}</p></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
