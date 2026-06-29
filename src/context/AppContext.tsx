import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface AppContextType {
  theme: Theme
  toggleTheme: () => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  activePage: string
  setActivePage: (page: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('nexus-theme')
      if (saved === 'dark' || saved === 'light') return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch { return 'light' }
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('nexus-theme', theme) } catch {}
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), [])
  const toggleSidebar = useCallback(() => setSidebarCollapsed(v => !v), [])

  return (
    <AppContext.Provider value={{ theme, toggleTheme, sidebarCollapsed, toggleSidebar, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
