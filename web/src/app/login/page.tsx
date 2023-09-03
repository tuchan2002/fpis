'use client'

import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, login } from '@/redux/reducers/authSlice'
import { AppDispatch } from '@/redux'

const initialState = { email: '', password: '' }
const Login = () => {
    const router = useRouter()
    const auth = useSelector(authSelector)

    const dispatch = useDispatch<AppDispatch>()

    const [userInputData, setUserInputData] = useState(initialState)
    const { email, password } = userInputData

    useEffect(() => {
        if (auth.token) {
            router.push('/')
        }
    }, [auth.token, router])

    const onChangeUserInputData = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInputData({ ...userInputData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login(userInputData))
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
                Login
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    variant='standard'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    value={email}
                    onChange={onChangeUserInputData}
                />
                <TextField
                    variant='standard'
                    margin='normal'
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChangeUserInputData}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={email.trim() && password.trim() ? false : true}
                >
                    Login
                </Button>
            </Box>
        </Box>
    )
}

export default Login
