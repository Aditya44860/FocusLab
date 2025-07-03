import React, { useEffect, useState, useContext, createContext } from "react"
import { auth } from "./Firebase"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
      setUserLoggedIn(!!user)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, userLoggedIn, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}