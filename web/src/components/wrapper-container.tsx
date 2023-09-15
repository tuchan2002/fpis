'use client'

import { AppDispatch } from '@/redux'
import {
    authSelector,
    handleAuthStateChanged
} from '@/redux/reducers/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import GlobalAlert from './global-alert'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { getDocument } from '@/firebase/services'
import { IUser } from '@/global-types'

const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const authReducer = useSelector(authSelector)

    useEffect(() => {
        const unsubcribed = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDocument('users', 'uid', user.uid)
                console.log('userDoc', userDoc)

                const { displayName, email, uid, photoURL } = user
                dispatch(
                    handleAuthStateChanged({
                        displayName,
                        email,
                        uid,
                        photoURL,
                        role: userDoc?.role 
                    })
                )
            } else {
                router.push('/login')
            }
        })

        return () => {
            unsubcribed()
        }
    }, [dispatch])

    return (
        <>
            <GlobalAlert />
            {children}
        </>
    )
}

export default WrapperContainer
