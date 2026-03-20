import { http, HttpResponse } from 'msw';

// Simulation state
let currentAuthStatus = 'member'; // 'admin', 'member', '401', '500'

export const handlers = [
  // A mock endpoint to simulate fetching user profile after login
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    // Check if we are intentionally simulating network/server errors
    if (localStorage.getItem('MOCK_SCENARIO') === '500') {
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

    if (localStorage.getItem('MOCK_SCENARIO') === '401' || !authHeader || authHeader !== 'Bearer MOCK_TOKEN') {
      return HttpResponse.json({ message: 'Unauthorized / Token Expired' }, { status: 401 });
    }

    // Role-based simulation
    const role = localStorage.getItem('MOCK_ROLE') || 'member';

    return HttpResponse.json({
      uid: 'mock-user-123',
      email: role === 'admin' ? 'admin@role-plant.mock' : 'user@role-plant.mock',
      name: role === 'admin' ? 'System Admin' : 'Demo User',
      role,
      status: 'approved',
      favorites: ['RP-24-001']
    });
  }),

  // A mock endpoint to simulate Login
  http.post('/api/auth/login', async ({ request }) => {
    if (localStorage.getItem('MOCK_SCENARIO') === '500') {
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
    // For mock purposes, just return a token immediately
    return HttpResponse.json({
      token: 'MOCK_TOKEN'
    });
  }),
];
