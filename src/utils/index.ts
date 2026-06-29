import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, compact = false): string {
  if (compact) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
    return `$${value}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)
}

export function formatNumber(value: number, compact = false): string {
  if (compact) {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
    return String(value)
  }
  return new Intl.NumberFormat('en-US').format(value)
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'badge-success', churned: 'badge-danger', 'at-risk': 'badge-warning',
    trial: 'badge-secondary', pending: 'badge-warning', processing: 'badge-primary',
    shipped: 'badge-secondary', delivered: 'badge-success', cancelled: 'badge-danger',
    refunded: 'badge-neutral', paid: 'badge-success', failed: 'badge-danger',
    overdue: 'badge-danger', draft: 'badge-neutral', 'in-stock': 'badge-success',
    'low-stock': 'badge-warning', 'out-of-stock': 'badge-danger',
    online: 'badge-success', offline: 'badge-neutral', busy: 'badge-danger', away: 'badge-warning',
  }
  return map[status] ?? 'badge-neutral'
}

export function getHealthScoreColor(score: number): string {
  if (score >= 80) return 'text-success-600 dark:text-success-400'
  if (score >= 60) return 'text-warning-600 dark:text-warning-400'
  return 'text-danger-600 dark:text-danger-400'
}

export function getHealthScoreBg(score: number): string {
  if (score >= 80) return 'bg-success-500'
  if (score >= 60) return 'bg-warning-500'
  return 'bg-danger-500'
}
