/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

if (import.meta.env.DEV) {
  console.log('DEV MODE: Connecting to Firebase Emulators');
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}