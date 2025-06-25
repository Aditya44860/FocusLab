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
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe 
  }, [])

  async function initializeUser(user) {
    if (user) {
      setUser(user)
      setUserLoggedIn(true)
    } else {
      setUser(null)
      setUserLoggedIn(false)
    }
    setLoading(false)
  }

  const value = {
    user,
    userLoggedIn,
    loading,
  }
  return <AuthContext.Provider value={value}> {!loading && children} </AuthContext.Provider>
}