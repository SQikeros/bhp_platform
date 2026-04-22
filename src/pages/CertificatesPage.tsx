import StatusBadge from '../components/StatusBadge';
import { certificates, currentUser } from '../data/mockData';
import type { Certificate } from '../types';

function statusColor(status: Certificate['status']) {
  if (status === 'wygasly') return 'var(--danger)';
  if (status === 'wygasa') return 'var(--warning)';
  return 'var(--success)';
}

function CertRow({ cert }: { cert: Certificate }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr 130px 130px 120px 160px',
      alignItems: 'center',
      gap: 20,
      padding: '18px 24px',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.12s',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
        {cert.number}
      </span>

      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>
          {cert.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{cert.issuedBy}</div>
      </div>

      <div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>Wystawiony</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{cert.issuedAt}</div>
      </div>

      <div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>Ważny do</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: statusColor(cert.status) }}>{cert.expiresAt}</div>
      </div>

      <StatusBadge status={cert.status} />

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        {cert.status !== 'wygasly' ? (
          <button className="btn btn-primary btn-sm">Pobierz</button>
        ) : (
          <button className="btn btn-danger btn-sm">Odnów</button>
        )}
        <button className="btn btn-outline btn-sm">Podgląd</button>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const valid = certificates.filter((c) => c.status === 'wazny');
  const expiring = certificates.filter((c) => c.status === 'wygasa');
  const expired = certificates.filter((c) => c.status === 'wygasly');

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Moje certyfikaty</h2>
            <p className="page-subtitle">
              {currentUser.name} · {certificates.length} certyfikatów łącznie
            </p>
          </div>
          <button className="btn btn-outline">Pobierz wszystkie (ZIP)</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Ważne', count: valid.length, color: 'var(--success)', bg: 'var(--success-bg)', border: 'var(--success)' },
          { label: 'Wygasają wkrótce', count: expiring.length, color: 'var(--warning)', bg: 'var(--warning-bg)', border: 'var(--warning)' },
          { label: 'Wygasłe', count: expired.length, color: 'var(--danger)', bg: 'var(--danger-bg)', border: 'var(--danger)' },
        ].map((s) => (
          <div key={s.label} style={{
            background: s.bg,
            border: `1px solid ${s.border}`,
            borderLeft: `4px solid ${s.border}`,
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.count}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Expiring warning */}
      {expiring.length > 0 && (
        <div style={{
          background: 'var(--warning-bg)',
          border: '1px solid var(--warning)',
          borderLeft: '4px solid var(--warning)',
          borderRadius: 'var(--radius)',
          padding: '12px 16px',
          marginBottom: 24,
          fontSize: 13.5,
          color: 'var(--warning)',
        }}>
          <strong>{expiring.length} certyfikat(y)</strong> wygasa w ciągu najbliższych 90 dni. Odnów szkolenia, aby zachować ważność uprawnień.
        </div>
      )}

      {/* All certificates list */}
      {[
        { label: 'Ważne certyfikaty', items: valid, accent: 'var(--success)' },
        { label: 'Wygasają wkrótce', items: expiring, accent: 'var(--warning)' },
        { label: 'Wygasłe certyfikaty', items: expired, accent: 'var(--danger)' },
      ].filter(g => g.items.length > 0).map((group) => (
        <div key={group.label} className="section">
          <div className="section-header">
            <h3 className="section-title" style={{ color: group.accent }}>{group.label}</h3>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr 130px 130px 120px 160px',
              gap: 20,
              padding: '10px 24px',
              background: 'var(--bg-2)',
              borderBottom: '1px solid var(--border)',
            }}>
              {['Nr certyfikatu', 'Nazwa', 'Wystawiony', 'Ważny do', 'Status', ''].map((h) => (
                <span key={h} style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>{h}</span>
              ))}
            </div>
            {group.items.map((c) => <CertRow key={c.id} cert={c} />)}
          </div>
        </div>
      ))}
    </>
  );
}
