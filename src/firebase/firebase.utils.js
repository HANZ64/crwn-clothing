import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBlcYwGDls5f7vsh-rT5PraJwl6eTzxd7o",
  authDomain: "crwn-db-7cf1f.firebaseapp.com",
  projectId: "crwn-db-7cf1f",
  storageBucket: "crwn-db-7cf1f.appspot.com",
  messagingSenderId: "1068597405002",
  appId: "1:1068597405002:web:5943beb1e9633e81434db3",
  measurementId: "G-96PVWYS7NH"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
