interface ProgressBarProps {
  value: number; // 0–100
  color?: 'default' | 'success' | 'danger' | 'warning';
  showLabel?: boolean;
  height?: number;
}

export default function ProgressBar({
  value,
  color = 'default',
  showLabel = false,
  height = 6,
}: ProgressBarProps) {
  const fillClass =
    color === 'success' ? 'success'
    : color === 'danger' ? 'danger'
    : color === 'warning' ? 'warning'
    : '';

  return (
    <div className="flex items-center gap-2" style={{ flex: 1 }}>
      <div className="progress-bar" style={{ flex: 1, height }}>
        <div
          className={`progress-bar-fill ${fillClass}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs text-muted" style={{ width: 34, textAlign: 'right' }}>
          {value}%
        </span>
      )}
    </div>
  );
}
