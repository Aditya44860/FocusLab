import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ProfilePopup = ({ user, onLogout, onClose, isVisible }) => {
  if (!isVisible) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        className="absolute top-16 right-4 bg-[#FBF0E3] rounded-lg shadow-lg border-2 border-[#d3ac77] p-7 z-50 min-w-[250px]"
      >
        <div className="flex flex-col items-center gap-3">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-12 h-12 rounded-full border-2 border-[#967259]"
            />
          ) : (
            <FaUserCircle className="w-12 h-12 text-[#967259]" />
          )}
          
          <div className="text-center">
            <p className="font-semibold tracking-wider text-[#4C4037]">
              {user?.displayName || user?.email || 'User'}
            </p>
            {user?.email && user?.displayName && (
              <p className="text-sm font-serif text-[#967259]">{user.email}</p>
            )}
          </div>
          
          <button
            onClick={onLogout}
            className="w-full bg-[#663b1a] text-[#ffd9a1] py-2 px-4 cursor-pointer rounded-lg hover:bg-[#3a2f26] font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default ProfilePopup