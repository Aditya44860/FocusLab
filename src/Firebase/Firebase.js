import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBZ7wf-23Ol39LT-xKR6kkgbtrOnpnk9i0",
  authDomain: "focuslab-dd77b.firebaseapp.com",
  projectId: "focuslab-dd77b",
  storageBucket: "focuslab-dd77b.firebasestorage.app",
  messagingSenderId: "539748841505",
  appId: "1:539748841505:web:46cd243e78a7e177a34b60",
  measurementId: "G-H938FW3VFD"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export { app }
