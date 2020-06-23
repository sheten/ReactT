import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const devFirebaseConfig = {
  apiKey: "AIzaSyAla9S24Bd-BBTSebZ-1BtrSG9kKRy7z0w",
  authDomain: "learning-project-c9519.firebaseapp.com",
  databaseURL: "https://learning-project-c9519.firebaseio.com",
  projectId: "learning-project-c9519",
  storageBucket: "learning-project-c9519.appspot.com",
  messagingSenderId: "972849776151",
  appId: "1:972849776151:web:9b09198b387ab42f3d7e52",
  measurementId: "G-MYENKRXHF5",
};

class Firebase {
  constructor() {
    app.initializeApp(devFirebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  questions = () => this.db.ref("Questions");
}

export default Firebase;
