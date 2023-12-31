import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDHIkqlbqMka3nPb5da7b5bGjX2J-s8wR4',
    authDomain: 'fpis-next-app.firebaseapp.com',
    projectId: 'fpis-next-app',
    storageBucket: 'fpis-next-app.appspot.com',
    messagingSenderId: '891889898098',
    appId: '1:891889898098:web:2e5f9e777fad7b7a76e8eb',
    measurementId: 'G-B1PNGY4GQG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
export const imageDb = getStorage(app);
