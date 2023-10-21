import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDh82CnkElC8Z7boz3Zv9e0Hyk9Px8u8vU',
  authDomain: 'bettergpt-4.firebaseapp.com',
  projectId: 'bettergpt-4',
  storageBucket: 'bettergpt-4.appspot.com',
  messagingSenderId: '288025512056',
  appId: '1:288025512056:web:797cb713ef3b8e7710058d',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
