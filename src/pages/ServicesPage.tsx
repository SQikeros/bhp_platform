import { services } from '../data/mockData';

export default function ServicesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Usługi BHP</h2>
            <p className="page-subtitle">
              Kompleksowa obsługa bhp prowadzona przez certyfikowaną specjalistkę Paula Żerko
            </p>
          </div>
          <button className="btn btn-primary">Skontaktuj się</button>
        </div>
      </div>

      {/* Specialist banner */}
      <div style={{ background: 'var(--dark)', borderRadius: 'var(--radius-xl)', padding: '28px 32px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ fontSize: 56 }}>👩‍💼</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4 }}>
            Paula Żerko — Certyfikowany Specjalista BHP
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 600, marginBottom: 16 }}>
            Ponad 12 lat doświadczenia w obsłudze BHP przedsiębiorstw produkcyjnych, 
            budowlanych i administracyjnych. Autoryzowany szkoleniowiec z licencją 
            Ministerstwa Pracy i Polityki Społecznej.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {['Certyfikat MPIPS', 'Licencja szkoleniowca', 'Audytor PIP', '12 lat doświadczenia'].map((badge) => (
              <span key={badge} className="badge badge-accent">{badge}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <button className="btn btn-primary">Zadzwoń teraz</button>
          <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Napisz e-mail</button>
        </div>
      </div>

      {/* Services grid */}
      <div className="section-header">
        <h3 className="section-title">Zakres usług</h3>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{services.length} usług dostępnych</span>
      </div>

      <div className="service-cards">
        {services.map((s) => (
          <div key={s.id} className="service-card">
            <div className="service-card-header">
              <div className="service-icon">{s.icon}</div>
              <div className="service-card-header-text">
                <div className="service-card-title">{s.title}</div>
                <div className="service-card-desc">{s.description}</div>
              </div>
            </div>
            <div className="service-card-body">
              <ul className="service-detail-list">
                {s.details.map((d) => (
                  <li key={d} className="service-detail-item">{d}</li>
                ))}
              </ul>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm">Zapytaj o wycenę</button>
                <button className="btn btn-outline btn-sm">Dowiedz się więcej</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why us */}
      <div style={{ marginTop: 36, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 20, textTransform: 'uppercase' }}>
          Dlaczego warto wybrać nasze usługi?
        </h3>
        <div className="grid-auto" style={{ gap: 20 }}>
          {[
            { icon: '⚖️', title: 'Zgodność prawna', desc: 'Wszystkie szkolenia i dokumenty zgodne z aktualnym Kodeksem Pracy i rozporządzeniami MRPiPS.' },
            { icon: '🎓', title: 'Certyfikowani trenerzy', desc: 'Wyłącznie szkoleniowcy posiadający wymagane kwalifikacje i aktualne licencje.' },
            { icon: '⚡', title: 'Szybka realizacja', desc: 'Szkolenia organizowane w ciągu 48h od zgłoszenia. Dokumentacja wystawiana od ręki.' },
            { icon: '📱', title: 'Platforma online', desc: 'Szkolenia i egzaminy dostępne 24/7 przez przeglądarkę internetową na każdym urządzeniu.' },
          ].map((f) => (
            <div key={f.title} style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 28, background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 'var(--radius-xl)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
            Gotowy na bezpieczne miejsce pracy?
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Skontaktuj się z nami i umów bezpłatną konsultację · paula.zerko@bhp-platform.pl
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary btn-lg">Zadzwoń: +48 123 456 789</button>
          <button className="btn btn-outline btn-lg">Wyślij zapytanie</button>
        </div>
      </div>
    </>
  );
}
