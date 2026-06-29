import { cn } from '../../utils'
import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode; hoverable?: boolean; padding?: 'none' | 'sm' | 'md' | 'lg'
}
const pad = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' }

export function Card({ children, hoverable, padding = 'md', className, ...props }: CardProps) {
  return (
    <div className={cn(hoverable ? 'card-hover' : 'card', pad[padding], className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, className }: {
  title: string; subtitle?: string; action?: ReactNode; className?: string
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-5', className)}>
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
        {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
