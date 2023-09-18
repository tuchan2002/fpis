'use client'

import { Box, Button, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signInWithPopup
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { authSelector } from '../../redux/reducers/authSlice'
import { auth } from '../../firebase/config'
import { addDocument } from '../../firebase/services'
import GoogleIcon from '@mui/icons-material/Google';

const googleProvider = new GoogleAuthProvider()
const Login = () => {
    const navigate = useNavigate()

    const authReducer = useSelector(authSelector)

    useEffect(() => {
        if (authReducer.user) {
            navigate('/')
        }
    }, [authReducer.user])

    const handleLoginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider)

        const { user } = result
        const details = getAdditionalUserInfo(result)

        console.log(details, result.user)
        if (details?.isNewUser) {
            try {
                await addDocument('users', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: details.providerId,
                    role: 2,
                    isActive: false
                })
            } catch (error) {
                console.log(error)
            }
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
