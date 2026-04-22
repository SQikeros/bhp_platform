import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import { currentUser, dashboardStats, trainings, testResults, notifications } from '../data/mockData';

export default function DashboardPage() {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read);
  const activeTrainings = trainings.filter((t) => t.status === 'w_trakcie');
  const expiringTrainings = trainings.filter((t) => t.status === 'wygasle');

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Dzień dobry, {currentUser.name.split(' ')[0]}</h2>
            <p className="page-subtitle">
              {currentUser.company} · {currentUser.department} · Ostatnia aktywność: dziś
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/certyfikaty')}>
              Moje certyfikaty
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/szkolenia')}>
              Rozpocznij szkolenie
            </button>
          </div>
        </div>
      </div>

      {/* Alert banner */}
      {unread.filter((n) => n.type === 'danger').length > 0 && (
        <div style={{
          background: 'var(--danger-bg)',
          border: '1px solid var(--danger)',
          borderLeft: '4px solid var(--danger)',
          borderRadius: 'var(--radius)',
          padding: '12px 16px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div>
            <strong style={{ fontSize: 13.5, color: 'var(--danger)' }}>
              Wymagane działanie: Wygasające uprawnienia
            </strong>
            <p style={{ fontSize: 12.5, color: '#B91C1C', margin: '2px 0 0' }}>
              {unread.find((n) => n.type === 'danger')?.message}
            </p>
          </div>
          <button className="btn btn-danger btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/szkolenia')}>
            Odnów teraz
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="stat-cards">
        <DashboardCard value={dashboardStats.activeTrainings} label="Aktywne szkolenia" sub="W trakcie realizacji" variant="accent" />
        <DashboardCard value={dashboardStats.completedTrainings} label="Ukończone" sub="W bieżącym roku" variant="success" />
        <DashboardCard value={dashboardStats.failedTests} label="Niezaliczone testy" sub="Wymagają powtórzenia" variant="danger" />
        <DashboardCard value={dashboardStats.expiringCertificates} label="Wygasające certyfikaty" sub="Najbliższe 90 dni" variant="warning" />
        <DashboardCard value={`${dashboardStats.overallCompliance}%`} label="Poziom zgodności" sub="Twój wynik ogólny" variant="info" />
      </div>

      {/* Main grid */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Active trainings */}
        <div>
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">Aktywne szkolenia</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/szkolenia')}>
                Wszystkie →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeTrainings.map((t) => (
                <div key={t.id} className="card">
                  <div className="card-body" style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>👤 {t.instructor} · 📦 {t.modules} modułów</div>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>
                    <ProgressBar value={t.progress} showLabel />
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/testy')}>
                        Kontynuuj
                      </button>
                      {t.mandatory && <span className="mandatory-flag">Obowiązkowe</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiring */}
          {expiringTrainings.length > 0 && (
            <div className="section">
              <div className="section-header">
                <h3 className="section-title" style={{ color: 'var(--danger)' }}>Wygasłe uprawnienia</h3>
              </div>
              {expiringTrainings.map((t) => (
                <div key={t.id} style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#991B1B' }}>{t.title}</div>
                      <div style={{ fontSize: 12, color: '#B91C1C', marginTop: 2 }}>Wygasło: {t.expiresAt}</div>
                    </div>
                    <button className="btn btn-danger btn-sm">Odnów</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div>
          {/* Compliance bar */}
          <div className="card section">
            <div className="card-header">
              <span className="card-title">Twoja zgodność BHP</span>
              <span className="badge badge-warning">{dashboardStats.overallCompliance}%</span>
            </div>
            <div className="card-body">
              {[
                { label: 'Szkolenia ukończone', value: 33, color: 'success' as const },
                { label: 'Szkolenia w trakcie', value: 66, color: 'warning' as const },
                { label: 'Certyfikaty ważne', value: 50, color: 'success' as const },
                { label: 'Testy zaliczone', value: 75, color: 'default' as const },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5, color: 'var(--text-secondary)' }}>
                    <span>{item.label}</span>
                    <span className="font-mono font-bold">{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color={item.color} height={8} />
                </div>
              ))}
              <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12.5, color: '#9A3412' }}>
                ⚠️ Ukończ 2 szkolenia, aby osiągnąć pełną zgodność
              </div>
            </div>
          </div>

          {/* Recent results */}
          <div className="card section">
            <div className="card-header">
              <span className="card-title">Ostatnie wyniki testów</span>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/testy')}>Wszystkie</button>
            </div>
            <div>
              {testResults.map((r) => (
                <div key={r.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.testTitle}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>{r.date} · {r.duration} min</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: r.passed ? 'var(--success)' : 'var(--danger)' }}>
                      {r.score}%
                    </div>
                    <StatusBadge status={r.passed ? 'success' : 'danger'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Powiadomienia</span>
              {unread.length > 0 && <span className="badge badge-danger">{unread.length}</span>}
            </div>
            <div>
              {notifications.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '11px 16px',
                    borderBottom: '1px solid var(--border)',
                    borderLeft: !n.read ? '3px solid var(--danger)' : '3px solid transparent',
                    background: !n.read ? 'var(--bg)' : 'transparent',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.4 }}>{n.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{n.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
