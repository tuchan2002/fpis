'use client'

import { AppDispatch } from '@/redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getUserById, userSelector } from '@/redux/reducers/userSlice'

const AccountDetails = ({ params }: { params: { id: string } }) => {
    const dispatch = useDispatch<AppDispatch>()
    const authReducer = useSelector(authSelector)
    const userReducer = useSelector(userSelector)

    const router = useRouter()

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
}

export default AccountDetails
