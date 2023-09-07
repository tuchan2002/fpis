'use client'

import { authSelector } from '@/redux/reducers/authSlice'
import React from 'react'
import { useSelector } from 'react-redux'

const SellProduct = () => {
    const auth = useSelector(authSelector)

    console.log(auth)

    return <div>SellProduct</div>
}

export default SellProduct
