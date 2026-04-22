import { useState } from 'react';
import { employees, employerStats, employerUser } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import DashboardCard from '../components/DashboardCard';
import type { Employee } from '../types';

export default function EmployerDashboardPage() {
  const [selected, setSelected] = useState<Employee | null>(null);

  const complianceColor = (pct: number) =>
    pct >= 80 ? 'success' : pct >= 60 ? 'warning' : 'danger';

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Panel pracodawcy</h2>
            <p className="page-subtitle">
              {employerUser.company} · {employerUser.department} · {employerUser.name}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm">Eksportuj raport</button>
            <button className="btn btn-primary">+ Dodaj pracownika</button>
          </div>
        </div>
      </div>

      {/* Alert */}
      {employerStats.nonCompliant > 0 && (
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--danger)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{employerStats.nonCompliant} pracowników</span>
            <span style={{ color: 'var(--text-secondary)', marginLeft: 6 }}>nie spełnia wymogów BHP. Wymagane działanie.</span>
          </div>
          <button className="btn btn-outline btn-sm">Wyślij przypomnienie</button>
        </div>
      )}

      {/* Stats */}
      <div className="stat-cards">
        <DashboardCard value={employerStats.totalEmployees} label="Wszyscy pracownicy" variant="info" />
        <DashboardCard value={employerStats.compliant} label="Zgodnych" sub="Pełna zgodność BHP" variant="success" />
        <DashboardCard value={employerStats.inProgress} label="W trakcie" sub="Szkolenia niezakończone" variant="accent" />
        <DashboardCard value={employerStats.nonCompliant} label="Niezgodnych" sub="Wymagana interwencja" variant="danger" />
        <DashboardCard value={employerStats.expiringThisMonth} label="Wygasające" sub="W ciągu 90 dni" variant="warning" />
      </div>

      <div className="admin-grid" style={{ alignItems: 'start' }}>
        {/* Employee table */}
        <div>
          <div className="section-header">
            <h3 className="section-title">Lista pracowników</h3>
            <input
              type="text"
              className="form-input"
              placeholder="Szukaj pracownika..."
              style={{ maxWidth: 220, padding: '7px 12px', fontSize: 13 }}
            />
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pracownik</th>
                  <th>Stanowisko</th>
                  <th>Szkolenia</th>
                  <th>Zgodność</th>
                  <th>Status</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  const pct = Math.round((emp.completedTrainings / emp.totalTrainings) * 100);
                  return (
                    <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(emp)}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--dark)', flexShrink: 0 }}>
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="table-name">{emp.name}</div>
                            <div className="table-sub">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="table-name">{emp.position}</div>
                        <div className="table-sub">{emp.department}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{emp.completedTrainings}/{emp.totalTrainings}</div>
                        <div style={{ marginTop: 4, width: 80 }}>
                          <ProgressBar value={pct} color={complianceColor(pct)} height={5} />
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                            {pct}%
                          </span>
                          {emp.certificatesExpiring > 0 && (
                            <span className="badge badge-warning">{emp.certificatesExpiring} wygasa</span>
                          )}
                        </div>
                      </td>
                      <td><StatusBadge status={emp.complianceStatus} /></td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-outline btn-sm" onClick={() => setSelected(emp)}>Widok</button>
                          <button className="btn btn-primary btn-sm">E-mail</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel */}
        <div>
          {/* Employee detail */}
          {selected ? (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-header">
                <span className="card-title">Szczegóły pracownika</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--dark)' }}>
                    {selected.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{selected.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selected.position}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.department}</div>
                  </div>
                </div>
                {[
                  { label: 'E-mail', value: selected.email },
                  { label: 'Ukończone szkolenia', value: `${selected.completedTrainings}/${selected.totalTrainings}` },
                  { label: 'Oczekujące', value: selected.pendingTrainings },
                  { label: 'Wygasające certyfikaty', value: selected.certificatesExpiring },
                  { label: 'Ostatnia aktywność', value: selected.lastActivity },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                    <span style={{ fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn btn-primary btn-sm">Przypisz szkolenie</button>
                  <button className="btn btn-outline btn-sm">Wyślij e-mail</button>
                  {selected.complianceStatus === 'niezgodny' && (
                    <button className="btn btn-danger btn-sm">Raport naruszenia</button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '28px' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Kliknij na pracownika, aby zobaczyć szczegóły</div>
              </div>
            </div>
          )}

          {/* Compliance overview */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <span className="card-title">Zgodność wg działu</span>
            </div>
            <div className="card-body">
              {[
                { dept: 'Produkcja', pct: 72, count: 3 },
                { dept: 'Administracja', pct: 100, count: 2 },
                { dept: 'Magazyn', pct: 50, count: 2 },
              ].map((d) => (
                <div key={d.dept} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: 600 }}>{d.dept}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: d.pct >= 80 ? 'var(--success)' : d.pct >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                      {d.pct}%
                    </span>
                  </div>
                  <ProgressBar value={d.pct} color={complianceColor(d.pct)} height={8} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{d.count} pracowników</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <div className="card-header"><span className="card-title">Szybkie akcje</span></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Wyślij przypomnienie do wszystkich</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>Generuj raport zgodności</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>Zaplanuj szkolenie grupowe</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>Eksportuj dane do CSV</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
