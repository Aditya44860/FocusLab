import React, { useState, useEffect } from 'react'
import { useAuth } from '../Firebase/AuthContext'
import LoginRequired from '../components/LoginRequired'
import TextEditor from '../components/TextEditor'
import { firestore } from '../Firebase/Firebase'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore'
import { FiPlus, FiArrowLeft, FiTrash2, FiFileText, FiSave, FiEdit3 } from 'react-icons/fi'
import ShareButton from '../components/ShareButton'


const Notes = () => {
  const { userLoggedIn, user } = useAuth()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState('')


  document.title = "FocusLab - Notes"

  useEffect(() => {
    if (userLoggedIn && user) {
      fetchDocs()
    } else {
      setDocs([])
      setSelectedDoc(null)
      setLoading(false)
    }
  }, [userLoggedIn, user])

  if (!userLoggedIn) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen">
        <LoginRequired />
      </div>
    )
  }

  const fetchDocs = async () => {
    try {
      const q = query(collection(firestore, 'notes'), where('userId', '==', user.uid))
      const querySnapshot = await getDocs(q)
      setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error('Error fetching docs:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewDoc = async () => {
    const docTitle = prompt('Enter document title:') || 'Untitled Document'
    try {
      const docRef = await addDoc(collection(firestore, 'notes'), {
        title: docTitle,
        content: '',
        userId: user.uid,
        createdAt: new Date(),
        lastModified: new Date()
      })
      setSelectedDoc({ id: docRef.id, title: docTitle, content: '' })
      setContent('')
      setNewTitle(docTitle)
      fetchDocs()
    } catch (error) {
      console.error('Error creating document:', error)
    }
  }

  const deleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDoc(doc(firestore, 'notes', docId))
        if (selectedDoc?.id === docId) {
          setSelectedDoc(null)
        }
        fetchDocs()
      } catch (error) {
        console.error('Error deleting document:', error)
      }
    }
  }

  const openDocument = (document) => {
    setSelectedDoc(document)
    setContent(document.content || '')
    setNewTitle(document.title)
    setHasUnsavedChanges(false)
  }

  const goBackToList = () => {
    if (hasUnsavedChanges) {
      setShowWarning(true)
    } else {
      setSelectedDoc(null)
      setContent('')
    }
  }

  const handleYes = () => {
    setSelectedDoc(null)
    setContent('')
    setHasUnsavedChanges(false)
    setShowWarning(false)
  }

  const handleNo = () => {
    setShowWarning(false)
  }

  const saveDocument = async () => {
    if (!selectedDoc) return
    
    setSaving(true)
    try {
      await updateDoc(doc(firestore, 'notes', selectedDoc.id), {
        title: newTitle,
        content: content,
        lastModified: new Date()
      })
      setSelectedDoc({...selectedDoc, title: newTitle})
      fetchDocs()
      setSaved(true)
      setHasUnsavedChanges(false)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving document:', error)
    } finally {
      setSaving(false)
    }
  }



  if (selectedDoc) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen">
        <div className="bg-[#F7E5C5] p-2 md:p-4 border-b-2 md:border-b-4 border-[#C49B59] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <button
              onClick={goBackToList}
              className="bg-[#B6825E] text-white p-2 rounded-lg hover:bg-[#967259] transition-colors flex-shrink-0"
            >
              <FiArrowLeft size={16} className="md:w-5 md:h-5" />
            </button>
            {editingTitle ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value)
                  setHasUnsavedChanges(true)
                }}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setEditingTitle(false)
                  }
                }}
                className="text-sm md:text-xl font-semibold text-[#4C4037] bg-transparent border-b-2 border-[#C49B59] outline-none flex-1 min-w-0"
                autoFocus
              />
            ) : (
              <h2 
                className="text-sm md:text-xl font-semibold text-[#4C4037] truncate cursor-pointer hover:text-[#967259] transition-colors"
                onClick={() => setEditingTitle(true)}
                title="Click to edit title"
              >
                {newTitle}
              </h2>
            )}
          </div>
          
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <button
              onClick={saveDocument}
              disabled={saving}
              className="bg-green-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 md:gap-2 text-xs md:text-base"
            >
              <FiSave size={14} className="md:w-4 md:h-4" />
              <span className="hidden md:inline">{saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}</span>
              <span className="md:hidden">{saving ? '...' : saved ? '✓' : 'Save'}</span>
            </button>

            <ShareButton 
              noteTitle={selectedDoc.title}
              noteContent={content}
              userId={user.uid}
            />

            <button
              onClick={() => deleteDocument(selectedDoc.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
            >
              <FiTrash2 size={14} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        <div className="p-2 md:p-6 flex justify-center">
          <div className="w-full max-w-7xl">
            <TextEditor 
              content={content}
              onChange={(newContent) => {
                setContent(newContent)
                setHasUnsavedChanges(true)
              }}
              title={selectedDoc.title}
            />
          </div>
        </div>
        {showWarning && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
              <h3 className="text-lg font-semibold text-[#4C4037] mb-4">Unsaved Changes</h3>
              <p className="text-[#967259] mb-6">You have unsaved changes. Do you want to go back without saving?</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleNo}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  No
                </button>
                <button
                  onClick={handleYes}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-[#E9CA9F] min-h-screen py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        <div className="bg-[#F7E5C5] rounded-2xl shadow-lg p-4 md:p-8 border-2 md:border-4 border-[#C49B59]">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-8 gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-[#4C4037] text-center sm:text-left" style={{ fontFamily: "Orbitron, sans-serif" }}>
              My Notes
            </h1>
            <button
              onClick={createNewDoc}
              className="bg-[#B6825E] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#967259] transition-colors flex items-center gap-2 font-semibold text-sm md:text-base"
            >
              <FiPlus size={16} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">New Document</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-[#967259] text-lg">Loading your documents...</div>
            </div>
          ) : docs.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText size={64} className="mx-auto text-[#C49B59] mb-4" />
              <h3 className="text-xl font-semibold text-[#4C4037] mb-2">No documents yet</h3>
              <p className="text-[#967259] mb-6">Create your first Google Doc to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {docs.map((document) => (
                <div key={document.id} className="bg-white rounded-lg p-4 md:p-6 shadow-md border-2 border-[#E9CA9F] hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <FiFileText size={24} className="text-[#B6825E] flex-shrink-0" />
                    <button
                      onClick={() => deleteDocument(document.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-[#4C4037] mb-2 line-clamp-2 text-sm md:text-base">
                    {document.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-[#967259] mb-3 md:mb-4">
                    Created: {document.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                  </p>
                  
                  <button
                    onClick={() => openDocument(document)}
                    className="w-full bg-[#4C4037] text-white py-2 px-3 md:px-4 rounded-lg hover:bg-[#3a2f26] transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <FiEdit3 size={14} className="md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Edit Note</span>
                    <span className="sm:hidden">Edit</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notes