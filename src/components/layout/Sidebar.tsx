import {
  LayoutDashboard, BarChart2, Users, ShoppingCart, Package, Warehouse,
  DollarSign, FileText, UserCheck, Puzzle, Bell, Settings, HelpCircle,
  User, ChevronLeft, Search, TrendingUp, X
} from 'lucide-react'
import { cn } from '../../utils'
import { useApp } from '../../context/AppContext'

const navGroups = [
  { label: 'Main', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ]},
  { label: 'Commerce', items: [
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'sales', label: 'Sales', icon: TrendingUp, badge: 3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: 12 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
  ]},
  { label: 'Finance', items: [
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText },
  ]},
  { label: 'Org', items: [
    { id: 'team', label: 'Team', icon: UserCheck },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
  ]},
]

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help Center', icon: HelpCircle },
  { id: 'profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen } = useApp()

  const nav = (id: string) => { setActivePage(id); setMobileMenuOpen(false) }

  return (
    <>
      {mobileMenuOpen && <div className="fixed inset-0 z-30 bg-neutral-900/50 backdrop-blur-sm lg:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={cn(
        'fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700/60 transition-all duration-300',
        sidebarCollapsed ? 'w-[68px]' : 'w-[240px]',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}>
        {/* Logo */}
        <div className={cn('flex items-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-700/60 flex-shrink-0', sidebarCollapsed ? 'justify-center' : 'justify-between')}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            {!sidebarCollapsed && <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">B2B <span className="text-primary-600">Trades</span></span>}
          </div>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1">
              <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden btn btn-ghost btn-xs p-1.5"><X className="w-4 h-4" /></button>
              <button onClick={toggleSidebar} className="hidden lg:flex btn btn-ghost btn-xs p-1.5"><ChevronLeft className="w-4 h-4" /></button>
            </div>
          )}
          {sidebarCollapsed && (
            <button onClick={toggleSidebar} className="hidden lg:flex absolute right-0 translate-x-1/2 top-5 w-5 h-5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 items-center justify-center shadow-sm hover:bg-neutral-50 transition-colors">
              <ChevronLeft className="w-3 h-3 rotate-180" />
            </button>
          )}
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="px-3 py-3 border-b border-neutral-200 dark:border-neutral-700/60 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input type="text" placeholder="Search..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 no-scrollbar">
          {navGroups.map(group => (
            <div key={group.label} className="mb-2">
              {!sidebarCollapsed && <div className="px-3 py-1.5 text-[10px] font-semibold text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">{group.label}</div>}
              {sidebarCollapsed && group.label !== 'Main' && <div className="my-1.5 h-px bg-neutral-200 dark:bg-neutral-700/60 mx-2" />}
              {group.items.map(item => {
                const Icon = item.icon
                const active = activePage === item.id
                return (
                  <button key={item.id} onClick={() => nav(item.id)} title={sidebarCollapsed ? item.label : undefined}
                    className={cn('nav-item w-full relative', active && 'nav-item-active', sidebarCollapsed && 'justify-center px-2')}>
                    <Icon className={cn('flex-shrink-0', sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                    {!sidebarCollapsed && <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && <span className="ml-auto bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                    </>}
                    {sidebarCollapsed && item.badge && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary-500" />}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-neutral-200 dark:border-neutral-700/60 px-2 py-2 flex-shrink-0">
          {bottomItems.map(item => {
            const Icon = item.icon
            return (
              <button key={item.id} onClick={() => nav(item.id)} title={sidebarCollapsed ? item.label : undefined}
                className={cn('nav-item w-full', activePage === item.id && 'nav-item-active', sidebarCollapsed && 'justify-center px-2')}>
                <Icon className={cn('flex-shrink-0', sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                {!sidebarCollapsed && <span className="flex-1 text-left">{item.label}</span>}
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}
