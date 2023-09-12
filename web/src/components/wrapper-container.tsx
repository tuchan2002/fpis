'use client'

import { AppDispatch } from '@/redux'
import { getAuth } from '@/redux/reducers/authSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import GlobalAlert from './global-alert'

const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch])

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/login')
        }
    }, [router])

    return (
        <>
            <GlobalAlert />
            {children}
        </>
    )
}

export default WrapperContainer
