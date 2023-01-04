import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjMDZiXFK6HL1gqPgdGVF95gHJdJMJaU0",
  authDomain: "vlabusocial.firebaseapp.com",
  projectId: "vlabusocial",
  storageBucket: "vlabusocial.appspot.com",
  messagingSenderId: "494313567044",
  appId: "1:494313567044:web:d8c0c37e279af73fa6dd11",
  measurementId: "G-62FH8NHYZK",
};

// Initialize Firebase
// firebase.initializeApp(name:,firebaseConfig);
// const analytics = getAnalytics(app);

// export default firebase;

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
