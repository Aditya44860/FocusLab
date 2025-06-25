import React from 'react'
import { useAuth } from '../Firebase/AuthContext'
import LoginRequired from '../components/LoginRequired'

const Notes = () => {
  const { userLoggedIn } = useAuth()

  document.title = "FocusLab"

  return (
    <div>
      Notes
      {!userLoggedIn && <LoginRequired />}
    </div>
  )
}

export default Notes