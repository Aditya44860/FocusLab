import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase/Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { FiFileText } from 'react-icons/fi'

const SharedNote = () => {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchSharedNote()
  }, [id])

  const fetchSharedNote = async () => {
    try {
      const docRef = doc(db, 'publicNotes', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setNote({ id: docSnap.id, ...docSnap.data() })
      } else {
        setError(true)
      }
    } catch (error) {
      console.error('Error fetching shared note:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen flex items-center justify-center">
        <div className="text-[#4C4037] text-xl">Loading shared note...</div>
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen flex items-center justify-center">
        <div className="bg-[#F7E5C5] p-8 rounded-2xl border-2 border-[#C49B59] text-center">
          <h1 className="text-2xl font-bold text-[#4C4037] mb-4">Note Not Found</h1>
          <p className="text-[#967259]">This shared note doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#E9CA9F] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#F7E5C5] rounded-2xl shadow-lg p-8 border-2 border-[#C49B59]">
          <div className="flex items-center gap-3 mb-6">
            <FiFileText size={32} className="text-[#B6825E]" />
            <h1 className="text-3xl font-bold text-[#4C4037]">{note.title}</h1>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-[#E9CA9F] min-h-96">
            <div className="text-[#4C4037] whitespace-pre-wrap">
              {note.content || 'This note is empty.'}
            </div>
          </div>
          
          <p className="text-sm text-[#967259] mt-4 text-center">
            Shared on {note.createdAt?.toDate?.()?.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SharedNote