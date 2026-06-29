import { useState, type ReactNode } from 'react'
import { cn } from '../../utils'
import { ChevronUp, ChevronDown, Search, Download, Filter } from 'lucide-react'
import { Button } from './Button'
import { Badge } from './Badge'

export interface Column<T> {
  key: string; label: string; sortable?: boolean; width?: string; className?: string
  render?: (value: unknown, row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]; data: T[]; getRowKey: (row: T) => string
  onRowClick?: (row: T) => void; selectable?: boolean; searchable?: boolean
  searchPlaceholder?: string; exportable?: boolean; emptyState?: ReactNode
  loading?: boolean; pageSize?: number; className?: string
}

export function DataTable<T>({
  columns, data, getRowKey, onRowClick, selectable = false, searchable = true,
  searchPlaceholder = 'Search...', exportable = true, loading = false, pageSize = 10, className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = data.filter(row => !search || Object.values(row as Record<string,unknown>).some(v => String(v).toLowerCase().includes(search.toLowerCase())))
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0
    const av = (a as Record<string,unknown>)[sortKey], bv = (b as Record<string,unknown>)[sortKey]
    if (av === bv) return 0
    return (String(av) < String(bv) ? -1 : 1) * (sortDir === 'asc' ? 1 : -1)
  })
  const totalPages = Math.ceil(sorted.length / pageSize)
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className={cn('space-y-3', className)}>
      {(searchable || exportable) && (
        <div className="flex items-center gap-3 flex-wrap">
          {searchable && (
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input type="text" placeholder={searchPlaceholder} value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="input pl-9 py-2 text-sm" />
            </div>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {selected.size > 0 && <Badge variant="primary">{selected.size} selected</Badge>}
            <Button variant="outline" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button>
            {exportable && <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>}
          </div>
        </div>
      )}

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50/60 dark:bg-neutral-800/60">
                {selectable && (
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={selected.size === paged.length && paged.length > 0} onChange={() => setSelected(s => s.size === paged.length ? new Set() : new Set(paged.map(r => getRowKey(r))))} className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600" />
                  </th>
                )}
                {columns.map(col => (
                  <th key={col.key} style={col.width ? { width: col.width } : undefined} onClick={col.sortable ? () => { if (sortKey === col.key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(col.key); setSortDir('asc') } } : undefined}
                    className={cn('px-4 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider', col.sortable && 'cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300', col.className)}>
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && <span className="flex flex-col"><ChevronUp className={cn('w-2.5 h-2.5', sortKey === col.key && sortDir === 'asc' ? 'text-primary-500' : 'text-neutral-300')} /><ChevronDown className={cn('w-2.5 h-2.5 -mt-0.5', sortKey === col.key && sortDir === 'desc' ? 'text-primary-500' : 'text-neutral-300')} /></span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
              {loading ? Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>{Array.from({ length: columns.length + (selectable ? 1 : 0) }).map((__, j) => <td key={j} className="px-4 py-3.5"><div className="shimmer h-4 w-3/4 rounded" /></td>)}</tr>
              )) : paged.length === 0 ? (
                <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center text-sm text-neutral-400">No results found</td></tr>
              ) : paged.map(row => {
                const key = getRowKey(row)
                return (
                  <tr key={key} onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn('transition-colors duration-100', onRowClick && 'cursor-pointer', selected.has(key) ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'hover:bg-neutral-50/80 dark:hover:bg-neutral-700/30')}>
                    {selectable && <td className="w-10 px-4 py-3.5" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selected.has(key)} onChange={() => setSelected(s => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n })} className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600" /></td>}
                    {columns.map(col => <td key={col.key} className={cn('px-4 py-3.5 text-sm text-neutral-700 dark:text-neutral-300', col.className)}>{col.render ? col.render((row as Record<string,unknown>)[col.key], row) : String((row as Record<string,unknown>)[col.key] ?? '')}</td>)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50/40 dark:bg-neutral-800/40">
            <span className="text-xs text-neutral-500">{((page-1)*pageSize)+1}–{Math.min(page*pageSize,sorted.length)} of {sorted.length}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="btn btn-ghost btn-xs disabled:opacity-40">‹</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { const p = totalPages <= 5 ? i+1 : page <= 3 ? i+1 : page+i-2; if (p < 1 || p > totalPages) return null; return <button key={p} onClick={() => setPage(p)} className={cn('btn btn-xs min-w-[28px]', page===p ? 'btn-primary' : 'btn-ghost')}>{p}</button> })}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="btn btn-ghost btn-xs disabled:opacity-40">›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
