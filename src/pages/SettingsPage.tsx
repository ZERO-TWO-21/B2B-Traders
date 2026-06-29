import { useState } from 'react'
import { Card, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Misc'
import { Building2, Users, CreditCard, Shield, Key, Puzzle, Lock, Activity, Palette, ChevronRight, Check, Eye, EyeOff, Plus } from 'lucide-react'
import { cn } from '../utils'

const tabs = [
  { id:'organization', label:'Organization', icon:Building2 },
  { id:'team', label:'Team Management', icon:Users },
  { id:'billing', label:'Billing', icon:CreditCard },
  { id:'roles', label:'Roles & Permissions', icon:Shield },
  { id:'api', label:'API Keys', icon:Key },
  { id:'integrations', label:'Integrations', icon:Puzzle },
  { id:'security', label:'Security', icon:Lock },
  { id:'audit', label:'Audit Logs', icon:Activity },
  { id:'appearance', label:'Appearance', icon:Palette },
]

const integrations = [
  { name:'Salesforce', desc:'Sync CRM data', icon:'⚡', connected:true },
  { name:'Slack', desc:'Notifications and alerts', icon:'💬', connected:true },
  { name:'HubSpot', desc:'Marketing automation', icon:'🔶', connected:false },
  { name:'Stripe', desc:'Payment processing', icon:'💳', connected:true },
  { name:'Zendesk', desc:'Customer support', icon:'🎫', connected:false },
  { name:'GitHub', desc:'Code repository', icon:'🐙', connected:true },
]

const auditLogs = [
  { user:'Alex Rivera', action:'Updated pricing plan', time:'2 min ago', type:'settings' },
  { user:'Sarah Chen', action:'Exported customer data', time:'15 min ago', type:'data' },
  { user:'Marcus Williams', action:'Added API key: prod-key-3', time:'1 hour ago', type:'security' },
  { user:'James Park', action:'Invited member: elena@company.com', time:'3 hours ago', type:'team' },
  { user:'System', action:'Backup completed successfully', time:'6 hours ago', type:'system' },
]

function OrgTab() {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <CardHeader title="Organization Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[['Company Name','Acme Corporation'],['Website','https://acmecorp.com'],['Industry','Technology'],['Company Size','51-200'],['Primary Email','admin@acmecorp.com'],['Phone','+1 (415) 555-0100']].map(([l, v]) => (
            <div key={l}><label className="label block mb-1.5">{l}</label><input type="text" defaultValue={v} className="input" /></div>
          ))}
        </div>
        <div className="flex justify-end mt-4"><Button variant="primary">Save Changes</Button></div>
      </Card>
      <Card className="p-5">
        <CardHeader title="Danger Zone" subtitle="Irreversible actions" />
        <div className="flex items-center justify-between p-4 rounded-xl border border-danger-200 dark:border-danger-800/40 bg-danger-50/50 dark:bg-danger-900/10">
          <div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Delete Organization</p><p className="text-xs text-neutral-500 mt-0.5">Permanently delete this workspace and all data.</p></div>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </Card>
    </div>
  )
}

function IntTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrations.map(i => (
          <Card key={i.name} className="p-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-xl flex-shrink-0">{i.icon}</div><div><p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{i.name}</p><p className="text-xs text-neutral-500">{i.desc}</p></div></div>
            {i.connected ? <div className="flex items-center gap-2 flex-shrink-0"><Badge variant="success" dot>Connected</Badge><Button variant="outline" size="xs">Config</Button></div> : <Button variant="primary" size="xs" className="flex-shrink-0">Connect</Button>}
          </Card>
        ))}
      </div>
    </div>
  )
}

function ApiTab() {
  const [show, setShow] = useState<Record<string, boolean>>({})
  const keys = [
    { id:'1', name:'Production Key', key:'sk_live_nexus_xKJh82nPQR4mV9sT', created:'Jan 1, 2024', lastUsed:'2 hours ago', active:true },
    { id:'2', name:'Development Key', key:'sk_test_nexus_xABc12dEFG5hI6jK', created:'Dec 15, 2023', lastUsed:'1 day ago', active:true },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><p className="text-sm text-neutral-600 dark:text-neutral-400">Manage API keys for programmatic access.</p><Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Generate Key</Button></div>
      {keys.map(k => (
        <Card key={k.id} className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1"><div className="flex items-center gap-2 mb-1.5"><p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{k.name}</p><Badge variant="success">active</Badge></div>
            <div className="flex items-center gap-2"><code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">{show[k.id] ? k.key : k.key.slice(0,12) + '•'.repeat(20) + k.key.slice(-4)}</code><button onClick={() => setShow(s => ({...s, [k.id]: !s[k.id]}))} className="text-neutral-400 hover:text-neutral-600">{show[k.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button></div>
            <p className="text-[10px] text-neutral-400 mt-1">Created {k.created} · Last used {k.lastUsed}</p></div>
            <Button variant="danger" size="xs">Revoke</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

function AuditTab() {
  return (
    <Card className="p-5">
      <CardHeader title="Audit Log" subtitle="Track all actions in your workspace" />
      <div className="space-y-2">
        {auditLogs.map((log, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/30">
            <Avatar name={log.user === 'System' ? 'SY' : log.user} size="sm" />
            <div className="flex-1"><p className="text-sm text-neutral-700 dark:text-neutral-300"><span className="font-semibold text-neutral-900 dark:text-neutral-100">{log.user}</span> — {log.action}</p><p className="text-xs text-neutral-400 mt-0.5">{log.time}</p></div>
            <Badge variant={log.type === 'security' ? 'danger' : log.type === 'data' ? 'warning' : 'neutral'} className="text-[10px] flex-shrink-0">{log.type}</Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <CardHeader title="Two-Factor Authentication" />
        <div className="flex items-center justify-between p-4 rounded-xl bg-success-50 dark:bg-success-900/10 border border-success-200 dark:border-success-800/30">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center"><Check className="w-4 h-4 text-success-600" /></div><div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">2FA is enabled</p><p className="text-xs text-neutral-500">Authenticator app configured</p></div></div>
          <Button variant="outline" size="sm">Manage</Button>
        </div>
      </Card>
      <Card className="p-5">
        <CardHeader title="Change Password" />
        <div className="space-y-3">
          {['Current Password','New Password','Confirm Password'].map(l => (
            <div key={l}><label className="label block mb-1.5">{l}</label><input type="password" className="input" placeholder="••••••••••" /></div>
          ))}
          <div className="flex justify-end"><Button variant="primary">Update Password</Button></div>
        </div>
      </Card>
    </div>
  )
}

const tabContent: Record<string, React.FC> = {
  organization: OrgTab, integrations: IntTab, api: ApiTab, audit: AuditTab, security: SecurityTab,
}

export function SettingsPage() {
  const [active, setActive] = useState('organization')
  const TabContent = tabContent[active] || (() => <Card className="p-5"><p className="text-sm text-neutral-500">Coming soon.</p></Card>)

  return (
    <div className="page-container">
      <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Settings</h1><p className="text-sm text-neutral-500 mt-1">Configure workspace, team, and security.</p></div>
      <div className="flex gap-6 flex-col lg:flex-row">
        <aside className="lg:w-56 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button key={tab.id} onClick={() => setActive(tab.id)} className={cn('nav-item w-full text-left', active === tab.id && 'nav-item-active')}>
                  <Icon className="w-4 h-4 flex-shrink-0" /><span className="flex-1">{tab.label}</span><ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                </button>
              )
            })}
          </nav>
        </aside>
        <div className="flex-1 min-w-0"><TabContent /></div>
      </div>
    </div>
  )
}
