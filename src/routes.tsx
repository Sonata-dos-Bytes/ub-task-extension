import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/(protected)/home';
import { useSession } from './contexts/auth-context';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Navigate to="/" replace/>;
  }

  if (!session) {
      return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}