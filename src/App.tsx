import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { useThemeStore } from './store/theme';
import BrandingProvider from './components/BrandingProvider';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import InitialSetup from './pages/admin/InitialSetup';
import BrandingConfig from './pages/admin/BrandingConfig';
import Dashboard from './pages/Dashboard';

function PrivateRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useThemeStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'SYSTEM_ADMIN') {
    return <Navigate to="/" />;
  }

  return <div className={theme}>{children}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <BrandingProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/setup" element={<InitialSetup />} />
          
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requireAdmin>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="branding" element={<BrandingConfig />} />
            {/* ... other admin routes */}
          </Route>

          {/* User routes */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            {/* ... other user routes */}
          </Route>
        </Routes>
      </BrandingProvider>
    </BrowserRouter>
  );
}

export default App;