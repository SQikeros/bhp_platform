// ─── User & Auth ────────────────────────────────────────────────────────────
export type UserRole = 'pracownik' | 'pracodawca' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  department: string;
  avatarInitials: string;
}

// ─── Trainings ───────────────────────────────────────────────────────────────
export type TrainingCategory = 'biurowe' | 'fizyczne' | 'kierownicze' | 'specjalistyczne';
export type TrainingStatus = 'nierozpoczete' | 'w_trakcie' | 'ukonczone' | 'wygasle';

export interface Training {
  id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  status: TrainingStatus;
  progress: number; // 0-100
  durationMinutes: number;
  mandatory: boolean;
  expiresAt?: string;
  completedAt?: string;
  instructor: string;
  modules: number;
}

// ─── Tests ────────────────────────────────────────────────────────────────────
export type QuestionType = 'single' | 'multi';

export interface TestQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswers: number[]; // indices
}

export interface Test {
  id: string;
  title: string;
  trainingId: string;
  passThreshold: number; // percentage
  questions: TestQuestion[];
  timeLimit: number; // minutes
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  score: number;
  passed: boolean;
  date: string;
  duration: number; // minutes taken
}

// ─── Certificates ────────────────────────────────────────────────────────────
export type CertificateStatus = 'wazny' | 'wygasa' | 'wygasly';

export interface Certificate {
  id: string;
  title: string;
  trainingId: string;
  issuedAt: string;
  expiresAt: string;
  status: CertificateStatus;
  issuedBy: string;
  number: string;
}

// ─── Employees ────────────────────────────────────────────────────────────────
export type ComplianceStatus = 'zgodny' | 'niezgodny' | 'w_trakcie';

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  completedTrainings: number;
  totalTrainings: number;
  pendingTrainings: number;
  complianceStatus: ComplianceStatus;
  lastActivity: string;
  certificatesExpiring: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export type NotificationType = 'info' | 'warning' | 'danger' | 'success';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// ─── Services ─────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
}
