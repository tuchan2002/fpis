import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux'
import { web3Selector } from '../redux/reducers/web3Slice'
import { authSelector } from '../redux/reducers/authSlice'
import useAuthEffect from '../customHook/useAuthEffect'
import { showAlert } from '../redux/reducers/alertSlice'

const roleNameList = ['Manufactory', 'Retailer', 'Customer', 'Admin']
const Home = () =>{
    const dispatch = useDispatch()

    const web3Reducer = useSelector(web3Selector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive)

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
export default Home