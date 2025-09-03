import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'taskflow-zhpsl',
  appId: '1:383473825701:web:21e2462da982068be7da4c',
  storageBucket: 'taskflow-zhpsl.firebasestorage.app',
  apiKey: 'AIzaSyBX3rZq81bMvBodmaW-CwWHqyPC62omoMI',
  authDomain: 'taskflow-zhpsl.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '383473825701',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
