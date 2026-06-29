import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { notificationsData } from '../data/mockData'
import { Bell, AtSign, CheckSquare, ArrowUp, Settings, Trash2, Check } from 'lucide-react'
import { cn } from '../utils'

const typeIcons: Record<string, React.ReactNode> = {
  alert: <Bell className="w-4 h-4" />, mention: <AtSign className="w-4 h-4" />,
  task: <CheckSquare className="w-4 h-4" />, approval: <ArrowUp className="w-4 h-4" />, system: <Settings className="w-4 h-4" />,
}
const typeColors: Record<string, string> = {
  alert: 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400',
  mention: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
  task: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
  approval: 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400',
  system: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400',
}
const filters = ['All', 'Alerts', 'Mentions', 'Tasks', 'Approvals', 'System']

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [notifs, setNotifs] = useState(notificationsData)

  const filtered = notifs.filter(n => {
    if (activeFilter === 'All') return true
    return n.type === activeFilter.toLowerCase().replace(/s$/, '')
  })

  return (
    <div className="page-container" style={{ maxWidth: '768px' }}>
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Notifications</h1><p className="text-sm text-neutral-500 mt-1">{notifs.filter(n => !n.read).length > 0 ? `${notifs.filter(n => !n.read).length} unread notifications` : 'All caught up!'}</p></div>
        <Button variant="outline" size="sm" icon={<Check className="w-3.5 h-3.5" />} onClick={() => setNotifs(ns => ns.map(n => ({...n, read: true})))}>Mark all read</Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(f => <button key={f} onClick={() => setActiveFilter(f)} className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors', activeFilter === f ? 'bg-primary-600 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700')}>{f}</button>)}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16"><div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-700/50 flex items-center justify-center mx-auto mb-4"><Bell className="w-8 h-8 text-neutral-400" /></div><p className="font-semibold text-neutral-900 dark:text-neutral-100">No notifications</p><p className="text-sm text-neutral-500 mt-1">You're all caught up!</p></div>
        ) : filtered.map(n => (
          <div key={n.id} className={cn('card p-4 flex items-start gap-4 cursor-pointer hover:shadow-card-hover transition-all', !n.read && 'ring-1 ring-primary-200 dark:ring-primary-800/50')} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? {...x, read: true} : x))}>
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', typeColors[n.type])}>{typeIcons[n.type]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn('text-sm font-medium', n.read ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-900 dark:text-neutral-100')}>{n.title}</p>
                <div className="flex items-center gap-2 flex-shrink-0"><span className="text-xs text-neutral-400">{n.time}</span>{!n.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}</div>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{n.description}</p>
              {n.actionLabel && <Button variant="outline" size="xs" className="mt-2" onClick={e => e.stopPropagation()}>{n.actionLabel}</Button>}
            </div>
            <button className="btn btn-ghost btn-xs p-1.5 flex-shrink-0 opacity-0 hover:opacity-100 group-hover:opacity-100" onClick={e => { e.stopPropagation(); setNotifs(ns => ns.filter(x => x.id !== n.id)) }}><Trash2 className="w-3.5 h-3.5 text-neutral-400" /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
