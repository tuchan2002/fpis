import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux'
import { Link, useNavigate } from 'react-router-dom'
import { authSelector } from '../../redux/reducers/authSlice'
import { userSelector } from '../../redux/reducers/userSlice'
import useAuthEffect from '../../customHook/useAuthEffect'

const Accounts = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userReducer = useSelector(userSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [3]
    useAuthEffect(currentUserRole, allowedRolesList)

    // useEffect(() => {
    //     dispatch(getAllOfUsers({ accessToken: authReducer.token }))
    // }, [authReducer.token])

    const convertRoleToText = (role) => {
        switch (role) {
            case 0:
                return 'Manufactory'
            case 1:
                return 'Retailer'
            case 2:
                return 'Customer'
            default:
                return 'Admin'
        }
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    alignItems: 'flex-end'
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell align='left'>Name</TableCell>
                                <TableCell align='left'>Location</TableCell>
                                <TableCell align='left'>Phone Number</TableCell>
                                <TableCell align='left'>Role</TableCell>
                                <TableCell align='left'>Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userReducer.users.map((user) => {
                                if (user.role === 3) {
                                    return
                                }

                                return (
                                    <TableRow key={user.uid}>
                                        <TableCell component='th' scope='row'>
                                            {user.email}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {user.displayName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {user.email}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {convertRoleToText(user.role)}
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Link to={`/accounts/${user.uid}`}>
                                                <IconButton>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    )
}

export default Accounts
