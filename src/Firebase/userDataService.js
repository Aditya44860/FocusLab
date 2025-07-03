import { db } from './Firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

export const initializeUserData = async (userId) => {
  const docRef = doc(db, 'user_data', userId)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    const today = new Date().toDateString()
    await setDoc(docRef, { 
      todos: [], 
      quickNotes: '', 
      timerData: { [today]: 0 } 
    })
  }
}

export const getUserData = async (userId) => {
  const docRef = doc(db, 'user_data', userId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    await initializeUserData(userId)
    return { todos: [], quickNotes: '', timerData: { [new Date().toDateString()]: 0 } }
  }
}

export const updateUserTodos = async (userId, todos) => {
  const docRef = doc(db, 'user_data', userId)
  await setDoc(docRef, { todos }, { merge: true })
}

export const updateUserNotes = async (userId, quickNotes) => {
  const docRef = doc(db, 'user_data', userId)
  await setDoc(docRef, { quickNotes }, { merge: true })
}

export const addTimerSession = async (userId, minutes) => {
  const today = new Date().toDateString()
  const docRef = doc(db, 'user_data', userId)
  const docSnap = await getDoc(docRef)
  const data = docSnap.exists() ? docSnap.data() : {}
  const timerData = data.timerData || {}
  timerData[today] = (timerData[today] || 0) + minutes
  
  // Clean up data older than 14 days
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 14)
  Object.keys(timerData).forEach(dateStr => {
    if (new Date(dateStr) < cutoffDate) {
      delete timerData[dateStr]
    }
  })
  
  await setDoc(docRef, { timerData }, { merge: true })
}