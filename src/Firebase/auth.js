import { auth } from "./Firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from 'firebase/auth';

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () =>{
    return auth.signOut()
}