import {Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Typography} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSelector } from '../../redux/reducers/authSlice';
import { getAllOfUsers, userSelector } from '../../redux/reducers/userSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import convertRoleToText from '../../utils/convertRoleToText';

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

    const generateUserListFilter = (users = [], optionFilter = 'total') => {
        if (optionFilter === 'manufactory') {
            return users.filter((user) => user?.role === 0);
        } if (optionFilter === 'retailer') {
            return users.filter((user) => user?.role === 1);
        } if (optionFilter === 'customer') {
            return users.filter((user) => user?.role === 2);
        }
        return users;
    };

    const [option, setOption] = useState('total');
    const handleChangeOption = (
        event,
        newOption,
    ) => {
        if (newOption !== null) {
            setOption(newOption);
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

                <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={4}
                >
                    <Typography variant='h4'>
                        Quản lý tài khoản
                    </Typography>
                    <Box sx={{display: 'flex', gap: 4, alignItems: 'center'}}>

                        <ToggleButtonGroup
                            color='secondary'
                            value={option}
                            exclusive
                            onChange={handleChangeOption}
                            size='small'
                        >
                            <ToggleButton value='total'>
                                {` Tất cả (${generateUserListFilter(userReducer.users, 'total').length}) `}
                            </ToggleButton>
                            {currentUserRole !== 1 && (
                                <ToggleButton value='manufactory'>
                                    {` Nhà máy (${generateUserListFilter(userReducer.users, 'manufactory').length}) `}
                                </ToggleButton>
                            )}
                            <ToggleButton value='retailer'>
                                {` Đại lý (${generateUserListFilter(userReducer.users, 'retailer').length}) `}
                            </ToggleButton>
                            <ToggleButton value='customer'>
                                {` Khách hàng (${generateUserListFilter(userReducer.users, 'customer').length}) `}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Stack>

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
                            { generateUserListFilter(userReducer.users, option).length > 0 ? generateUserListFilter(userReducer.users, option).map((user, index) => {
                                if (user.role === 3) {
                                    return;
                                }

                                console.log('user', user);
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
                            }) : (
                                <div style={{width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant='h6'>
                                        Không có người dùng nào.
                                    </Typography>
                                </div>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    );
}

export default Accounts;
