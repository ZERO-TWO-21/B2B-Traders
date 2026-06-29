import { cn } from '../../utils'
import type { ReactNode } from 'react'

// ── Sparkline ──────────────────────────────────────────────────────────────
interface SparklineProps { data: number[]; width?: number; height?: number; color?: string }

export function Sparkline({ data, width = 80, height = 28, color = '#3b82f6' }: SparklineProps) {
  if (!data.length) return null
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1, pad = 2
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = pad + (1 - (v - min) / range) * (height - pad * 2)
    return `${x},${y}`
  }).join(' ')
  const area = `${pad},${height - pad} ${points} ${width - pad},${height - pad}`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polygon points={area} fill={color} fillOpacity={0.1} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── ProgressBar ────────────────────────────────────────────────────────────
interface ProgressBarProps { value: number; max?: number; color?: 'primary'|'success'|'warning'|'danger'; size?: 'xs'|'sm'|'md'; showLabel?: boolean; className?: string }
const pbColors = { primary:'bg-primary-500', success:'bg-success-500', warning:'bg-warning-500', danger:'bg-danger-500' }
const pbSizes = { xs:'h-1', sm:'h-1.5', md:'h-2.5' }

export function ProgressBar({ value, max = 100, color = 'primary', size = 'sm', showLabel, className }: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  const c = pct >= 90 ? 'danger' : pct >= 70 ? 'warning' : color
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden', pbSizes[size])}>
        <div className={cn('h-full rounded-full transition-all duration-500', pbColors[c])} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="text-xs text-neutral-500 min-w-[36px] text-right">{pct.toFixed(0)}%</span>}
    </div>
  )
}

// ── Avatar ─────────────────────────────────────────────────────────────────
interface AvatarProps { name: string; src?: string; size?: 'xs'|'sm'|'md'|'lg'; status?: 'online'|'offline'|'busy'|'away'; className?: string }
const avSizes = { xs:'w-6 h-6 text-[10px]', sm:'w-8 h-8 text-xs', md:'w-10 h-10 text-sm', lg:'w-12 h-12 text-base' }
const statusColors = { online:'bg-success-500', offline:'bg-neutral-400', busy:'bg-danger-500', away:'bg-warning-500' }
const statusSizes = { xs:'w-1.5 h-1.5', sm:'w-2 h-2', md:'w-2.5 h-2.5', lg:'w-3 h-3' }
const bgColors = ['bg-primary-100 text-primary-700','bg-secondary-100 text-secondary-700','bg-success-100 text-success-700','bg-warning-100 text-warning-700','bg-danger-100 text-danger-700']

export function Avatar({ name, src, size = 'md', status, className }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const bg = bgColors[name.charCodeAt(0) % bgColors.length]
  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      {src
        ? <img src={src} alt={name} className={cn('rounded-full object-cover', avSizes[size])} />
        : <div className={cn('rounded-full flex items-center justify-center font-semibold', avSizes[size], bg)}>{initials}</div>
      }
      {status && <span className={cn('absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-neutral-800', statusColors[status], statusSizes[size])} />}
    </div>
  )
}

// ── Skeleton ───────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer', className)} />
}

// ── EmptyState ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-700/50 flex items-center justify-center mb-4 text-neutral-400">{icon}</div>}
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">{title}</h3>
      {description && <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
