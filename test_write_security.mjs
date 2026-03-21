import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-zSo8zwc4husVpiT5V-R3I5VvouypoZk",
  authDomain: "role-plant.firebaseapp.com",
  projectId: "role-plant",
  storageBucket: "role-plant.firebasestorage.app",
  messagingSenderId: "495394835377",
  appId: "1:495394835377:web:6ec658862d5b879f9ecb90",
  measurementId: "G-3HQ5KTQGP4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runTest() {
  console.log("=== FIRESTORE SECURITY RULE TEST ===");
  console.log("Context: Unauthenticated / Non-Admin User");
  
  // Test 1: Public Read
  try {
    console.log("\nAttempting PUBLIC READ on settings/membership...");
    const snap = await getDoc(doc(db, 'settings', 'membership'));
    console.log("-> [SUCCESS] Read allowed. Document exists:", snap.exists());
  } catch(e) {
    console.error("-> [FAILED] Public Read failed! Error:", e.message);
  }

  // Test 2: Unauthorized Write
  try {
    console.log("\nAttempting UNAUTHORIZED WRITE on settings/membership...");
    await setDoc(doc(db, 'settings', 'membership'), { hero: { title: "HACKED" } });
    console.log("-> [VULNERABILITY] Write succeeded! This should not happen.");
  } catch(e) {
    console.error("-> [EXPECTED BLOCK] Write correctly denied by Firestore Rules.");
    console.error("   Reason:", e.message);
  }
  
  process.exit(0);
}

runTest();
