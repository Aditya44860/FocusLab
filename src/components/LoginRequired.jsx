import React from 'react'
import { motion } from 'framer-motion'
import { doSignInWithGoogle } from '../Firebase/auth'

const LoginRequired = () => {
  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#FBF0E3] p-8 rounded-2xl shadow-2xl border-2 border-[#d3ac77] max-w-md mx-4 text-center"
      >
        <h2 className="text-2xl font-bold text-[#4C4037] mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
          Please Login to Continue
        </h2>
        <p className="text-[#967259] mb-6">
          You need to be logged in to access this page.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-[#4C4037] text-[#FBF0E3] px-6 py-3 rounded-lg font-semibold hover:bg-[#3a2f26] transition-colors w-full"
        >
          Continue with Google
        </button>
      </motion.div>
    </div>
  )
}

export default LoginRequired