import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { web3Selector } from '../redux/reducers/web3Slice';
import { authSelector } from '../redux/reducers/authSlice';
import useAuthEffect from '../customHook/useAuthEffect';
import connectWallet from '../utils/connectWallet';

const roleNameList = ['Manufactory', 'Retailer', 'Customer', 'Admin'];
function Home() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0, 1, 2, 3, -1];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3 }}>
                <Container>
                    { currentUserRole !== -1
                        ? (
                            <Paper style={{ padding: '20px' }}>
                                <Typography variant='h4'>{`${roleNameList[currentUserRole]} Home page`}</Typography>
                                <Typography variant='h6' color='textSecondary'>
                                    {`Welcome to ${roleNameList[currentUserRole]} page`}
                                </Typography>
                                <Button
                                    sx={{ mt: 2 }}
                                    variant='contained'
                                    onClick={() => connectWallet(web3Reducer, dispatch)}
                                >
                                    Connect MetaMask
                                </Button>
                            </Paper>
                        ) : (
                            <Paper style={{ padding: '20px' }}>
                                <Typography variant='h4'>Hello World !</Typography>
                            </Paper>
                        )}
                </Container>
            </Box>
        )
    );
}
export default Home;
