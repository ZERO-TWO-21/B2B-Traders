import { useApp } from './context/AppContext'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { FloatingActionMenu } from './components/FloatingActionMenu'
import { DashboardPage } from './pages/DashboardPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { CustomersPage } from './pages/CustomersPage'
import { SalesPage } from './pages/SalesPage'
import { OrdersPage } from './pages/OrdersPage'
import { InventoryPage } from './pages/InventoryPage'
import { FinancePage } from './pages/FinancePage'
import { ReportsPage } from './pages/ReportsPage'
import { TeamPage } from './pages/TeamPage'
import { SettingsPage } from './pages/SettingsPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { cn } from './utils'

const pageMap: Record<string, React.FC> = {
  dashboard: DashboardPage,
  analytics: AnalyticsPage,
  customers: CustomersPage,
  sales: SalesPage,
  orders: OrdersPage,
  products: InventoryPage,
  inventory: InventoryPage,
  finance: FinancePage,
  reports: ReportsPage,
  team: TeamPage,
  settings: SettingsPage,
  notifications: NotificationsPage,
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{title}</h1>
      <div className="card p-12 text-center">
        <p className="text-4xl mb-4">🚧</p>
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">Coming Soon</p>
        <p className="text-sm text-neutral-500 mt-1">This section is under construction.</p>
      </div>
    </div>
  )
}

export function App() {
  const { sidebarCollapsed, activePage } = useApp()
  const PageComponent = pageMap[activePage] ?? (() => <Placeholder title={activePage.charAt(0).toUpperCase() + activePage.slice(1)} />)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Sidebar />
      <TopBar />
      <main className={cn('min-h-screen pt-16 transition-all duration-300', sidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-[240px]')}>
        <div className="animate-in">
          <PageComponent />
        </div>
      </main>
      <FloatingActionMenu />
    </div>
  )
}
