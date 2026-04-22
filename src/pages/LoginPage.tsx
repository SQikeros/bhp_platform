import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'pracownik' | 'pracodawca'>('pracownik');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === 'pracodawca' ? '/pracodawca' : '/dashboard');
    }, 900);
  };

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="sidebar-logo-icon">BHP</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'white', textTransform: 'uppercase', letterSpacing: 1 }}>
              SafeWork
            </span>
          </div>
          <h2 className="login-left-title">
            Bezpieczeństwo pracy<span>to obowiązek,</span>nie opcja.
          </h2>
          <p className="login-left-desc">
            Platforma zarządzania szkoleniami BHP, certyfikatami i zgodnością pracowniczą. 
            Prowadzona przez certyfikowaną specjalistkę Paulę Żerko.
          </p>

          <div className="login-left-features">
            {[
              'Szkolenia BHP online i stacjonarne',
              'Automatyczna certyfikacja pracowników',
              'Panel pracodawcy z monitoringiem zgodności',
              'Alerty o wygasających uprawnieniach',
              'Dokumentacja zgodna z Kodeksem Pracy',
            ].map((f) => (
              <div key={f} className="login-feature-item">
                <div className="login-feature-check">✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20 }}>
          © 2025 SafeWork BHP · Paula Żerko · Certyfikowany Specjalista BHP
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div className="login-form-wrap">
          <div className="login-form-title">Zaloguj się</div>
          <div className="login-form-sub">Wprowadź dane dostępowe do platformy</div>

          {/* Role switch */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, background: 'var(--bg)', padding: 4, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            {(['pracownik', 'pracodawca'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: role === r ? 'var(--white)' : 'transparent',
                  color: role === r ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {r === 'pracownik' ? 'Pracownik' : 'Pracodawca'}
              </button>
            ))}
          </div>

          <div className="login-form">
            <div className="form-group">
              <label className="form-label">Adres e-mail</label>
              <input
                type="email"
                className="form-input"
                placeholder="twoj@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hasło</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="form-hint">
                <a href="#" style={{ color: 'var(--info)' }}>Zapomniałeś hasła?</a>
              </span>
            </div>

            <button
              className="btn btn-primary w-full"
              style={{ padding: '12px', fontSize: 15, justifyContent: 'center' }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '⏳ Logowanie...' : '🔐 Zaloguj się'}
            </button>

            <div className="login-divider">lub</div>

            <button
              className="btn btn-dark w-full"
              style={{ padding: '12px', fontSize: 14, justifyContent: 'center' }}
              onClick={() => navigate('/dashboard')}
            >
              👁️ Podgląd demo bez logowania
            </button>
          </div>

          <div style={{ marginTop: 28, padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>ℹ️ Dane demo:</strong>
            Pracownik: marek.nowak@firma.pl / demo123<br />
            Pracodawca: k.wisniewska@metalex.pl / demo123
          </div>

          <p style={{ marginTop: 20, fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
            Nie masz konta?{' '}
            <a href="#" style={{ color: 'var(--info)', fontWeight: 600 }}>
              Skontaktuj się z administratorem
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
