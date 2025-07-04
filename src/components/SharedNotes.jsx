import React, { useState, useEffect } from 'react'
import { useAuth } from '../Firebase/AuthContext'
import { firestore } from '../Firebase/Firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { FiFileText } from 'react-icons/fi'

const SharedNotes = () => {
  const { user, userLoggedIn } = useAuth()
  const [sharedNotes, setSharedNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userLoggedIn && user) {
      fetchSharedNotes()
    }
  }, [userLoggedIn, user])

  const fetchSharedNotes = async () => {
    try {
      const q = query(
        collection(firestore, 'sharedNotes'), 
        where('sharedWith', '==', user.email)
      )
      const querySnapshot = await getDocs(q)
      setSharedNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error('Error fetching shared notes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!userLoggedIn || loading) return null

  if (sharedNotes.length === 0) return null

  return (
    <div className="bg-[#F7E5C5] rounded-2xl shadow-lg p-4 border-2 border-[#C49B59] mb-6">
      <h2 className="text-xl font-semibold text-[#4C4037] mb-4">Notes Shared With You</h2>
      <div className="space-y-3">
        {sharedNotes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg border border-[#E9CA9F]">
            <div className="flex items-start gap-3">
              <FiFileText className="text-[#B6825E] mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-[#4C4037] mb-1">{note.title}</h3>
                <p className="text-sm text-[#967259] mb-2">
                  Shared on {note.sharedAt?.toDate?.()?.toLocaleDateString()}
                </p>
                <div className="text-sm text-[#4C4037] bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                  {note.content || 'No content'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SharedNotes