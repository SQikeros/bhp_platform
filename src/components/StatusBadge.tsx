import type { TrainingStatus, CertificateStatus, ComplianceStatus, NotificationType } from '../types';

interface StatusBadgeProps {
  status: TrainingStatus | CertificateStatus | ComplianceStatus | NotificationType | string;
  size?: 'sm' | 'md';
}

const statusMap: Record<string, { label: string; cls: string }> = {
  // Training
  w_trakcie: { label: 'W trakcie', cls: 'badge-accent' },
  ukonczone: { label: 'Ukończone', cls: 'badge-success' },
  nierozpoczete: { label: 'Nierozpoczęte', cls: 'badge-neutral' },
  wygasle: { label: 'Wygasłe', cls: 'badge-danger' },
  // Certificate
  wazny: { label: 'Ważny', cls: 'badge-success' },
  wygasa: { label: 'Wygasa wkrótce', cls: 'badge-warning' },
  wygasly: { label: 'Wygasły', cls: 'badge-danger' },
  // Compliance
  zgodny: { label: 'Zgodny', cls: 'badge-success' },
  niezgodny: { label: 'Niezgodny', cls: 'badge-danger' },
  // Notification
  info: { label: 'Info', cls: 'badge-info' },
  warning: { label: 'Ostrzeżenie', cls: 'badge-warning' },
  danger: { label: 'Pilne', cls: 'badge-danger' },
  success: { label: 'Sukces', cls: 'badge-success' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status] ?? { label: status, cls: 'badge-neutral' };
  return <span className={`badge ${config.cls}`}>{config.label}</span>;
}
