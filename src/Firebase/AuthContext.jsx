import React, { useEffect, useState, useContext } from "react"
import { auth } from "./Firebase"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserLoggedIn(!!user);
      setLoading(false);
    });
  }, [])

  const value = {
    user,
    userLoggedIn,
    loading,
  }
  return <AuthContext.Provider value={value}> {!loading && children} </AuthContext.Provider>
}