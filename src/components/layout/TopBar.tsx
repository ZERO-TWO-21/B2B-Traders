import { useState, useRef, useEffect } from 'react'
import { Search, Bell, Plus, Sun, Moon, Menu, ChevronDown, Building2, LogOut, User, Settings, Check } from 'lucide-react'
import { cn } from '../../utils'
import { useApp } from '../../context/AppContext'
import { notificationsData } from '../../data/mockData'
import { Avatar } from '../ui/Misc'

const workspaces = [
  { id: '1', name: 'Acme Corp', plan: 'Enterprise', active: true },
  { id: '2', name: 'Side Project', plan: 'Starter', active: false },
]

export function TopBar() {
  const { theme, toggleTheme, sidebarCollapsed, setMobileMenuOpen, setActivePage } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [wsOpen, setWsOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
      if (wsRef.current && !wsRef.current.contains(e.target as Node)) setWsOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const unread = notificationsData.filter(n => !n.read).length

  return (
    <header className={cn(
      'fixed top-0 right-0 z-20 h-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700/60 flex items-center gap-3 px-4 transition-all duration-300',
      sidebarCollapsed ? 'lg:left-[68px]' : 'lg:left-[240px]',
      'left-0'
    )}>
      {/* Mobile menu */}
      <button className="lg:hidden btn btn-ghost btn-sm p-2" onClick={() => setMobileMenuOpen(true)}><Menu className="w-5 h-5" /></button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input type="text" placeholder="Search customers, orders, reports…" className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 border border-transparent rounded-xl text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-neutral-800 transition-all" />
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Create */}
        <button className="btn btn-primary btn-sm gap-1.5 hidden sm:inline-flex"><Plus className="w-3.5 h-3.5" /><span className="hidden md:inline">Create</span></button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); setWsOpen(false) }} className="btn btn-ghost btn-sm p-2 relative">
            <Bell className="w-[18px] h-[18px]" />
            {unread > 0 && <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-danger-500 border border-white dark:border-neutral-900" />}
          </button>
          {notifOpen && (
            <div className="dropdown-menu right-0 w-80 max-h-[480px] overflow-hidden flex flex-col animate-slide-down">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                <div><p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Notifications</p><p className="text-xs text-neutral-400">{unread} unread</p></div>
                <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">Mark all read</button>
              </div>
              <div className="overflow-y-auto">
                {notificationsData.slice(0, 5).map(n => (
                  <div key={n.id} className={cn('flex gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/40 cursor-pointer border-b border-neutral-100 dark:border-neutral-700/40', !n.read && 'bg-primary-50/30 dark:bg-primary-900/10')}>
                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold', n.type === 'alert' ? 'bg-danger-100 text-danger-600' : n.type === 'mention' ? 'bg-primary-100 text-primary-600' : n.type === 'approval' ? 'bg-success-100 text-success-600' : 'bg-neutral-100 text-neutral-600')}>
                      {n.type === 'alert' ? '!' : n.type === 'mention' ? '@' : n.type === 'approval' ? '↑' : '✓'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{n.title}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-neutral-200 dark:border-neutral-700">
                <button onClick={() => { setActivePage('notifications'); setNotifOpen(false) }} className="text-xs text-primary-600 dark:text-primary-400 hover:underline w-full text-center">View all</button>
              </div>
            </div>
          )}
        </div>

        {/* Workspace */}
        <div className="relative hidden md:block" ref={wsRef}>
          <button onClick={() => { setWsOpen(v => !v); setNotifOpen(false); setProfileOpen(false) }} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center"><Building2 className="w-3 h-3 text-white" /></div>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 hidden lg:block">Acme Corp</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>
          {wsOpen && (
            <div className="dropdown-menu right-0 animate-slide-down">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Workspaces</div>
              {workspaces.map(ws => (
                <button key={ws.id} className="dropdown-item w-full justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"><span className="text-white text-[10px] font-bold">{ws.name[0]}</span></div>
                    <div className="text-left"><div className="text-xs font-medium text-neutral-900 dark:text-neutral-100">{ws.name}</div><div className="text-[10px] text-neutral-400">{ws.plan}</div></div>
                  </div>
                  {ws.active && <Check className="w-3.5 h-3.5 text-primary-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-sm p-2" aria-label="Toggle theme">
          {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); setWsOpen(false) }} className="flex items-center gap-2 pl-1.5 pr-1 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <Avatar name="Alex Rivera" size="sm" status="online" />
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">Alex Rivera</div>
              <div className="text-[10px] text-neutral-400 leading-tight">Admin</div>
            </div>
            <ChevronDown className="w-3 h-3 text-neutral-400 hidden md:block" />
          </button>
          {profileOpen && (
            <div className="dropdown-menu right-0 w-52 animate-slide-down">
              <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Alex Rivera</p>
                <p className="text-xs text-neutral-400 mt-0.5">alex@acmecorp.com</p>
              </div>
              <button className="dropdown-item w-full" onClick={() => { setActivePage('profile'); setProfileOpen(false) }}><User className="w-3.5 h-3.5" /> Your Profile</button>
              <button className="dropdown-item w-full" onClick={() => { setActivePage('settings'); setProfileOpen(false) }}><Settings className="w-3.5 h-3.5" /> Settings</button>
              <div className="border-t border-neutral-200 dark:border-neutral-700 mt-1 pt-1">
                <button className="dropdown-item w-full text-danger-600 dark:text-danger-400"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
