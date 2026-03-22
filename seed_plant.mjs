/**
 * Seeds a test plant directly into Firestore Emulator via REST.
 * Firestore Emulator REST: http://localhost:8080/v1/projects/{project}/databases/(default)/documents/{collection}
 */
import fetch from 'node:http';

const PROJECT_ID = 'role-plant';
const BASE = `http://127.0.0.1:8080`;

const plantDoc = {
  fields: {
    name: { stringValue: "QA TestPlant" },
    localName: { stringValue: "QA俗名" },
    scientificName: { stringValue: "Dioscorea qa-testii" },
    serialNumber: { stringValue: "SN-QA-001" },
    description: { stringValue: "QA test plant for gate verification" },
    detailedDescription: { stringValue: "Detailed QA test" },
    status: { stringValue: "exhibiting" },
    visibility: { stringValue: "public" },
    featuredOnHome: { booleanValue: false },
    availableForApplication: { booleanValue: false },
    grade: { stringValue: "" },
    category: { stringValue: "" },
    tags: { arrayValue: { values: [] } },
    images: { arrayValue: { values: [] } },
    coverImageUrl: { stringValue: "" },
    price: { nullValue: "NULL_VALUE" },
    createdAt: { stringValue: new Date().toISOString() },
    updatedAt: { stringValue: new Date().toISOString() }
  }
};

const url = `${BASE}/v1/projects/${PROJECT_ID}/databases/(default)/documents/plants`;
const body = JSON.stringify(plantDoc);

console.log(`POSTing to: ${url}`);
console.log(`Body: ${body.substring(0, 200)}...`);

// Use native http module
import { request } from 'http';

const options = {
  hostname: '127.0.0.1',
  port: 8080,
  path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/plants`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  }
};

const req = request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${data.substring(0, 500)}`);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('\n✅ Plant seeded successfully!');
      const parsed = JSON.parse(data);
      const docId = parsed.name?.split('/').pop();
      console.log(`Document ID: ${docId}`);
    } else {
      console.log('\n❌ Seeding failed');
    }
  });
});

req.on('error', e => console.error('Request error:', e));
req.write(body);
req.end();
