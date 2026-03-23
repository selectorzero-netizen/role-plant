import fetch from 'node-fetch';

async function testRead() {
  const url = 'http://127.0.0.1:8080/v1/projects/role-plant/databases/(default)/documents/taxonomy';
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Taxonomy data found in Emulator:');
    console.log(JSON.stringify(data, null, 2));
    
    const rare_plants = data.documents?.find(d => d.name.endsWith('rare_plants'));
    if (rare_plants) {
      console.log('SUCCESS: "rare_plants" is present and readable.');
    } else {
      console.log('FAILURE: "rare_plants" not found in document list.');
    }
  } catch (e) {
    console.error('Fetch failed:', e.message);
  }
}

testRead();
