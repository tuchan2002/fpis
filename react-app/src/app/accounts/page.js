import {Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSelector } from '../../redux/reducers/authSlice';
import { getAllOfUsers, userSelector } from '../../redux/reducers/userSlice';
import useAuthEffect from '../../customHook/useAuthEffect';

function Accounts() {
    const dispatch = useDispatch();

    const userReducer = useSelector(userSelector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [3];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    useEffect(() => {
        dispatch(getAllOfUsers());
    }, []);

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

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box
                sx={{
                    px: 3,
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <Typography variant='h4'>
                    Quản lý tài khoản
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell align='left'>Email</TableCell>
                                <TableCell align='left'>Name</TableCell>
                                <TableCell align='left'>Role</TableCell>
                                <TableCell align='left'>Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { userReducer.users.map((user, index) => {
                                if (user.role === 3) {
                                    return;
                                }

                                return (
                                    <TableRow key={user.uid}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component='th' scope='row'>
                                            {user.email}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {user.displayName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {convertRoleToText(user.role)}
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Link to={`/accounts/${user.uid}`}>
                                                <Button
                                                    variant='contained'
                                                    color='info'
                                                    size='small'
                                                >
                                                    <VisibilityIcon />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    );
}

export default Accounts;
