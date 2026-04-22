interface DashboardCardProps {
  value: string | number;
  label: string;
  sub?: string;
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'info';
}

export default function DashboardCard({ value, label, sub, variant = 'accent' }: DashboardCardProps) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-card-indicator" />
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}
