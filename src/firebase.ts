import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  projectId: "role-plant",
  appId: "1:476055859097:web:f914e658211ebafcb66d08", // 若您的新專案有了不同的 appId，請在此更新
  apiKey: "AIzaSyDV1qEMIShZqDKEWCRacmty_B04ePmcdZc",     // 若您的新專案有了不同的 apiKey，請在此更新
  authDomain: "role-plant.firebaseapp.com",
  storageBucket: "role-plant.firebasestorage.app",
  messagingSenderId: "476055859097",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // 移除舊的非預設 firestoreDatabaseId
export const auth = getAuth(app);
export const functions = getFunctions(app);
