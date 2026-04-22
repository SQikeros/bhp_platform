import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <div className="landing-nav-logo-icon">BHP</div>
          <span className="landing-nav-name">SafeWork</span>
        </div>
        <div className="landing-nav-links">
          <a href="#uslugi" className="landing-nav-link">Usługi</a>
          <a href="#o-nas" className="landing-nav-link">O nas</a>
          <a href="#kontakt" className="landing-nav-link">Kontakt</a>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={() => navigate('/login')}>
            Zaloguj się
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Przejdź do platformy
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="landing-hero">
        <div>
          <div className="landing-hero-eyebrow">
            <span>🛡️</span> Certyfikowana platforma BHP
          </div>
          <h1 className="landing-hero-title">
            Bezpieczeństwo pracy to <span>obowiązek,</span> nie opcja
          </h1>
          <p className="landing-hero-desc">
            Profesjonalna platforma zarządzania szkoleniami BHP, certyfikatami 
            i zgodnością pracowniczą. Prowadzona przez certyfikowanego specjalistę — 
            Paulę Żerko.
          </p>
          <div className="landing-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
              🚀 Zaloguj się do platformy
            </button>
            <button className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
              📋 Dowiedz się więcej
            </button>
          </div>
        </div>

        {/* Hero visual — mock dashboard preview */}
        <div className="landing-hero-visual">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Przegląd zgodności
            </span>
            <span className="badge badge-success" style={{ fontSize: 11 }}>Na bieżąco</span>
          </div>

          {/* Mini stat cards */}
          {[
            { label: 'Aktywne szkolenia', value: '12', color: '#FFC107' },
            { label: 'Ukończone w tym roku', value: '48', color: '#18A558' },
            { label: 'Wygasające certyfikaty', value: '3', color: '#F97316' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 8,
                padding: '12px 14px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', color: s.color }}>
                {s.value}
              </span>
            </div>
          ))}

          {/* Progress bars */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
              Zgodność firmy
            </div>
            {[
              { dept: 'Produkcja', pct: 78 },
              { dept: 'Administracja', pct: 95 },
              { dept: 'Magazyn', pct: 60 },
            ].map((d) => (
              <div key={d.dept} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>
                  <span>{d.dept}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{d.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 999 }}>
                  <div style={{ height: '100%', width: `${d.pct}%`, background: d.pct > 80 ? '#18A558' : d.pct > 65 ? '#FFC107' : '#DC2626', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="landing-stats-strip">
        {[
          { value: '500+', label: 'Przeszkolonych pracowników' },
          { value: '98%', label: 'Wskaźnik zdawalności' },
          { value: '12', label: 'Lat doświadczenia' },
          { value: '100%', label: 'Zgodność z Kodeksem Pracy' },
        ].map((s) => (
          <div key={s.label} className="landing-stat">
            <div className="landing-stat-value">{s.value}</div>
            <div className="landing-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features section */}
      <div className="landing-section" id="uslugi">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <h2 className="landing-section-title">Kompleksowa obsługa BHP</h2>
            <p className="landing-section-sub">Wszystko czego potrzebujesz w jednym miejscu</p>
          </div>
          <button className="btn btn-outline" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.15)' }}>
            Zobacz wszystkie usługi →
          </button>
        </div>
        <div className="landing-features">
          {[
            { icon: '📚', title: 'Szkolenia online i stacjonarne', desc: 'Szkolenia wstępne i okresowe dla wszystkich grup zawodowych. Certyfikowane, zgodne z Kodeksem Pracy.' },
            { icon: '📝', title: 'Testy i certyfikacja', desc: 'System egzaminacyjny z automatyczną oceną i generowaniem zaświadczeń dla każdego pracownika.' },
            { icon: '📊', title: 'Monitoring zgodności', desc: 'Dashboard pracodawcy z pełnym wglądem w stan szkoleń, wygasające certyfikaty i alerty compliance.' },
            { icon: '🔍', title: 'Audyty BHP', desc: 'Przeprowadzanie wewnętrznych audytów, ocena ryzyka zawodowego i dokumentacja poaudytowa.' },
            { icon: '⚠️', title: 'Badania powypadkowe', desc: 'Profesjonalne dochodzenia powypadkowe, protokoły i działania korygujące zgodne z PIP.' },
            { icon: '🏢', title: 'Outsourcing służby BHP', desc: 'Kompleksowe pełnienie obowiązków służby BHP dla firm zatrudniających do 100 pracowników.' },
          ].map((f) => (
            <div key={f.title} className="landing-feature-card">
              <div className="landing-feature-icon">{f.icon}</div>
              <div className="landing-feature-title">{f.title}</div>
              <div className="landing-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialist section */}
      <div id="o-nas" style={{ background: 'rgba(255,193,7,0.06)', borderTop: '1px solid rgba(255,193,7,0.1)', borderBottom: '1px solid rgba(255,193,7,0.1)' }}>
        <div className="landing-section landing-specialist-grid">
          <div>
            <div className="landing-hero-eyebrow">Specjalista prowadzący</div>
            <h2 className="landing-section-title">Paula Żerko</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 24 }}>
              Certyfikowany specjalista BHP z wieloletnim doświadczeniem w obsłudze 
              przedsiębiorstw produkcyjnych, budowlanych i administracyjnych. 
              Autoryzowany szkoleniowiec z zakresu bezpieczeństwa i higieny pracy.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Certyfikat specjalisty BHP — Ministerstwo Pracy',
                'Licencja na prowadzenie szkoleń BHP',
                'Doświadczenie w audytach PIP',
                '12 lat pracy w branży BHP',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>👩‍💼</div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                Paula Żerko
              </div>
              <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>Specjalista BHP</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Firm obsłużonych', value: '80+' },
                { label: 'Pracowników', value: '500+' },
                { label: 'Szkoleń rocznie', value: '200+' },
                { label: 'Lat exp.', value: '12' },
              ].map((s) => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div id="kontakt" style={{ padding: '80px 60px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <h2 className="landing-section-title">Gotowy na bezpieczne miejsce pracy?</h2>
        <p className="landing-section-sub" style={{ marginBottom: 32 }}>
          Skontaktuj się z nami lub od razu zaloguj się do platformy
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
            🚀 Zaloguj się do platformy
          </button>
          <button className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
            📞 Skontaktuj się z nami
          </button>
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          paula.zerko@bhp-platform.pl &nbsp;·&nbsp; +48 123 456 789
        </p>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div>
          <div className="landing-nav-logo" style={{ marginBottom: 6 }}>
            <div className="landing-nav-logo-icon" style={{ width: 28, height: 28, fontSize: 14 }}>BHP</div>
            <span className="landing-nav-name" style={{ fontSize: 16 }}>SafeWork</span>
          </div>
          <div className="landing-footer-copy">© 2025 SafeWork BHP. Paula Żerko. Wszelkie prawa zastrzeżone.</div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', transition: 'color 0.15s' }}>Polityka prywatności</a>
          <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Regulamin</a>
          <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Kontakt</a>
        </div>
      </footer>
    </div>
  );
}
