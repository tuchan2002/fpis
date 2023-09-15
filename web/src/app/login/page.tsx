'use client'

import {
    Avatar,
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { AppDispatch } from '@/redux'
import GoogleIcon from '@mui/icons-material/Google'
import { addDocument } from '@/firebase/services'
import { auth } from '@/firebase/config'
import {
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signInWithPopup
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()
const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const authReducer = useSelector(authSelector)

    useEffect(() => {
        if (authReducer.user) {
            router.push('/')
        }
    }, [authReducer.user])

    const handleLoginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider)

        const { user } = result
        const details = getAdditionalUserInfo(result)

        console.log(details, result.user)
        if (details?.isNewUser) {
            await addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: details.providerId,
                role: 2
            })
        }
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Paper sx={{ p: 3 }}>
                <Button
                    startIcon={<GoogleIcon />}
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ minWidth: '300px' }}
                    onClick={handleLoginWithGoogle}
                >
                    Sign In With Google
                </Button>
            </Paper>
        </Box>
    )
}

export default Login
