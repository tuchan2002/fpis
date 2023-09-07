'use client'

import { authSelector } from '@/redux/reducers/authSlice'
import React from 'react'
import { useSelector } from 'react-redux'

const MoveProduct = () => {
    const auth = useSelector(authSelector)

    console.log(auth)

    return <div>MoveProduct</div>
}

export default MoveProduct
