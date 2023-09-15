'use client'

import useAuthEffect from '@/customHook/useAuthEffect'
import { AppDispatch } from '@/redux'
import { showAlert } from '@/redux/reducers/alertSlice'
import { authSelector } from '@/redux/reducers/authSlice'
import { web3Selector } from '@/redux/reducers/web3Slice'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const roleNameList = ['Manufactory', 'Retailer', 'Customer', 'Admin']
export default function Home() {
    const dispatch = useDispatch<AppDispatch>()

    const web3Reducer = useSelector(web3Selector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList)

    const connectWallet = async () => {
        if (web3Reducer.provider) {
            try {
                await web3Reducer.provider.request({
                    method: 'eth_requestAccounts'
                })
                dispatch(
                    showAlert({
                        success: 'Successfully connected to metamask wallet.'
                    })
                )
            } catch (error) {
                dispatch(
                    showAlert({ error: 'Connection failed to metamask wallet' })
                )
            }
        }
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3 }}>
                <Container>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant='h4'>{`${roleNameList[currentUserRole]} Home page`}</Typography>
                        <Typography variant='h6' color='textSecondary'>
                            {`Welcome to ${roleNameList[currentUserRole]} page`}
                        </Typography>
                        <Button
                            sx={{ mt: 2 }}
                            variant='contained'
                            onClick={connectWallet}
                        >
                            Connect Wallet
                        </Button>
                    </Paper>
                </Container>
            </Box>
        )
    )
}
