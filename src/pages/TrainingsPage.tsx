import { useState } from 'react';
import TrainingCard from '../components/TrainingCard';
import { trainings } from '../data/mockData';
import type { TrainingCategory, TrainingStatus } from '../types';

type FilterCategory = 'wszystkie' | TrainingCategory;
type FilterStatus = 'wszystkie' | TrainingStatus;

const categoryLabels: Record<FilterCategory, string> = {
  wszystkie: 'Wszystkie',
  biurowe: 'Biurowe',
  fizyczne: 'Fizyczne',
  kierownicze: 'Kierownicze',
  specjalistyczne: 'Specjalistyczne',
};

const statusLabels: Record<FilterStatus, string> = {
  wszystkie: 'Wszystkie statusy',
  w_trakcie: 'W trakcie',
  ukonczone: 'Ukończone',
  nierozpoczete: 'Nierozpoczęte',
  wygasle: 'Wygasłe',
};

export default function TrainingsPage() {
  const [category, setCategory] = useState<FilterCategory>('wszystkie');
  const [status, setStatus] = useState<FilterStatus>('wszystkie');
  const [search, setSearch] = useState('');

  const filtered = trainings.filter((t) => {
    const catOk = category === 'wszystkie' || t.category === category;
    const statusOk = status === 'wszystkie' || t.status === status;
    const searchOk = t.title.toLowerCase().includes(search.toLowerCase());
    return catOk && statusOk && searchOk;
  });

  const counts = {
    total: trainings.length,
    active: trainings.filter((t) => t.status === 'w_trakcie').length,
    done: trainings.filter((t) => t.status === 'ukonczone').length,
    expired: trainings.filter((t) => t.status === 'wygasle').length,
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h2 className="page-title">Szkolenia BHP</h2>
            <p className="page-subtitle">
              {counts.total} szkoleń · {counts.active} w trakcie · {counts.done} ukończonych · {counts.expired} wygasłych
            </p>
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="test-stats-grid" style={{ gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Wszystkich', value: counts.total },
          { label: 'W trakcie', value: counts.active },
          { label: 'Ukończonych', value: counts.done },
          { label: 'Wygasłych', value: counts.expired },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <input
            type="text"
            className="form-input"
            placeholder="Szukaj szkolenia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 260 }}
          />

          {/* Category filter */}
          <div className="filter-bar" style={{ margin: 0 }}>
            {(Object.keys(categoryLabels) as FilterCategory[]).map((c) => (
              <button
                key={c}
                className={`filter-pill ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {categoryLabels[c]}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="filter-bar" style={{ margin: 0 }}>
            {(Object.keys(statusLabels) as FilterStatus[]).map((s) => (
              <button
                key={s}
                className={`filter-pill ${status === s ? 'active' : ''}`}
                onClick={() => setStatus(s)}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={{ marginBottom: 14, fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
        Wyświetlono {filtered.length} z {trainings.length} szkoleń
      </div>

      {/* Training grid */}
      {filtered.length > 0 ? (
        <div className="training-grid">
          {filtered.map((t) => (
            <TrainingCard key={t.id} training={t} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">Brak wyników</div>
          <div className="empty-state-desc">Zmień kryteria filtrowania, aby zobaczyć szkolenia.</div>
        </div>
      )}
    </>
  );
}
