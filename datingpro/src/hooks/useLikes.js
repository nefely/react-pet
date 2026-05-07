import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export async function getLikes(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data().likedIds ?? []) : []
}

export async function toggleLike(uid, targetId) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  const current = snap.exists() ? (snap.data().likedIds ?? []) : []
  const updated = current.includes(targetId)
    ? current.filter((id) => id !== targetId)
    : [...current, targetId]
  await setDoc(ref, { likedIds: updated }, { merge: true })
  return updated
}
