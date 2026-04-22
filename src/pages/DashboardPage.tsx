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
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--danger)',
          borderRadius: 'var(--radius)',
          padding: '12px 16px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
              Wygasające uprawnienia
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
              {unread.find((n) => n.type === 'danger')?.message}
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/szkolenia')}>
            Odnów
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
        {/* Left column */}
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
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.instructor} · {t.modules} modułów</div>
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

          {expiringTrainings.length > 0 && (
            <div className="section">
              <div className="section-header">
                <h3 className="section-title">Wygasłe uprawnienia</h3>
              </div>
              {expiringTrainings.map((t) => (
                <div key={t.id} style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--danger)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 16px',
                  marginBottom: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Wygasło: {t.expiresAt}</div>
                  </div>
                  <button className="btn btn-outline btn-sm">Odnów</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div>
          <div className="card section">
            <div className="card-header">
              <span className="card-title">Zgodność BHP</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                {dashboardStats.overallCompliance}%
              </span>
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
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color={item.color} height={6} />
                </div>
              ))}
              <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                Ukończ 2 szkolenia, aby osiągnąć pełną zgodność
              </div>
            </div>
          </div>

          <div className="card section">
            <div className="card-header">
              <span className="card-title">Wyniki testów</span>
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
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: r.passed ? 'var(--success)' : 'var(--danger)' }}>
                      {r.score}%
                    </div>
                    <StatusBadge status={r.passed ? 'success' : 'danger'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Powiadomienia</span>
              {unread.length > 0 && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                  {unread.length} nowych
                </span>
              )}
            </div>
            <div>
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} style={{
                  padding: '11px 16px',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: !n.read ? '2px solid rgba(220,38,38,0.5)' : '2px solid transparent',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
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
