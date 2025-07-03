import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FiEdit3 } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { updateProfile } from 'firebase/auth'

const ProfilePopup = ({ user, onLogout, onClose, isVisible }) => {
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState(user?.displayName || '')

  const saveUsername = async () => {
    if (newName.trim() && user) {
      await updateProfile(user, { displayName: newName.trim() })
      setEditing(false)
    }
  }

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
            {editing ? (
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-center border rounded px-2 py-1 text-sm text-black  font-sans"
                  onKeyDown={(e) => e.key === 'Enter' && saveUsername()}
                  autoFocus
                />
                <button onClick={saveUsername} className="text-green-600 text-sm">✓</button>
                <button onClick={() => setEditing(false)} className="text-red-600 text-sm">✕</button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="font-semibold tracking-wider text-[#4C4037] font-sans">
                  {user?.displayName || user?.email || 'User'}
                </p>
                <FiEdit3 
                  className="w-4 h-4 text-[#967259] cursor-pointer hover:text-[#4C4037]" 
                  onClick={() => setEditing(true)}
                />
              </div>
            )}
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