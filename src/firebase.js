import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqBZH40BuGh4AOoYFncvq7vr7NUpTIj7Y",
  authDomain: "advanced-classroom-b0ce7.firebaseapp.com",
  projectId: "advanced-classroom-b0ce7",
  storageBucket: "advanced-classroom-b0ce7.appspot.com",
  messagingSenderId: "749083923014",
  appId: "1:749083923014:web:02a089c0a3cff845817047",
  measurementId: "G-3K3H00YK2L"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
var storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export { app, auth, db, storage, signInWithGoogle, logout };
