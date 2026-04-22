import { NavLink } from 'react-router-dom';
import type { User } from '../types';

interface SidebarProps {
  user: User;
}

interface NavItem {
  to: string;
  label: string;
  icon: string;
  badge?: number;
}

const employeeNav: NavItem[] = [
  { to: '/dashboard', label: 'Panel główny', icon: '⊞' },
  { to: '/szkolenia', label: 'Szkolenia', icon: '📚' },
  { to: '/testy', label: 'Testy i egzaminy', icon: '📝' },
  { to: '/certyfikaty', label: 'Certyfikaty', icon: '🏅' },
];

const employerNav: NavItem[] = [
  { to: '/pracodawca', label: 'Panel pracodawcy', icon: '🏢' },
  { to: '/pracownicy', label: 'Pracownicy', icon: '👥' },
  { to: '/raporty', label: 'Raporty i dokumenty', icon: '📊' },
  { to: '/admin', label: 'Administracja', icon: '⚙️' },
];

const generalNav: NavItem[] = [
  { to: '/uslugi', label: 'Usługi BHP', icon: '🛡️' },
];

export default function Sidebar({ user }: SidebarProps) {
  const mainNav = user.role === 'pracodawca' || user.role === 'admin' ? employerNav : employeeNav;

  const roleLabel =
    user.role === 'pracownik' ? 'Pracownik'
    : user.role === 'pracodawca' ? 'Pracodawca'
    : 'Administrator';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <NavLink to="/" className="sidebar-logo" style={{ textDecoration: 'none', display: 'block' }}>
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon">BHP</div>
          <span className="sidebar-logo-name">SafeWork</span>
        </div>
        <div className="sidebar-logo-sub">Platforma BHP</div>
      </NavLink>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* Main section */}
        <div className="sidebar-nav-section">
          <div className="sidebar-nav-label">
            {user.role === 'pracownik' ? 'Pracownik' : 'Zarządzanie'}
          </div>
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge ? (
                <span className="nav-badge">{item.badge}</span>
              ) : null}
            </NavLink>
          ))}
        </div>

        {/* General section */}
        <div className="sidebar-nav-section">
          <div className="sidebar-nav-label">Serwis</div>
          {generalNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/"
            className="nav-link"
          >
            <span className="nav-icon">↩</span>
            Wyloguj się
          </NavLink>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{user.avatarInitials}</div>
          <div>
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-role">{roleLabel}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
