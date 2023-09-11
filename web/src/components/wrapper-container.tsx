'use client'

import { AppDispatch } from '@/redux'
import { authSelector, getAuth } from '@/redux/reducers/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import GlobalAlert from './global-alert'

const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>()

    const authReducer = useSelector(authSelector)
    console.log('authReducer', authReducer)

    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch])

    useEffect(() => {
        if (!authReducer.token) {
            router.push('/login')
        }
    }, [authReducer.token])

    return (
        <>
            <GlobalAlert />
            {children}
        </>
    )
}

export default WrapperContainer
