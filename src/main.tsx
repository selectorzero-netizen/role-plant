import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './AuthContext';
import './index.css';

// CLEANUP_BATCH_03_1
// PolicyProvider and legacy mock bootstrapping removed.
// Active app now mounts AuthProvider + App only.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
