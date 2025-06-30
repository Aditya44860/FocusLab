import React, { useState, useEffect } from 'react'
import { useAuth } from '../Firebase/AuthContext'
import LoginRequired from '../components/LoginRequired'
import TextEditor from '../components/TextEditor'
import { db } from '../Firebase/Firebase'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, orderBy } from 'firebase/firestore'
import { FiPlus, FiArrowLeft, FiTrash2, FiFileText, FiEdit3, FiSave } from 'react-icons/fi'

const Notes = () => {
  const { userLoggedIn, user } = useAuth()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

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
      console.log('Fetching docs for user:', user.uid)
      const q = query(
        collection(db, 'notes'),
        where('userId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      console.log('Query result:', querySnapshot.size, 'documents')
      const docsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setDocs(docsData)
    } catch (error) {
      console.error('Error fetching docs:', error)
      alert('Error loading notes: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const createNewDoc = async () => {
    const docTitle = prompt('Enter document title:') || 'Untitled Document'
    
    try {
      console.log('Creating doc for user:', user.uid)
      const docRef = await addDoc(collection(db, 'notes'), {
        title: docTitle,
        content: '',
        userId: user.uid,
        createdAt: new Date(),
        lastModified: new Date()
      })
      console.log('Document created:', docRef.id)
      
      setSelectedDoc({
        id: docRef.id,
        title: docTitle,
        content: ''
      })
      setContent('')
      fetchDocs()
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Error creating note: ' + error.message)
    }
  }

  const deleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDoc(doc(db, 'notes', docId))
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
  }

  const goBackToList = () => {
    setSelectedDoc(null)
    setContent('')
  }

  const saveDocument = async () => {
    if (!selectedDoc) return
    
    setSaving(true)
    try {
      await updateDoc(doc(db, 'notes', selectedDoc.id), {
        content: content,
        lastModified: new Date()
      })
      fetchDocs()
      setSaved(true)
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
        <div className="bg-[#F7E5C5] p-4 border-b-4 border-[#C49B59] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goBackToList}
              className="bg-[#B6825E] text-white p-2 rounded-lg hover:bg-[#967259] transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-[#4C4037]">{selectedDoc.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={saveDocument}
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FiSave size={16} />
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
            </button>
            <button
              onClick={() => deleteDocument(selectedDoc.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <TextEditor 
            content={content}
            onChange={setContent}
            title={selectedDoc.title}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#E9CA9F] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#F7E5C5] rounded-2xl shadow-lg p-8 border-4 border-[#C49B59]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#4C4037]" style={{ fontFamily: "Orbitron, sans-serif" }}>
              My Notes
            </h1>
            <button
              onClick={createNewDoc}
              className="bg-[#B6825E] text-white px-6 py-3 rounded-lg hover:bg-[#967259] transition-colors flex items-center gap-2 font-semibold"
            >
              <FiPlus size={20} />
              New Document
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((document) => (
                <div key={document.id} className="bg-white rounded-lg p-6 shadow-md border-2 border-[#E9CA9F] hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <FiFileText size={24} className="text-[#B6825E] flex-shrink-0" />
                    <button
                      onClick={() => deleteDocument(document.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-[#4C4037] mb-2 line-clamp-2">
                    {document.title}
                  </h3>
                  
                  <p className="text-sm text-[#967259] mb-4">
                    Created: {document.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                  </p>
                  
                  <button
                    onClick={() => openDocument(document)}
                    className="w-full bg-[#4C4037] text-white py-2 px-4 rounded-lg hover:bg-[#3a2f26] transition-colors flex items-center justify-center gap-2"
                  >
                    <FiEdit3 size={16} />
                    Edit Note
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