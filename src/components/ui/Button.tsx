import { cn } from '../../utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
type Size = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; loading?: boolean
  icon?: ReactNode; iconRight?: ReactNode; fullWidth?: boolean; children?: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'btn-primary', secondary: 'btn-secondary', outline: 'btn-outline',
  ghost: 'btn-ghost', danger: 'btn-danger', success: 'btn-success',
}
const sizes: Record<Size, string> = { xs: 'btn-xs', sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' }

export function Button({ variant = 'primary', size = 'md', loading, icon, iconRight, fullWidth, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button className={cn('btn', variants[variant], sizes[size], fullWidth && 'w-full', className)} disabled={disabled || loading} {...props}>
      {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : icon}
      {children}
      {!loading && iconRight}
    </button>
  )
}
