


import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDuAccmaowhmebfpIlOc4-Zm67J8LDD4iI",
    authDomain: "auth-4f627.firebaseapp.com",
    projectId: "auth-4f627",
    storageBucket: "auth-4f627.appspot.com",
    messagingSenderId: "989932541127",
    appId: "1:989932541127:web:3672dda0cc84d80b0c9ae2",
    measurementId: "G-5PHWDZ7M29"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
export const db=getFirestore(app)



