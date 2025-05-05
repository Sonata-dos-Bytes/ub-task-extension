import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import AppRoutes from './routes';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}