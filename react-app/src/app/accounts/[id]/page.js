import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { authSelector } from '../../../redux/reducers/authSlice';
import useAuthEffect from '../../../customHook/useAuthEffect';
import { activateAccount, deactivateAccount, getUserById, userSelector } from '../../../redux/reducers/userSlice';
import { web3Selector } from '../../../redux/reducers/web3Slice';
import connectWallet from '../../../utils/connectWallet';

const roleOptionList = [
    {value: 0, label: 'Manufactory'},
    {value: 1, label: 'Retailer'},
    {value: 2, label: 'Customer'}
];
function AccountDetails() {
    const params = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userReducer = useSelector(userSelector);
    const web3Reducer = useSelector(web3Selector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [3];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    useEffect(() => {
        dispatch(
            getUserById({
                userId: params?.id
            })
        );
    }, [authReducer.user]);

    const [openPopup, setOpenPopup] = useState(false);

    const closePopup = () => {
        setOpenPopup(false);
    };

    const [roleOption, setRoleOption] = useState(2);

    const convertRoleToText = (role) => {
        switch (role) {
        case 0:
            return 'Manufactory';
        case 1:
            return 'Retailer';
        case 2:
            return 'Customer';
        case 3:
            return 'Admin';
        default:
            return 'Guest';
        }
    };

    const handleActivateAccount = () => {
        if (!web3Reducer.account) {
            connectWallet(web3Reducer, dispatch);
            return;
        }

        dispatch(activateAccount({ userData: userReducer.user, roleOption, contract: web3Reducer.contract, accountAddress: web3Reducer.account}));

        closePopup();
    };

    const handleDeactivateAccount = () => {
        if (!web3Reducer.account) {
            connectWallet(web3Reducer, dispatch);
            return;
        }

        dispatch(deactivateAccount({userData: userReducer.user, contract: web3Reducer.contract, accountAddress: web3Reducer.account}));
    };

    const handleShowPopupConfirm = () => {
        Swal.fire({
            text: 'Bạn có chắc chắn muốn vô hiệu hóa tài khoản này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeactivateAccount();
            }
        });
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ px: 3, py: 8, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ px: 3, maxWidth: 720, width: '100%', display: 'flex', flexDirection: 'column'}}>
                    <Button
                        variant='text'
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon />}
                        sx={{alignSelf: 'flex-start'}}
                    >
                        Back
                    </Button>
                    <Avatar alt={userReducer.user?.displayName} src={userReducer.user?.photoURL} sx={{width: 100, height: 100, alignSelf: 'center'}} />
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableBody>
                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        Email
                                    </TableCell>
                                    <TableCell align='right'>
                                        {userReducer.user?.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        Name
                                    </TableCell>
                                    <TableCell align='right'>{userReducer.user?.displayName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        Role
                                    </TableCell>
                                    <TableCell align='right'>
                                        {convertRoleToText(
                                            userReducer.user?.role
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {!userReducer.user?.isActive
                        ? (
                            <Button
                                sx={{alignSelf: 'center', marginTop: 4}}
                                variant='contained'
                                color='success'
                                onClick={() => setOpenPopup(true)}
                            >
                                Kích hoạt tài khoản
                            </Button>
                        )
                        : (
                            <Button
                                sx={{alignSelf: 'center', marginTop: 4}}
                                variant='contained'
                                color='error'
                                onClick={handleShowPopupConfirm}
                            >
                                Vô hiệu hóa tài khoản
                            </Button>
                        )}
                </Paper>

                <Dialog
                    onClose={() => setOpenPopup(false)}
                    open={openPopup}
                    fullWidth
                    scroll='body'
                >
                    <DialogTitle>
                        Kích hoạt tài khoản
                    </DialogTitle>

                    <DialogContent>
                        <TextField
                            fullWidth
                            select
                            label='Select Role'
                            variant='standard'
                            value={roleOption}
                            onChange={(e) => setRoleOption(e.target.value)}
                        >
                            {roleOptionList.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={closePopup}>Cancel</Button>
                        <Button onClick={handleActivateAccount} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        )
    );
}

export default AccountDetails;
