import { Card, CardHeader } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { StatusBadge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ordersData } from '../data/mockData'
import { formatCurrency } from '../utils'
import { Plus, ShoppingCart, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'

const columns: Column<typeof ordersData[0]>[] = [
  { key: 'orderNumber', label: 'Order #', sortable: true, render: v => <span className="text-sm font-mono font-medium text-primary-600 dark:text-primary-400">{v as string}</span> },
  { key: 'customer', label: 'Customer', sortable: true, render: (v, r) => <div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{v as string}</p><p className="text-xs text-neutral-400">{r.customerEmail}</p></div> },
  { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={v as string} /> },
  { key: 'paymentStatus', label: 'Payment', render: v => <StatusBadge status={v as string} /> },
  { key: 'total', label: 'Total', sortable: true, render: v => <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(v as number)}</span> },
  { key: 'items', label: 'Items', render: v => <span className="text-neutral-500">{v as number} items</span> },
  { key: 'fulfillmentStatus', label: 'Fulfillment', render: v => <StatusBadge status={v as string} /> },
  { key: 'date', label: 'Date', sortable: true, render: v => <span className="text-xs text-neutral-400">{v as string}</span> },
]

export function OrdersPage() {
  const total = ordersData.reduce((s, o) => s + o.total, 0)
  const pending = ordersData.filter(o => o.status === 'pending').length
  const shipped = ordersData.filter(o => o.status === 'shipped').length
  const delivered = ordersData.filter(o => o.status === 'delivered').length
  const cancelled = ordersData.filter(o => o.status === 'cancelled').length

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Orders</h1><p className="text-sm text-neutral-500 mt-1">Track orders, fulfillment, and payments.</p></div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Order</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Revenue', value: formatCurrency(total), icon: ShoppingCart, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
          { label: 'Pending', value: pending, icon: Clock, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-900/20' },
          { label: 'Shipped', value: shipped, icon: Truck, color: 'text-secondary-600', bg: 'bg-secondary-50 dark:bg-secondary-900/20' },
          { label: 'Delivered', value: delivered, icon: CheckCircle, color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-900/20' },
          { label: 'Cancelled', value: cancelled, icon: XCircle, color: 'text-danger-600', bg: 'bg-danger-50 dark:bg-danger-900/20' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${s.bg}`}><s.icon className={`w-4 h-4 ${s.color}`} /></div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <CardHeader title="Fulfillment Overview" subtitle="Order status distribution" />
        <div className="space-y-3">
          {[
            { label: 'Delivered', count: delivered, color: 'bg-success-500' },
            { label: 'Shipped', count: shipped, color: 'bg-secondary-500' },
            { label: 'Processing', count: ordersData.filter(o => o.status === 'processing').length, color: 'bg-primary-500' },
            { label: 'Pending', count: pending, color: 'bg-warning-500' },
            { label: 'Cancelled', count: cancelled, color: 'bg-danger-500' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 w-24">{item.label}</span>
              <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / ordersData.length) * 100}%` }} /></div>
              <div className="flex items-center gap-2 text-xs"><span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.count}</span><span className="text-neutral-400">{((item.count / ordersData.length) * 100).toFixed(0)}%</span></div>
            </div>
          ))}
        </div>
      </Card>

      <DataTable columns={columns} data={ordersData} getRowKey={r => r.id} selectable searchable searchPlaceholder="Search orders…" exportable pageSize={8} />
    </div>
  )
}
