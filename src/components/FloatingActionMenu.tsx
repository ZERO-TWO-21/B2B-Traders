import { useState } from 'react'
import { Plus, UserPlus, FileText, Package, FileBarChart, CalendarDays, Mail } from 'lucide-react'
import { cn } from '../utils'

const actions = [
  { label: 'Create Customer', icon: UserPlus, color: 'bg-primary-600 hover:bg-primary-700' },
  { label: 'New Invoice', icon: FileText, color: 'bg-success-600 hover:bg-success-700' },
  { label: 'Add Product', icon: Package, color: 'bg-secondary-600 hover:bg-secondary-700' },
  { label: 'Create Report', icon: FileBarChart, color: 'bg-warning-600 hover:bg-warning-700' },
  { label: 'Schedule Meeting', icon: CalendarDays, color: 'bg-danger-600 hover:bg-danger-700' },
  { label: 'Invite Member', icon: Mail, color: 'bg-neutral-700 hover:bg-neutral-600' },
]

export function FloatingActionMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      {open && (
        <div className="flex flex-col items-end gap-2 animate-slide-up">
          {actions.map((action, i) => {
            const Icon = action.icon
            return (
              <div key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => setOpen(false)}>
                <span className="text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2.5 py-1.5 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{action.label}</span>
                <button className={cn('w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95', action.color)}><Icon className="w-4 h-4" /></button>
              </div>
            )
          })}
        </div>
      )}
      <button onClick={() => setOpen(v => !v)} className={cn('w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 text-white', open ? 'bg-neutral-800 dark:bg-neutral-700 rotate-45' : 'bg-primary-600 hover:bg-primary-700 hover:scale-105')} aria-label="Quick actions">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
