import { spawn } from 'child_process';
import path from 'path';

// Start vite dev server (using cmd.exe to bypass PowerShell policy)
console.log("Starting vite dev server...");
const server = spawn('cmd.exe', ['/c', 'npm run dev'], {
  cwd: 'c:\\Users\\User\\Desktop\\role-plant\\role-plant',
  detached: false
});

server.stdout.on('data', d => console.log('[vite]', d.toString().trim()));
server.stderr.on('data', d => console.error('[vite err]', d.toString().trim()));

// Wait for vite to start
await new Promise(r => setTimeout(r, 8000));
console.log("Vite should be ready at http://localhost:5173");
