import { useNavigate } from 'react-router-dom';
import type { Training } from '../types';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

interface TrainingCardProps {
  training: Training;
}

const categoryLabels: Record<string, string> = {
  biurowe: 'Biurowe',
  fizyczne: 'Fizyczne',
  kierownicze: 'Kierownicze',
  specjalistyczne: 'Specjalistyczne',
};

const categoryColors: Record<string, string> = {
  biurowe: 'badge-info',
  fizyczne: 'badge-warning',
  kierownicze: 'badge-accent',
  specjalistyczne: 'badge-neutral',
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export default function TrainingCard({ training }: TrainingCardProps) {
  const navigate = useNavigate();

  const progressColor =
    training.progress === 100 ? 'success'
    : training.status === 'wygasle' ? 'danger'
    : 'default';

  const canStart = training.status === 'nierozpoczete' || training.status === 'w_trakcie';

  return (
    <div className="training-card">
      {/* Top */}
      <div className="training-card-top">
        <div>
          <span className={`badge ${categoryColors[training.category]} mb-2`} style={{ marginBottom: 6 }}>
            {categoryLabels[training.category]}
          </span>
          {training.mandatory && (
            <span className="mandatory-flag" style={{ marginLeft: 6 }}>Obowiązkowe</span>
          )}
          <div className="training-card-title" style={{ marginTop: 6 }}>{training.title}</div>
        </div>
        <StatusBadge status={training.status} />
      </div>

      {/* Description */}
      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
        {training.description.slice(0, 110)}…
      </p>

      {/* Meta */}
      <div className="training-card-meta">
        <span className="training-card-meta-item">🕒 {formatDuration(training.durationMinutes)}</span>
        <span className="training-card-meta-item">📦 {training.modules} modułów</span>
        <span className="training-card-meta-item">👤 {training.instructor}</span>
      </div>

      {/* Progress */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--text-muted)',
            marginBottom: 6,
          }}
        >
          <span>Postęp</span>
          <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
            {training.progress}%
          </span>
        </div>
        <ProgressBar value={training.progress} color={progressColor} height={7} />
      </div>

      {/* Expiry */}
      {training.expiresAt && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {training.status === 'ukonczone' ? '✅ Ważne do:' : '⚠️ Termin:'}
          {' '}
          <strong style={{ color: 'var(--text-secondary)' }}>{training.expiresAt}</strong>
        </div>
      )}

      {/* Actions */}
      <div className="training-card-actions">
        {canStart && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/testy')}
          >
            {training.status === 'w_trakcie' ? '▶ Kontynuuj' : '▶ Rozpocznij szkolenie'}
          </button>
        )}
        {training.status === 'ukonczone' && (
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/certyfikaty')}>
            🏅 Certyfikat
          </button>
        )}
        {training.status === 'wygasle' && (
          <button className="btn btn-danger btn-sm">
            🔄 Odnów szkolenie
          </button>
        )}
      </div>
    </div>
  );
}
