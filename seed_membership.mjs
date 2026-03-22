/**
 * Seeds test members and applications into Firestore Emulator.
 */
import { request } from 'http';

const PROJECT_ID = 'role-plant';
const BASE_PATH = `/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

async function postDoc(collection, docId, fields) {
  const body = JSON.stringify({ fields });
  const options = {
    hostname: '127.0.0.1',
    port: 8080,
    path: `${BASE_PATH}/${collection}${docId ? '?documentId=' + docId : ''}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    }
  };

  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const testUsers = [
  {
    id: 'user-pending-1',
    fields: {
      email: { stringValue: 'pending@example.com' },
      name: { stringValue: 'Pending User' },
      role: { stringValue: 'member' },
      status: { stringValue: 'pending' },
      createdAt: { stringValue: new Date().toISOString() }
    }
  },
  {
    id: 'user-approved-1',
    fields: {
      email: { stringValue: 'approved@example.com' },
      name: { stringValue: 'Approved Member' },
      role: { stringValue: 'member' },
      status: { stringValue: 'approved' },
      createdAt: { stringValue: new Date().toISOString() }
    }
  }
];

const testApps = [
  {
    fields: {
      userId: { stringValue: 'user-pending-1' },
      plantId: { stringValue: 'SN-TEST-001' },
      status: { stringValue: 'pending' },
      message: { stringValue: 'I want this plant!' },
      createdAt: { stringValue: new Date().toISOString() }
    }
  }
];

async function seed() {
  console.log('Seeding members...');
  for (const u of testUsers) {
    const res = await postDoc('profiles', u.id, u.fields);
    console.log(`User ${u.id}: ${res.status}`);
  }

  console.log('Seeding applications...');
  for (const a of testApps) {
    const res = await postDoc('applications', null, a.fields);
    console.log(`App: ${res.status}`);
  }
  
  console.log('Done!');
}

seed().catch(console.error);
