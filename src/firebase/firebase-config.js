import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
//  environment variables 👩‍💻


const firebaseConfig = {
  apiKey: "AIzaSyCqwwHuX-EpOVECGZwZHop1ucwiTkwR78c",
  authDomain: "fb-clone-1c671.firebaseapp.com",
  databaseURL: "https://fb-clone-1c671-default-rtdb.firebaseio.com",
  projectId: "fb-clone-1c671",
  storageBucket: "fb-clone-1c671.appspot.com",
  messagingSenderId: "358777631194",
  appId: "1:358777631194:web:e4f92a5f56a43e38f5d0e3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)