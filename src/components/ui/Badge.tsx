import { cn, getStatusColor } from '../../utils'
import type { ReactNode } from 'react'

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'secondary'

interface BadgeProps { variant?: BadgeVariant; children: ReactNode; dot?: boolean; className?: string; status?: string }

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'badge-primary', success: 'badge-success', warning: 'badge-warning',
  danger: 'badge-danger', neutral: 'badge-neutral', secondary: 'badge-secondary',
}
const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary-500', success: 'bg-success-500', warning: 'bg-warning-500',
  danger: 'bg-danger-500', neutral: 'bg-neutral-400', secondary: 'bg-secondary-500',
}

export function Badge({ variant = 'neutral', children, dot, className, status }: BadgeProps) {
  const v = status ? (getStatusColor(status).replace('badge-', '') as BadgeVariant) : variant
  return (
    <span className={cn('badge', variantClasses[v], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[v])} />}
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge status={status} dot>{status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
}
