import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCzoUDg1z_t1NXo0R8mTxm3FhjyEtYoyyY',
    authDomain: 'assignment-60f96.firebaseapp.com',
    projectId: 'assignment-60f96',
    storageBucket: 'assignment-60f96.appspot.com',
    messagingSenderId: '307224862308',
    appId: '1:307224862308:web:84ac6ae520746019ed8971',
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth };