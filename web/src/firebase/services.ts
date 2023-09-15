import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc
} from 'firebase/firestore'
import { db } from './config'

export const addDocument = async (collectionName: string, data: object) => {
    await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
    })
}

export const updateDocument = async (
    collectionName: string,
    docId: string,
    data: object
) => {
    await updateDoc(doc(db, collectionName, docId), data)
}
