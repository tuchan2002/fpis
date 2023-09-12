'use client'

import { AppDispatch } from '@/redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getUserById, userSelector } from '@/redux/reducers/userSlice'
import useAuthEffect from '@/customHook/useAuthEffect'

const AccountDetails = ({ params }: { params: { id: string } }) => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const userReducer = useSelector(userSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [3]
    useAuthEffect(currentUserRole, allowedRolesList)

    useEffect(() => {
        dispatch(
            getUserById({
                userId: params?.id,
                accessToken: authReducer.token
            })
        )
    }, [authReducer.token])

    const convertRoleToText = (role: number) => {
        switch (role) {
            case 0:
                return 'Manufactory'
            case 1:
                return 'Retailer'
            case 2:
                return 'Customer'
            default:
                return 'Manufactory'
        }
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                    <Button
                        variant='text'
                        onClick={() => router.back()}
                        startIcon={<ArrowBackIcon />}
                    >
                        戻る
                    </Button>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <ListItem>
                            <ListItemText
                                primary='Email'
                                secondary={userReducer.user?.email}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Name'
                                secondary={userReducer.user?.name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Location'
                                secondary={userReducer.user?.location}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Phone Number'
                                secondary={userReducer.user?.phone_number}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Role'
                                secondary={convertRoleToText(
                                    userReducer.user?.role
                                        ? userReducer.user?.role
                                        : 3
                                )}
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        )
    )
}

export default AccountDetails
