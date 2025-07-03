import { auth } from "./Firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const doSignInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())
export const doSignOut = () => auth.signOut()