import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);