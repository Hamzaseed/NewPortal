import Icon from '../components/ui/Icon'

const roleCards = [
  {
    title: 'Super Admin',
    summary: 'Owns platform governance, global settings, user roles, billing rules and newsroom operations.',
    count: '1 primary account',
    tone: 'bg-primary text-white',
  },
  {
    title: 'Author',
    summary: 'Creates stories, manages own drafts, reviews personal analytics and edits publishing preferences.',
    count: 'Editorial workspace',
    tone: 'bg-slate-900 text-white',
  },
  {
    title: 'User Unsubscribed',
    summary: 'Can browse public content, save limited items and manage a basic account profile.',
    count: 'Public access',
    tone: 'bg-white text-slate-900 border border-primary/10',
  },
  {
    title: 'User Subscribed',
    summary: 'Gets premium reading access, saved content continuity and subscriber-only product benefits.',
    count: 'Paid access',
    tone: 'bg-amber-50 text-slate-900 border border-amber-200',
  },
]

const permissionGroups = [
  {
    title: 'Editorial Publishing',
    description: 'Permissions around writing, publishing, editing and content removal.',
    rows: [
      ['Create articles', true, true, false, false],
      ['Publish articles', true, true, false, false],
      ['Edit own drafts', true, true, false, false],
      ['Edit published stories', true, true, false, false],
      ['Delete stories', true, false, false, false],
    ],
  },
  {
    title: 'Account And Access',
    description: 'What each persona can manage in profile, account and access settings.',
    rows: [
      ['Manage own profile', true, true, true, true],
      ['Access admin panel', true, false, false, false],
      ['Access author workspace', true, true, false, false],
      ['Manage saved stories', true, true, true, true],
      ['Access subscriber-only content', true, false, false, true],
    ],
  },
  {
    title: 'Platform Control',
    description: 'Higher-level actions for site settings, moderation and user administration.',
    rows: [
      ['Manage categories', true, false, false, false],
      ['Manage subscribers', true, false, false, false],
      ['Moderate comments', true, false, false, false],
      ['Edit site settings', true, false, false, false],
      ['Manage permissions', true, false, false, false],
    ],
  },
]

const moduleAccess = [
  {
    module: 'Admin Dashboard',
    owner: 'Platform Control',
    superAdmin: 'Full',
    author: 'No access',
    unsubscribed: 'No access',
    subscribed: 'No access',
  },
  {
    module: 'Author Workspace',
    owner: 'Editorial Team',
    superAdmin: 'Full',
    author: 'Full',
    unsubscribed: 'No access',
    subscribed: 'No access',
  },
  {
    module: 'Newsroom Frontend',
    owner: 'Audience Experience',
    superAdmin: 'Full preview',
    author: 'Public preview',
    unsubscribed: 'Public only',
    subscribed: 'Public + premium',
  },
  {
    module: 'Saved Stories',
    owner: 'Reader Accounts',
    superAdmin: 'Manage + view',
    author: 'Manage own',
    unsubscribed: 'Basic save',
    subscribed: 'Unlimited save',
  },
  {
    module: 'Premium Content',
    owner: 'Subscriptions',
    superAdmin: 'Full control',
    author: 'No access by role',
    unsubscribed: 'Locked',
    subscribed: 'Unlocked',
  },
]

const approvalFlow = [
  {
    title: 'Role Changes',
    detail: 'Only the super admin can assign or remove elevated platform permissions.',
    status: 'Super Admin Only',
  },
  {
    title: 'Premium Access Rules',
    detail: 'Subscriber benefits are applied to paid accounts while unsubscribed users stay on public-only access.',
    status: 'Enforced',
  },
  {
    title: 'Author Publishing Gate',
    detail: 'Authors can create and publish editorial content, but cannot change platform permissions or billing logic.',
    status: 'Active',
  },
]

function PermissionIcon({ allowed }) {
  return (
    <Icon
      name={allowed ? 'check_circle' : 'cancel'}
      className={allowed ? 'h-5 w-5 text-green-600' : 'h-5 w-5 text-slate-300'}
    />
  )
}

function AdminPermissionsPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Admin Control</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Permission Management</h1>
          <p className="mt-2 max-w-2xl text-xs text-slate-500 sm:text-sm">
            Control access for super admin, author, unsubscribed users and subscribed users across the product.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded border border-primary/20 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-primary/5">
            Export Policy
          </button>
          <button type="button" className="rounded bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
            Save Permission Changes
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {roleCards.map((role) => (
          <article key={role.title} className={`space-y-3 rounded-xl p-6 shadow-sm ${role.tone}`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{role.title}</h2>
              <span className={`text-xs font-bold uppercase tracking-[0.18em] ${role.tone.includes('text-white') ? 'text-white/70' : 'text-slate-500'}`}>
                {role.count}
              </span>
            </div>
            <p className={`text-sm leading-6 ${role.tone.includes('text-white') ? 'text-white/80' : 'text-slate-600'}`}>
              {role.summary}
            </p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.8fr)]">
        <div className="space-y-8">
          {permissionGroups.map((group) => (
            <article key={group.title} className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
              <div className="border-b border-primary/10 px-6 py-5">
                <h3 className="text-xl font-bold">{group.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{group.description}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left">
                  <thead className="bg-background-light">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Permission</th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Super Admin</th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Author</th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Unsubscribed</th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {group.rows.map(([label, superAdmin, author, unsubscribed, subscribed]) => (
                      <tr key={label}>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{label}</td>
                        <td className="px-6 py-4"><div className="flex justify-center"><PermissionIcon allowed={superAdmin} /></div></td>
                        <td className="px-6 py-4"><div className="flex justify-center"><PermissionIcon allowed={author} /></div></td>
                        <td className="px-6 py-4"><div className="flex justify-center"><PermissionIcon allowed={unsubscribed} /></div></td>
                        <td className="px-6 py-4"><div className="flex justify-center"><PermissionIcon allowed={subscribed} /></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-8">
          <article className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Icon name="dashboard" className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Module Access</h3>
            </div>
            <div className="space-y-4">
              {moduleAccess.map((item) => (
                <div key={item.module} className="rounded-lg border border-primary/10 bg-background-light p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900">{item.module}</p>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.owner}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-500">Super Admin</p>
                      <p className="mt-1 text-slate-700">{item.superAdmin}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-500">Author</p>
                      <p className="mt-1 text-slate-700">{item.author}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-500">Unsubscribed</p>
                      <p className="mt-1 text-slate-700">{item.unsubscribed}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-500">Subscribed</p>
                      <p className="mt-1 text-slate-700">{item.subscribed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Icon name="gavel" className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Approval Rules</h3>
            </div>
            <div className="space-y-4">
              {approvalFlow.map((item) => (
                <div key={item.title} className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <span className="rounded bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-primary/10 bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Audit Trail</p>
            <h3 className="mt-2 text-xl font-bold">Recent Permission Activity</h3>
            <div className="mt-5 space-y-4">
              {[
                'Super admin updated subscriber premium access rules',
                'Author workspace remained isolated from admin controls',
                'Public user access policy reviewed for unsubscribed readers',
              ].map((item) => (
                <div key={item} className="border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default AdminPermissionsPage
