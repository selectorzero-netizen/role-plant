import { http, HttpResponse } from 'msw';

// Simulation state
let currentAuthStatus = 'member'; // 'admin', 'member', '401', '500'

export const handlers = [
  // Auth endpoints have been completely removed for Phase 4.
  // MSW is no longer intercepting /api/auth/me or /api/auth/login.
  // The rest of the handlers (if any were added in the future) will remain active.
];
