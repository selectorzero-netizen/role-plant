import { execSync } from 'child_process';

// Find firebase
try {
  const res = execSync('where firebase', { encoding: 'utf8', shell: 'cmd.exe' });
  console.log('firebase found at:', res.trim());
} catch(e) {
  console.log('firebase not in PATH:', e.message);
}

// Try npm global list
try {
  const res = execSync('npm list -g --depth=0 2>&1', { encoding: 'utf8', shell: 'cmd.exe' });
  console.log('npm global packages:', res.trim());
} catch(e) {
  console.log('npm global list error:', e.message);
}

// Try npm root
try {
  const res = execSync('npm root -g 2>&1', { encoding: 'utf8', shell: 'cmd.exe' });
  console.log('npm global root:', res.trim());
} catch(e) {
  console.log('npm global root error:', e.message);
}
