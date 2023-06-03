import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnWBBYbc2LV6gh2S9uqyaKUxFFx_OmTSs",
  authDomain: "texteditor-67990.firebaseapp.com",
  projectId: "texteditor-67990",
  storageBucket: "texteditor-67990.appspot.com",
  messagingSenderId: "482954164502",
  appId: "1:482954164502:web:02fc3ab2d851961cb13837",
  measurementId: "G-2BM2YNXFBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
