'use client'

import { AppDispatch } from '@/redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { getProductById, productSelector } from '@/redux/reducers/productSlice'
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProductTimeline from '@/components/product-timeline'

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const dispatch = useDispatch<AppDispatch>()
    const authReducer = useSelector(authSelector)
    const productReducer = useSelector(productSelector)

    const router = useRouter()

    const [openModalTimeline, setOpenModalTimeline] = useState(false)

    useEffect(() => {
        dispatch(
            getProductById({
                productID: params?.id,
                accessToken: authReducer.token
            })
        )
    }, [authReducer.token])

    return (
        <>
            {' '}
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                    <Button
                        variant='text'
                        onClick={() => router.back()}
                        startIcon={<ArrowBackIcon />}
                    >
                        戻る
                    </Button>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableBody>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        ID
                                    </TableCell>
                                    <TableCell align='right'>
                                        {productReducer.product?.productID}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        Model
                                    </TableCell>
                                    <TableCell align='right'>
                                        {productReducer.product?.model}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        Description
                                    </TableCell>
                                    <TableCell align='right'>
                                        {productReducer.product?.description}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        Manufactory Email
                                    </TableCell>
                                    <TableCell align='right'>
                                        {
                                            productReducer.product
                                                ?.manufactoryEmail
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        Retailer Email
                                    </TableCell>
                                    <TableCell align='right'>
                                        {productReducer.product?.retailerEmail}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        Customer Email
                                    </TableCell>
                                    <TableCell align='right'>
                                        {productReducer.product?.customerEmail}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 3
                        }}
                    >
                        <Button
                            variant='text'
                            onClick={() => setOpenModalTimeline(true)}
                        >
                            Show Product History
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <ProductTimeline
                productHistory={
                    productReducer.product?.history
                        ? productReducer.product?.history
                        : []
                }
                open={openModalTimeline}
                onClose={() => setOpenModalTimeline(false)}
            />
        </>
    )
}

export default ProductDetails
