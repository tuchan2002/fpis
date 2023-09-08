'use client'

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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux'
import { getAllOfProducts } from '@/redux/reducers/productSlice'
import { authSelector } from '@/redux/reducers/authSlice'
import { getAllOfUsers, userSelector } from '@/redux/reducers/userSlice'

const ProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const authReducer = useSelector(authSelector)
    const userReducer = useSelector(userSelector)

    const router = useRouter()

    useEffect(() => {
        dispatch(getAllOfUsers({ accessToken: authReducer.token }))
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
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: 'flex-end'
            }}
        >
            <Button
                variant='contained'
                onClick={() => router.push('/create-account')}
            >
                Create Account
            </Button>
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
                        {userReducer.users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component='th' scope='row'>
                                    {user.email}
                                </TableCell>
                                <TableCell align='left'>{user.name}</TableCell>
                                <TableCell align='left'>
                                    {user.location}
                                </TableCell>
                                <TableCell align='left'>
                                    {user.phone_number}
                                </TableCell>
                                <TableCell align='left'>
                                    {convertRoleToText(user.role)}
                                </TableCell>
                                <TableCell align='left'>
                                    <Link href={`/accounts/${user.id}`}>
                                        <IconButton>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ProductsPage
