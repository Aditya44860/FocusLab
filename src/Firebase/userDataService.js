import { firestore } from './Firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

export const initializeUserData = async (userId) => {
  const docRef = doc(firestore, 'user_data', userId)
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
  try {
    const docRef = doc(firestore, 'user_data', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      await initializeUserData(userId)
      return { todos: [], quickNotes: '', timerData: { [new Date().toDateString()]: 0 } }
    }
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

export const updateUserTodos = async (userId, todos) => {
  try {
    const docRef = doc(firestore, 'user_data', userId)
    await setDoc(docRef, { todos }, { merge: true })
    console.log('Todos updated successfully')
  } catch (error) {
    console.error('Error updating todos:', error)
    throw error
  }
}

export const updateUserNotes = async (userId, quickNotes) => {
  try {
    const docRef = doc(firestore, 'user_data', userId)
    await setDoc(docRef, { quickNotes }, { merge: true })
    console.log('Notes updated successfully')
  } catch (error) {
    console.error('Error updating notes:', error)
    throw error
  }
}

export const addTimerSession = async (userId, minutes) => {
  console.log('Adding timer session:', { userId, minutes })
  const today = new Date().toDateString()
  const docRef = doc(firestore, 'user_data', userId)
  const docSnap = await getDoc(docRef)
  const data = docSnap.exists() ? docSnap.data() : {}

  const timerData = data.timerData || {}
  timerData[today] = (timerData[today] || 0) + minutes
  console.log('Updated timer data:', timerData)
  
  // Clean up data older than 14 days
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 14)
  Object.keys(timerData).forEach(date => {
    if (new Date(date) < cutoffDate) {
      delete timerData[date]
    }
  })
  
  await setDoc(docRef, { timerData }, { merge: true })
  console.log('Timer session saved successfully')
}