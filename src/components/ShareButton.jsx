import React, { useState } from 'react'
import { FiShare2, FiX, FiCopy } from 'react-icons/fi'
import { firestore } from '../Firebase/Firebase'
import { collection, addDoc } from 'firebase/firestore'

const ShareButton = ({ noteTitle, noteContent, userId }) => {
  const [showModal, setShowModal] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [generating, setGenerating] = useState(false)

  const generateShareLink = async () => {
    setGenerating(true)
    try {
      const docRef = await addDoc(collection(firestore, 'publicNotes'), {
        title: noteTitle,
        content: noteContent,
        sharedBy: userId,
        createdAt: new Date()
      })
      const link = `${window.location.origin}/shared/${docRef.id}`
      setShareLink(link)
    } catch (error) {
      console.error('Error generating share link:', error)
      alert('Failed to generate share link')
    } finally {
      setGenerating(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    alert('Link copied to clipboard!')
  }

  const handleShare = () => {
    setShowModal(true)
    if (!shareLink) {
      generateShareLink()
    }
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 md:gap-2 text-xs md:text-base"
      >
        <FiShare2 size={14} className="md:w-4 md:h-4" />
        <span className="hidden md:inline">Share</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#4C4037]">Share Note</h3>
              <button onClick={() => setShowModal(false)}>
                <FiX size={20} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            
            {generating ? (
              <p className="text-[#967259] text-center py-4">Generating share link...</p>
            ) : shareLink ? (
              <>
                <p className="text-[#967259] mb-4">Share this link with anyone:</p>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyLink}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FiCopy size={16} />
                  </button>
                </div>
              </>
            ) : null}
            
          </div>
        </div>
      )}
    </>
  )
}

export default ShareButton