import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { currentUser, employerUser, notifications } from '../data/mockData';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Panel główny',
  '/szkolenia': 'Szkolenia BHP',
  '/testy': 'Testy i egzaminy',
  '/certyfikaty': 'Moje certyfikaty',
  '/pracodawca': 'Panel pracodawcy',
  '/pracownicy': 'Zarządzanie pracownikami',
  '/raporty': 'Raporty i dokumentacja',
  '/uslugi': 'Usługi BHP',
  '/admin': 'Panel administracyjny',
};

export default function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = pageTitles[location.pathname] ?? 'SafeWork BHP';

  const isEmployerView = ['/pracodawca', '/pracownicy', '/raporty', '/admin'].includes(location.pathname);
  const user = isEmployerView ? employerUser : currentUser;

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Topbar user={user} title={title} notifications={notifications} onMenuClick={() => setSidebarOpen(true)} />
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
