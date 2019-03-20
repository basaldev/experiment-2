import { default as _firebase, initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyDBi-zg9xiry5_Mhs1nsVHpzBtSuyyUIX4',
  authDomain: 'edge-1-794d6.firebaseapp.com',
  databaseURL: 'https://edge-1-794d6.firebaseio.com',
  projectId: 'edge-1-794d6',
  storageBucket: 'edge-1-794d6.appspot.com',
  messagingSenderId: '516826054878',
});

export const firestore = _firebase.firestore(app);
export const firebase = _firebase;
