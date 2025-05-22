import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom';
import { SessionProvider } from './contexts/auth-context';
import AppRoutes from './routes';
import { Provider } from "./components/ui/provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <SessionProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </SessionProvider>
    </Provider>
  </StrictMode>,
)
