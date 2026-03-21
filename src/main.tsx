import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './AuthContext';
import { PolicyProvider } from './PolicyContext';
import './index.css';

async function enableMocking() {
  // @ts-ignore
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <PolicyProvider>
            <App />
          </PolicyProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
