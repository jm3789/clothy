// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// firebase: 사용자 인증 관련 기능을 제공함
import { getAuth } from "firebase/auth";
// firebase: 실시간 DB인 firestore을 제공함
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXbtsv74c4Ofano4W0Jm_J2KzyNUuWXjk",
  authDomain: "clothy-5167e.firebaseapp.com",
  projectId: "clothy-5167e",
  storageBucket: "clothy-5167e.appspot.com",
  messagingSenderId: "228701316370",
  appId: "1:228701316370:web:34aee9158dcd58faa0ffcb",
  measurementId: "G-KWRSZXJZZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);  // 인증 서비스 반환
export const db = getFirestore(app);  // firestore와 연결
