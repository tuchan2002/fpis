import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    getDocs,
    getDoc,
    where,
    query,
    limit
} from 'firebase/firestore'
import { db } from './config'

export const getDocuments = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const data = querySnapshot.docs.map((doc) => doc.data())

    return data
}

export const getDocumentsCondition = async (
    collectionName,
    key,
    value
) => {
    const docRef = collection(db, collectionName)

    const q = query(docRef, where(key, '==', value))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())

    return data;
}


export const getDocument = async (
    collectionName,
    key,
    value
) => {
    const docRef = collection(db, collectionName)

    const q = query(docRef, where(key, '==', value), limit(1))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())

    if (data.length === 1) {
        return data[0]
    } else {
        return null
    }
}

export const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
    })
}

export const updateDocument = async (
    collectionName,
    docId,
    data
) => {
    await updateDoc(doc(db, collectionName, docId), data)
}
