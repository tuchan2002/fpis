'use client'

import { authSelector } from '@/redux/reducers/authSlice'
import { notFound } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SellProduct = () => {
    const auth = useSelector(authSelector)

    useEffect(() => {
        if (auth.user?.role !== undefined && auth.user?.role !== 1) {
            return notFound()
        }
    }, [auth.user?.role])

    return <div>SellProduct</div>
}

export default SellProduct
