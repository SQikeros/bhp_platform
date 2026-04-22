import { employees } from '../data/mockData';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';

export default function ReportsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Raporty i dokumentacja</h2>
            <p className="page-subtitle">Zestawienia szkoleń, certyfikatów i zgodności BHP firmy</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm">📅 Wybierz okres</button>
            <button className="btn btn-primary">⬇ Eksportuj PDF</button>
          </div>
        </div>
      </div>

      {/* Compliance overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 28, alignItems: 'start' }}>
        {/* Ring summary */}
        <div className="card">
          <div className="card-header"><span className="card-title">Ogólna zgodność</span></div>
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', border: '8px solid var(--accent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', background: 'var(--accent-light)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>68%</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>zgodność</div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Wymagane: min. <strong>80%</strong> dla pełnej zgodności z przepisami BHP.
            </p>
            <div style={{ marginTop: 14, padding: '10px', background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12.5, color: '#9A3412' }}>
              ⚠️ Poniżej wymaganego progu — podjąć działania
            </div>
          </div>
        </div>

        {/* Dept breakdown */}
        <div className="card">
          <div className="card-header"><span className="card-title">Zgodność według działów</span></div>
          <div className="card-body">
            {[
              { dept: 'Administracja', compliant: 2, total: 2, pct: 100 },
              { dept: 'Produkcja', compliant: 2, total: 3, pct: 67 },
              { dept: 'Magazyn', compliant: 1, total: 2, pct: 50 },
            ].map((d) => (
              <div key={d.dept} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700 }}>{d.dept}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{d.compliant}/{d.total} pracowników</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: d.pct >= 80 ? 'var(--success)' : d.pct >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                      {d.pct}%
                    </span>
                  </div>
                </div>
                <ProgressBar
                  value={d.pct}
                  color={d.pct >= 80 ? 'success' : d.pct >= 60 ? 'warning' : 'danger'}
                  height={10}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports list */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Dostępne raporty</h3>
        </div>
        <div className="grid-auto" style={{ gap: 14, marginBottom: 28 }}>
          {[
            { title: 'Raport zgodności BHP — Kwiecień 2025', icon: '📊', type: 'PDF', date: '2025-04-21', size: '1.2 MB' },
            { title: 'Zestawienie szkoleń — I kwartał 2025', icon: '📚', type: 'XLSX', date: '2025-04-01', size: '340 KB' },
            { title: 'Rejestr wypadków przy pracy 2025', icon: '⚠️', type: 'PDF', date: '2025-03-31', size: '205 KB' },
            { title: 'Certyfikaty — stan na 2025-04-21', icon: '🏅', type: 'PDF', date: '2025-04-21', size: '890 KB' },
            { title: 'Ocena ryzyka zawodowego — Produkcja', icon: '🔍', type: 'DOCX', date: '2025-02-15', size: '1.8 MB' },
            { title: 'Protokół z audytu BHP — Marzec 2025', icon: '📋', type: 'PDF', date: '2025-03-20', size: '2.1 MB' },
          ].map((r) => (
            <div key={r.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px', display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow 0.15s' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {r.date} · {r.size}
                  <span className="badge badge-info" style={{ marginLeft: 6, fontSize: 10 }}>{r.type}</span>
                </div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>⬇ Pobierz</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee compliance table */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Raport zgodności pracowników</h3>
          <button className="btn btn-outline btn-sm">⬇ Eksportuj CSV</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pracownik</th>
                <th>Dział</th>
                <th>Ukończone / Wymagane</th>
                <th>% Zgodności</th>
                <th>Certyfikaty wygasające</th>
                <th>Status</th>
                <th>Ostatnia aktywność</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const pct = Math.round((emp.completedTrainings / emp.totalTrainings) * 100);
                return (
                  <tr key={emp.id}>
                    <td>
                      <div className="table-name">{emp.name}</div>
                      <div className="table-sub">{emp.position}</div>
                    </td>
                    <td><span style={{ fontSize: 13 }}>{emp.department}</span></td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {emp.completedTrainings}/{emp.totalTrainings}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 60 }}>
                          <ProgressBar value={pct} color={pct >= 80 ? 'success' : pct >= 60 ? 'warning' : 'danger'} height={6} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td>
                      {emp.certificatesExpiring > 0
                        ? <span className="badge badge-warning">⚠️ {emp.certificatesExpiring}</span>
                        : <span className="badge badge-success">0</span>
                      }
                    </td>
                    <td><StatusBadge status={emp.complianceStatus} /></td>
                    <td><span className="table-mono">{emp.lastActivity}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
