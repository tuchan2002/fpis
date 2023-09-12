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
import {
    getAllOfProducts,
    getOwnedProducts,
    getProductsByCustomer,
    productSelector
} from '@/redux/reducers/productSlice'
import { authSelector } from '@/redux/reducers/authSlice'
import useAuthEffect from '@/customHook/useAuthEffect'

const ProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const productReducer = useSelector(productSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList)

    console.log('products currentUserRole', currentUserRole)

    useEffect(() => {
        if (currentUserRole === 0 || currentUserRole === 1) {
            dispatch(getOwnedProducts({ accessToken: authReducer.token }))
        } else if (currentUserRole === 2) {
            dispatch(
                getProductsByCustomer({
                    customerId: '' + authReducer.user?.id,
                    accessToken: authReducer.token
                })
            )
        } else if (currentUserRole === 3) {
            dispatch(getAllOfProducts({ accessToken: authReducer.token }))
        }
    }, [authReducer.token, currentUserRole])

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
                <Button
                    variant='contained'
                    onClick={() => router.push('/create-product')}
                >
                    Create Product
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align='left'>Model</TableCell>
                                <TableCell align='left'>Description</TableCell>
                                <TableCell align='left'>
                                    Manufactory Email
                                </TableCell>
                                <TableCell align='left'>Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productReducer.products.map((product) => (
                                <TableRow
                                    key={product.productID}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {product.productID}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {product.model}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {product.description}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {product.manufactoryEmail}
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Link
                                            href={`/products/${product.productID}`}
                                        >
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
    )
}

export default ProductsPage
