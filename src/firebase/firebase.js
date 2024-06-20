// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf5YzVc-yo9pl3SxdOEwp2dmPb2B37VA0",
  authDomain: "instagram-clone-56463.firebaseapp.com",
  projectId: "instagram-clone-56463",
  storageBucket: "instagram-clone-56463.appspot.com",
  messagingSenderId: "816981661013",
  appId: "1:816981661013:web:62b0037b2112c7ab324bdc",
  measurementId: "G-45V7CSSWZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app,auth,firestore,storage};