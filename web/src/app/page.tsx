'use client'

import useAuthEffect from '@/customHook/useAuthEffect'
import { authSelector } from '@/redux/reducers/authSlice'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const roleNameList = ['Manufactory', 'Retailer', 'Customer', 'Admin']
export default function Home() {
    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList)

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3 }}>
                <Container>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant='h4'>{`${roleNameList[currentUserRole]} Home Page`}</Typography>
                        <Typography variant='h6' color='textSecondary'>
                            {`Welcome to ${roleNameList[currentUserRole]} Page`}
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        )
    )
}
