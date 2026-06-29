import { Card, CardHeader } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { StatusBadge, Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { productsData } from '../data/mockData'
import { formatCurrency } from '../utils'
import { Plus, Package, AlertTriangle, XCircle, BarChart2 } from 'lucide-react'

const columns: Column<typeof productsData[0]>[] = [
  { key: 'name', label: 'Product', sortable: true, render: (v, r) => <div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{v as string}</p><p className="text-xs text-neutral-400 font-mono">{r.sku}</p></div> },
  { key: 'category', label: 'Category', render: v => <Badge variant="secondary">{v as string}</Badge> },
  { key: 'price', label: 'Price', sortable: true, render: v => <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(v as number)}</span> },
  { key: 'stock', label: 'Stock', sortable: true },
  { key: 'reorderPoint', label: 'Reorder At' },
  { key: 'sold', label: 'Sold', sortable: true, render: v => <span className="font-medium">{(v as number).toLocaleString()}</span> },
  { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={v as string} /> },
]

export function InventoryPage() {
  const inStock = productsData.filter(p => p.status === 'in-stock').length
  const lowStock = productsData.filter(p => p.status === 'low-stock').length
  const outOfStock = productsData.filter(p => p.status === 'out-of-stock').length
  const totalValue = productsData.reduce((s, p) => s + (p.price * p.stock), 0)

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Inventory</h1><p className="text-sm text-neutral-500 mt-1">Monitor stock levels and product availability.</p></div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>Add Product</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'In Stock', value: inStock, icon: Package, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20', sub: `${productsData.length} total products` },
          { label: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20', sub: 'Needs restocking' },
          { label: 'Out of Stock', value: outOfStock, icon: XCircle, color: 'text-danger-600', bg: 'bg-danger-50 dark:bg-danger-900/20', sub: 'Immediate action' },
          { label: 'Inventory Value', value: formatCurrency(totalValue), icon: BarChart2, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20', sub: 'Total stock value' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}><s.icon className={`w-[18px] h-[18px] ${s.color}`} /></div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p>
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{s.value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      {(lowStock > 0 || outOfStock > 0) && (
        <Card className="p-5 border-warning-200 dark:border-warning-800/40 bg-warning-50/50 dark:bg-warning-900/10">
          <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-warning-600" /><h3 className="text-sm font-semibold text-warning-800 dark:text-warning-300">Stock Alerts</h3></div>
          <div className="space-y-2">
            {productsData.filter(p => p.status !== 'in-stock').map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-xl">
                <div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{p.name}</p><p className="text-xs text-neutral-400 font-mono">{p.sku}</p></div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-neutral-500">Stock: <span className="font-semibold">{p.stock}</span> / Min: <span className="font-semibold">{p.reorderPoint}</span></p>
                  <StatusBadge status={p.status} />
                  <Button variant="primary" size="xs">Reorder</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <DataTable columns={columns} data={productsData} getRowKey={r => r.id} selectable searchable searchPlaceholder="Search products…" exportable pageSize={8} />

      <Card className="p-5">
        <CardHeader title="Top Selling Products" subtitle="By units sold" />
        <div className="space-y-3">
          {[...productsData].sort((a, b) => b.sold - a.sold).slice(0, 5).map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-400 w-4">#{i+1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1 text-sm"><p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">{p.name}</p><span className="text-neutral-500 flex-shrink-0 ml-2">{p.sold.toLocaleString()} units</span></div>
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className="h-full rounded-full bg-primary-500" style={{ width: `${(p.sold / productsData[0].sold) * 100}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
