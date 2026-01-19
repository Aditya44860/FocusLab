import React, { useState, useEffect, useRef } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useAuth } from '../Firebase/AuthContext'
import { getUserData, updateUserNotes } from '../Firebase/userDataService' 

const Notes = () => {
  const { user, userLoggedIn } = useAuth()
  const [note, setNote] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (userLoggedIn && user) {
      getUserData(user.uid).then(data => setNote(data.quickNotes || ''))
    } else {
      const savedNote = localStorage.getItem('quickNote')
      if (savedNote) setNote(savedNote)
    }
  }, [userLoggedIn, user])

  useEffect(() => {
    if (userLoggedIn && user) {
      const timeoutId = setTimeout(async () => {
        try {
          await updateUserNotes(user.uid, note)
        } catch (error) {
          console.error('Failed to save note:', error)
        }
      }, 1000)
      return () => clearTimeout(timeoutId)
    } else {
      localStorage.setItem('quickNote', note)
    }
  }, [note, userLoggedIn, user])

  const insertBullet = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const bullet = '✩ ';
    const updatedNote = note.substring(0, start) + bullet + note.substring(textarea.selectionEnd);
    setNote(updatedNote);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + bullet.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="w-full h-auto bg-[#F7E5C5] border-2 rounded-2xl border-[#C49B59] p-4 pb-0">
      <div className="flex justify-between items-center mb-4">
        
        <h2 className="text-xl font-semibold text-[#5B4636] flex-1 text-center">Quick Notes</h2>
        <button
          onClick={insertBullet}
          className="text-[#5B4636] hover:text-[#a66e2f] transition"
          aria-label="Add bullet"
        >
          <FiPlus size={20} />
        </button>
      </div>
      
      <textarea
        ref={textareaRef}
        className="w-full h-64 p-4 rounded-xl border border-[#C49B59] text-[#5B4636] bg-[#FFF7EA] resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-[#C49B59]"
        placeholder="Write your notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex justify-center p-0 mb-1">
        <button
          onClick={() => {
            setNote('')
            if (userLoggedIn && user) {
              updateUserNotes(user.uid, '')
            }
          }} 
          className="text-[#5B4636] hover:text-red-500 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Notes;