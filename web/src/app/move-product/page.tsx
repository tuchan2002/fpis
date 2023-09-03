'use client'

import { authSelector } from '@/redux/reducers/authSlice'
import { notFound } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const MoveProduct = () => {
    const auth = useSelector(authSelector)

    useEffect(() => {
        console.log(auth.user?.role)

        if (auth.user?.role !== undefined && auth.user?.role !== 0) {
            return notFound()
        }
    }, [auth.user?.role])

    return <div>MoveProduct</div>
}

export default MoveProduct
