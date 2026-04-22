

const mockUsers = [
  { id: 1, name: 'Marek Nowak', email: 'marek.nowak@firma.pl', role: 'pracownik', company: 'Metalex Sp. z o.o.', status: 'aktywny', lastLogin: '2025-04-21' },
  { id: 2, name: 'Katarzyna Wiśniewska', email: 'k.wisniewska@metalex.pl', role: 'pracodawca', company: 'Metalex Sp. z o.o.', status: 'aktywny', lastLogin: '2025-04-20' },
  { id: 3, name: 'Jan Kowalski', email: 'j.kowalski@budpol.pl', role: 'pracodawca', company: 'Budpol S.A.', status: 'zawieszony', lastLogin: '2025-03-15' },
  { id: 4, name: 'Paula Żerko', email: 'p.zerko@bhp-platform.pl', role: 'admin', company: 'SafeWork BHP', status: 'aktywny', lastLogin: '2025-04-21' },
];

const systemStats = [
  { label: 'Użytkownicy', value: '247', icon: '👥', color: 'var(--info)' },
  { label: 'Firmy', value: '38', icon: '🏢', color: 'var(--accent)' },
  { label: 'Szkoleń', value: '1,204', icon: '📚', color: 'var(--success)' },
  { label: 'Certyfikatów', value: '3,891', icon: '🏅', color: 'var(--warning)' },
];

const roleBadge = (role: string) => {
  if (role === 'admin') return <span className="badge badge-danger">Admin</span>;
  if (role === 'pracodawca') return <span className="badge badge-info">Pracodawca</span>;
  return <span className="badge badge-neutral">Pracownik</span>;
};

const statusBadge = (status: string) => {
  if (status === 'aktywny') return <span className="badge badge-success">Aktywny</span>;
  return <span className="badge badge-warning">Zawieszony</span>;
};

export default function AdminPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Panel administracyjny</h2>
            <p className="page-subtitle">Zarządzanie platformą SafeWork BHP — widok koncepcyjny</p>
          </div>
          <span className="badge badge-warning" style={{ fontSize: 12 }}>🔧 Tryb koncepcyjny</span>
        </div>
      </div>

      {/* Info banner */}
      <div style={{ background: 'var(--info-bg)', border: '1px solid var(--info)', borderLeft: '4px solid var(--info)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 24, fontSize: 13.5, color: '#1D4ED8' }}>
        ℹ️ Ta sekcja prezentuje koncepcję panelu administracyjnego. W wersji produkcyjnej dostęp byłby ograniczony wyłącznie do administratorów systemu.
      </div>

      {/* System stats */}
      <div className="test-stats-grid" style={{ gap: 14, marginBottom: 28 }}>
        {systemStats.map((s) => (
          <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-grid" style={{ alignItems: 'start' }}>
        <div>
          {/* Users table */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">Zarządzanie użytkownikami</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" placeholder="Szukaj..." style={{ width: 180, fontSize: 13, padding: '7px 12px' }} />
                <button className="btn btn-primary btn-sm">+ Nowy użytkownik</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Użytkownik</th>
                    <th>Firma</th>
                    <th>Rola</th>
                    <th>Status</th>
                    <th>Ostatnie logowanie</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="table-name">{u.name}</div>
                        <div className="table-sub">{u.email}</div>
                      </td>
                      <td><span style={{ fontSize: 13 }}>{u.company}</span></td>
                      <td>{roleBadge(u.role)}</td>
                      <td>{statusBadge(u.status)}</td>
                      <td><span className="table-mono">{u.lastLogin}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-outline btn-sm">✏️</button>
                          <button className="btn btn-danger btn-sm">🚫</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Companies */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">Firmy w systemie</h3>
              <button className="btn btn-primary btn-sm">+ Dodaj firmę</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { name: 'Metalex Sp. z o.o.', type: 'Produkcja', employees: 7, plan: 'Business', status: 'aktywna' },
                { name: 'Budpol S.A.', type: 'Budownictwo', employees: 15, plan: 'Enterprise', status: 'aktywna' },
                { name: 'Logist Trans', type: 'Transport', employees: 3, plan: 'Starter', status: 'próbny' },
                { name: 'Adminpro Sp. z o.o.', type: 'Usługi', employees: 12, plan: 'Business', status: 'aktywna' },
              ].map((c) => (
                <div key={c.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.type}</div>
                    </div>
                    <span className={`badge ${c.status === 'aktywna' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span>👥 {c.employees} pracowników</span>
                    <span className="badge badge-info">{c.plan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          {/* System health */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><span className="card-title">Stan systemu</span></div>
            <div className="card-body">
              {[
                { service: 'API Backend', status: 'online', latency: '24ms' },
                { service: 'Baza danych', status: 'online', latency: '8ms' },
                { service: 'Serwer plików', status: 'online', latency: '112ms' },
                { service: 'Email (SMTP)', status: 'online', latency: '—' },
                { service: 'Powiadomienia push', status: 'degraded', latency: '350ms' },
              ].map((s) => (
                <div key={s.service} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.status === 'online' ? 'var(--success)' : 'var(--warning)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{s.service}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{s.latency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><span className="card-title">Ostatnia aktywność</span></div>
            <div>
              {[
                { action: 'Nowy użytkownik zarejestrowany', time: '2 min temu', icon: '👤' },
                { action: 'Certyfikat wygenerowany', time: '15 min temu', icon: '🏅' },
                { action: 'Test zaliczony: BHP podstawowy', time: '1h temu', icon: '✅' },
                { action: 'Firma Budpol zaktualizowana', time: '3h temu', icon: '🏢' },
                { action: 'Backup bazy danych', time: '6h temu', icon: '💾' },
              ].map((a) => (
                <div key={a.action} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 16 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{a.action}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin actions */}
          <div className="card">
            <div className="card-header"><span className="card-title">Akcje systemu</span></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>🔄 Wymuś synchronizację</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>📦 Backup bazy danych</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>📊 Generuj raport systemu</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>📧 Wyślij newsletter</button>
              <button className="btn btn-danger w-full" style={{ justifyContent: 'center', marginTop: 4 }}>⚠️ Tryb konserwacji</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
