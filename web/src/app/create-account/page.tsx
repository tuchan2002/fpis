'use client'

import { authSelector, register } from '@/redux/reducers/authSlice'
import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux'
import useAuthEffect from '@/customHook/useAuthEffect'

const roleData = [
    { roleValue: 0, text: 'Manufactory' },
    { roleValue: 1, text: 'Retailer' },
    { roleValue: 2, text: 'Customer' }
]
const CreateProduct = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [3]
    useAuthEffect(currentUserRole, allowedRolesList)

    const [userDataInput, setUserInputData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        location: '',
        role: 2
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, email, password, phone_number, location, role } =
        userDataInput

    const onChangeUserDataInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInputData({
            ...userDataInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            register({
                userData: userDataInput,
                accessToken: authReducer.token
            })
        )

        // reset data
        router.push('/accounts')
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Typography variant='h4'>Create Account</Typography>
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            name='name'
                            value={name}
                            onChange={onChangeUserDataInput}
                        />
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='email'
                            label='Email'
                            name='email'
                            value={email}
                            onChange={onChangeUserDataInput}
                        />
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            type='password'
                            id='password'
                            label='Password'
                            name='password'
                            value={password}
                            onChange={onChangeUserDataInput}
                        />
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='phone_number'
                            label='Phone Number'
                            name='phone_number'
                            value={phone_number}
                            onChange={onChangeUserDataInput}
                        />
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='location'
                            label='Location'
                            name='location'
                            value={location}
                            onChange={onChangeUserDataInput}
                        />

                        <TextField
                            id='role'
                            select
                            label='Role'
                            fullWidth
                            variant='standard'
                            name='role'
                            value={role}
                            onChange={onChangeUserDataInput}
                        >
                            {roleData.map((option) => (
                                <MenuItem
                                    key={option.roleValue}
                                    value={option.roleValue}
                                >
                                    {option.text}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ alignSelf: 'flex-end' }}
                            disabled={
                                email.trim() && password.trim() ? false : true
                            }
                        >
                            Create
                        </Button>
                    </Box>
                </Paper>
            </Box>
        )
    )
}

export default CreateProduct
