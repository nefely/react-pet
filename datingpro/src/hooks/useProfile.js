import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useProfile(uid) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid)).then((snap) => {
      setProfile(snap.exists() ? snap.data() : {})
      setLoading(false)
    })
  }, [uid])

  const saveProfile = async (data) => {
    await setDoc(doc(db, 'users', uid), data, { merge: true })
    setProfile((prev) => ({ ...prev, ...data }))
  }

  return { profile, loading, saveProfile }
}
