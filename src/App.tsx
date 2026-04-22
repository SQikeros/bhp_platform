import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Public pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// App pages
import DashboardPage from './pages/DashboardPage';
import TrainingsPage from './pages/TrainingsPage';
import TestPage from './pages/TestPage';
import CertificatesPage from './pages/CertificatesPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import ServicesPage from './pages/ServicesPage';
import AdminPage from './pages/AdminPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* App shell */}
      <Route element={<AppLayout />}>
        {/* Employee routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/szkolenia" element={<TrainingsPage />} />
        <Route path="/testy" element={<TestPage />} />
        <Route path="/certyfikaty" element={<CertificatesPage />} />

        {/* Employer routes */}
        <Route path="/pracodawca" element={<EmployerDashboardPage />} />
        <Route path="/pracownicy" element={<EmployerDashboardPage />} />
        <Route path="/raporty" element={<ReportsPage />} />

        {/* General */}
        <Route path="/uslugi" element={<ServicesPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
