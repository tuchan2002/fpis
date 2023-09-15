'use client'

import { AppDispatch } from '@/redux'
import { authSelector, handleAuthStateChanged } from '@/redux/reducers/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import GlobalAlert from './global-alert'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'

const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    
    const authReducer  = useSelector(authSelector);

    useEffect(() => {
        const unsubcribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user
                dispatch(
                    handleAuthStateChanged({
                        displayName,
                        email,
                        uid,
                        photoURL
                    })
                    )
                }
        })
        
        return () => {
            unsubcribed()
        }
    }, [dispatch])
    
    useEffect(() => {
        if (!authReducer.user) {
            router.push('/login')
        }
    }, [router,authReducer.user])

    return (
        <>
            <GlobalAlert />
            {children}
        </>
    )
}

export default WrapperContainer
