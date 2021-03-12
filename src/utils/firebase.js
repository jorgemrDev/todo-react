import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDReJBfbAC9Xsr5XAQZW6gKVPKRbNcBL30",
  authDomain: "todo-db0ca.firebaseapp.com",
  projectId: "todo-db0ca",
  storageBucket: "todo-db0ca.appspot.com",
  messagingSenderId: "297609012126",
  appId: "1:297609012126:web:8f1722ede2021117e62c8f",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
