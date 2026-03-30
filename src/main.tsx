import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './frontend-shell/providers/ToastProvider';
import './index.css';
import './frontend-shell/styles/tokens.css';

// BATCH_A_SHELL
// Main entry now mounts the new frontend shell providers only.
// No legacy policy/content/post providers are reintroduced here.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
);
