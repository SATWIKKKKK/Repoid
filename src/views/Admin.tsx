// Admin login URL: /admin/login. Root credentials come from ADMIN_EMAIL plus ADMIN_PASSWORD_HASH;
// ADMIN_PASSWORD is only a first boot/local bootstrap fallback and should not be used in production.
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Github, LogOut, RefreshCw, Shield, Users } from 'lucide-react';
import { adminFetch } from '../lib/adminApi';

type AdminUser = { id: string; email: string; isRoot: boolean };
type Tab = 'overview' | 'users' | 'rounds' | 'domains' | 'payments' | 'github' | 'admins';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'rounds', label: 'Rounds Analytics' },
  { id: 'domains', label: 'Domain Usage' },
  { id: 'payments', label: 'Payments' },
  { id: 'github', label: 'GitHub Scanner' },
  { id: 'admins', label: 'Admin Management' },
];

function money(value: number) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`;
}

function date(value?: string | null) {
  return value ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
}

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminFetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <form onSubmit={submit} className="mx-auto mt-20 max-w-md surface-card rounded-2xl p-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 p-3 text-primary"><Shield size={22} /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blueprint-muted">Repoid Admin</p>
            <h1 className="text-2xl font-bold text-primary">Superadmin login</h1>
          </div>
        </div>
        <label className="mb-4 block text-sm font-semibold text-primary">Email
          <input className="mt-2 w-full rounded-xl border border-blueprint-line bg-card px-4 py-3 text-primary outline-none focus:border-primary" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" />
        </label>
        <label className="mb-6 block text-sm font-semibold text-primary">Password
          <input className="mt-2 w-full rounded-xl border border-blueprint-line bg-card px-4 py-3 text-primary outline-none focus:border-primary" value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" />
        </label>
        {error ? <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">{error}</p> : null}
        <button className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground transition hover:opacity-90" disabled={loading}>{loading ? 'Loading...' : 'Sign in'}</button>
      </form>
    </main>
  );
}

function DataTable({ rows }: { rows: any[] }) {
  const keys = useMemo(() => Object.keys(rows[0] ?? {}).slice(0, 8), [rows]);
  if (!rows.length) return <p className="surface-inset rounded-xl p-5 text-sm text-blueprint-muted">No data yet.</p>;
  return (
    <div className="overflow-x-auto rounded-xl border border-blueprint-line">
      <table className="min-w-full divide-y divide-blueprint-line text-sm">
        <thead className="bg-card text-left text-xs uppercase tracking-wide text-blueprint-muted">
          <tr>{keys.map((key) => <th key={key} className="px-4 py-3">{key.replace(/_/g, ' ')}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-blueprint-line">
          {rows.map((row, index) => (
            <tr key={row.id ?? index} className="hover:bg-card/50">
              {keys.map((key) => <td key={key} className="max-w-[260px] truncate px-4 py-3 text-primary">{typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key] ?? '-')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminDashboard({ admin }: { admin: AdminUser }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });

  async function load() {
    setLoading(true);
    setError('');
    try {
      const endpoint = tab === 'github' ? '/api/admin/github-scans' : `/api/admin/${tab === 'admins' ? 'admins' : tab}`;
      const suffix = tab === 'users' && search ? `?search=${encodeURIComponent(search)}` : '';
      setData(await adminFetch(`${endpoint}${suffix}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, [tab]);

  async function logout() {
    await adminFetch('/api/admin/logout', { method: 'POST', body: '{}' });
    navigate('/admin/login', { replace: true });
  }

  async function openUser(id: string) {
    setSelectedUser(await adminFetch(`/api/admin/users/${id}`));
  }

  async function addAdmin(event: React.FormEvent) {
    event.preventDefault();
    await adminFetch('/api/admin/admins', { method: 'POST', body: JSON.stringify(newAdmin) });
    setNewAdmin({ email: '', password: '' });
    await load();
  }

  async function removeAdmin(id: string) {
    await adminFetch(`/api/admin/admins/${id}`, { method: 'DELETE' });
    await load();
  }

  const overviewCards = data && tab === 'overview' ? [
    ['Users', data.users],
    ['Rounds completed', data.roundsCompleted],
    ['Practice sessions', data.practiceSessions],
    ['Repo scans', data.repoScans],
    ['AI questions', data.questionsGenerated],
    ['PDF exports', data.pdfExports],
    ['Revenue', money(data.revenue?.totalRupees)],
    ['Monthly / Yearly', `${money(data.revenue?.monthlyRupees)} / ${money(data.revenue?.yearlyRupees)}`],
  ] : [];

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-blueprint-line px-5 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-primary/10 p-2 text-primary"><BarChart3 size={20} /></span>
            <div><h1 className="text-2xl font-bold text-primary">Superadmin Dashboard</h1><p className="text-sm text-blueprint-muted">{admin.email}</p></div>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-blueprint-line px-4 py-2 text-sm text-primary hover:bg-card"><LogOut size={16} /> Logout</button>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-6 lg:grid-cols-[260px_1fr]">
        <nav className="surface-card rounded-2xl p-2 lg:sticky lg:top-5 lg:self-start">
          {tabs.map((item) => <button key={item.id} onClick={() => setTab(item.id)} className={`mb-1 w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${tab === item.id ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-card'}`}>{item.label}</button>)}
        </nav>
        <section className="surface-card min-w-0 rounded-2xl p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blueprint-muted">{tabs.find((item) => item.id === tab)?.label}</p><h2 className="mt-1 text-xl font-bold text-primary">Live Neon data</h2></div>
            <div className="flex gap-2">
              {tab === 'users' ? <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && load()} className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-sm text-primary outline-none" placeholder="Search users" /> : null}
              <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-background"><RefreshCw size={15} /> Refresh</button>
            </div>
          </div>
          {loading ? <p className="py-12 text-center text-blueprint-muted">Loading...</p> : null}
          {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-600 dark:text-red-300">{error}</p> : null}
          {!loading && !error && tab === 'overview' ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{overviewCards.map(([label, value]) => <div key={label} className="surface-inset rounded-xl p-4"><p className="text-sm text-blueprint-muted">{label}</p><p className="mt-2 text-2xl font-bold text-primary">{value}</p></div>)}</div> : null}
          {!loading && !error && tab === 'users' ? <DataTable rows={(data?.rows ?? []).map((row: any) => ({ ...row, plan_expiry: date(row.plan_expiry), joined_at: date(row.joined_at) }))} /> : null}
          {!loading && !error && tab === 'users' && data?.rows?.length ? <div className="mt-3 flex flex-wrap gap-2">{data.rows.slice(0, 20).map((row: any) => <button key={row.id} onClick={() => openUser(row.id)} className="rounded-full border border-blueprint-line px-3 py-1 text-xs text-primary hover:bg-card">{row.email}</button>)}</div> : null}
          {!loading && !error && tab === 'rounds' ? <><h3 className="mb-2 font-semibold text-primary">By round type</h3><DataTable rows={data?.byType ?? []} /><h3 className="mb-2 mt-6 font-semibold text-primary">Top users</h3><DataTable rows={data?.topUsers ?? []} /></> : null}
          {!loading && !error && tab === 'domains' ? <DataTable rows={data?.rows ?? []} /> : null}
          {!loading && !error && tab === 'payments' ? <><div className="mb-4 surface-inset rounded-xl p-4 text-primary">Total revenue: {money(data?.totalRupees)}</div><DataTable rows={data?.rows ?? []} /></> : null}
          {!loading && !error && tab === 'github' ? <><div className="mb-4 inline-flex items-center gap-2 text-blueprint-muted"><Github size={17} /> {data?.total ?? 0} repos scanned</div><DataTable rows={data?.rows ?? []} /></> : null}
          {!loading && !error && tab === 'admins' ? <><form onSubmit={addAdmin} className="mb-5 grid gap-3 surface-inset rounded-xl p-4 md:grid-cols-[1fr_1fr_auto]"><input className="rounded-xl border border-blueprint-line bg-card px-4 py-3 text-primary outline-none" placeholder="admin@email.com" value={newAdmin.email} onChange={(event) => setNewAdmin({ ...newAdmin, email: event.target.value })} /><input className="rounded-xl border border-blueprint-line bg-card px-4 py-3 text-primary outline-none" placeholder="Password" type="password" value={newAdmin.password} onChange={(event) => setNewAdmin({ ...newAdmin, password: event.target.value })} /><button className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Add admin</button></form><div className="space-y-2">{(data?.rows ?? []).map((row: any) => <div key={row.id} className="flex flex-wrap items-center justify-between gap-3 surface-inset rounded-xl p-3"><span className="text-primary">{row.email} {row.is_root ? <b className="ml-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">ROOT</b> : null}</span><button disabled={row.is_root} onClick={() => removeAdmin(row.id)} className="rounded-full border border-red-400/30 px-3 py-1 text-sm text-red-600 disabled:opacity-40 dark:text-red-300">Remove</button></div>)}</div></> : null}
        </section>
      </div>
      {selectedUser ? <div className="fixed inset-0 z-50 bg-black/60 p-4" onClick={() => setSelectedUser(null)}><div className="ml-auto h-full max-w-2xl overflow-y-auto surface-card rounded-2xl p-5" onClick={(event) => event.stopPropagation()}><button className="mb-4 rounded-full border border-blueprint-line px-3 py-1 text-primary hover:bg-card" onClick={() => setSelectedUser(null)}>Close</button><h2 className="text-xl font-bold text-primary">{selectedUser.user?.name}</h2><p className="text-blueprint-muted">{selectedUser.user?.email}</p><h3 className="mt-6 font-semibold text-primary">Rounds</h3><DataTable rows={selectedUser.rounds ?? []} /><h3 className="mt-6 font-semibold text-primary">Practice</h3><DataTable rows={selectedUser.practice ?? []} /><h3 className="mt-6 font-semibold text-primary">Repos</h3><DataTable rows={selectedUser.repos ?? []} /><h3 className="mt-6 font-semibold text-primary">Payments</h3><DataTable rows={selectedUser.payments ?? []} /></div></div> : null}
    </main>
  );
}

export default function Admin() {
  const location = useLocation();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    adminFetch<{ admin: AdminUser }>('/api/admin/me')
      .then((payload) => setAdmin(payload.admin))
      .catch(() => setAdmin(null))
      .finally(() => setChecked(true));
  }, [location.pathname]);

  if (location.pathname === '/admin/login') return <AdminLogin />;
  if (!checked) return <main className="min-h-screen bg-background py-20 text-center text-primary">Loading...</main>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <AdminDashboard admin={admin} />;
}
