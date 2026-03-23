import { spawn } from 'child_process';
import path from 'path';

const firebaseJs = "C:\\Users\\User\\AppData\\Local\\npm-cache\\_npx\\7750544ccf494d8b\\node_modules\\firebase-tools\\lib\\bin\\firebase.js";
const nodeExe = "C:\\Program Files\\nodejs\\node.exe";

console.log('Starting emulators using:', firebaseJs);

const child = spawn(nodeExe, [
  firebaseJs,
  'emulators:start',
  '--project', 'demo-roleplant',
  '--only', 'auth,firestore,storage,hosting'
], {
  cwd: process.cwd(),
  stdio: 'inherit'
});

child.on('error', (err) => {
  console.error('Failed to start child process:', err);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
