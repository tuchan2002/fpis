'use client'

import { AppDispatch } from '@/redux'
import { authSelector, getAuth } from '@/redux/reducers/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>()

    const auth = useSelector(authSelector)
    console.log('auth', auth)

    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch])

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/login')
        }
    }, [router])

    return <>{children}</>
}

export default WrapperContainer
