'use client'

import ProductTimeline from '@/components/product-timeline'
import QRCodeScanner from '@/components/qr-code-scanner'
import useAuthEffect from '@/customHook/useAuthEffect'
import { AppDispatch } from '@/redux'
import { showAlert } from '@/redux/reducers/alertSlice'
import { authSelector } from '@/redux/reducers/authSlice'
import { getProductById, productSelector } from '@/redux/reducers/productSlice'
import { getUsersByRole, userSelector } from '@/redux/reducers/userSlice'
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    MenuItem,
    Button
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

interface Map {
    [key: string]: string | undefined
}
interface IProduct extends Map {
    productID: string
    model: string
    description: string
    manufactoryEmail: string
    retailerEmail: string
    customerEmail: string
}
const ChangeOwnership = () => {
    const dispatch = useDispatch<AppDispatch>()

    const userReducer = useSelector(userSelector)
    const productReducer = useSelector(productSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [2]
    useAuthEffect(currentUserRole, allowedRolesList)

    const [productScannerData, setProductScannerData] =
        useState<IProduct | null>(null)

    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [openModalTimeline, setOpenModalTimeline] = useState(false)

    useEffect(() => {
        dispatch(getUsersByRole({ role: 2, accessToken: authReducer.token }))
    }, [authReducer.token])

    useEffect(() => {
        if (productScannerData && productScannerData.productID) {
            dispatch(
                getProductById({
                    productID: productScannerData.productID,
                    accessToken: authReducer.token
                })
            )
        }
    }, [authReducer.token, productScannerData?.productID])

    const handleChangeOwnership = async () => {
        if (!productScannerData) {
            return
        }

        const productID = productScannerData.productID
        const selectedUser = userReducer.users.find(
            (user) => user.id === -(-selectedUserId)
        )

        try {
            dispatch(showAlert({ loading: true }))

            const response = await axios.post(
                `http://localhost:8000/api/v1/product/exchange-another-customer`,
                { productID: productID, newCustomerEmail: selectedUser?.email },
                {
                    headers: { Authorization: `Bearer ${authReducer.token}` }
                }
            )

            dispatch(showAlert({ success: response.data.message }))
        } catch (error: any) {
            dispatch(showAlert({ error: error.response.data.message }))
        }
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        sx={{
                            p: 3,
                            maxWidth: 720,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 3
                        }}
                    >
                        <QRCodeScanner setResult={setProductScannerData} />
                        <Typography variant='h5'>
                            Product Information
                        </Typography>
                        {productScannerData && (
                            <>
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label='simple table'
                                    >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    ID
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {
                                                        productReducer.product
                                                            ?.productID
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    Model
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {
                                                        productReducer.product
                                                            ?.model
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    Description
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {
                                                        productReducer.product
                                                            ?.description
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    Manufactory Email
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {
                                                        productReducer.product
                                                            ?.manufactoryEmail
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    Retailer Email
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {
                                                        productReducer.product
                                                            ?.retailerEmail
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                >
                                                    Customer Email
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {
                                                        productReducer.product
                                                            ?.customerEmail
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Button
                                    variant='text'
                                    onClick={() => setOpenModalTimeline(true)}
                                >
                                    Show Product History
                                </Button>

                                <TextField
                                    sx={{ width: '50%' }}
                                    id='userId'
                                    select
                                    label='Customer'
                                    variant='standard'
                                    value={selectedUserId}
                                    onChange={(e) =>
                                        setSelectedUserId(e.target.value)
                                    }
                                >
                                    {userReducer.users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {`${user.name} - ${user.email}`}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Button
                                    variant='contained'
                                    disabled={selectedUserId ? false : true}
                                    onClick={handleChangeOwnership}
                                >
                                    Change
                                </Button>
                            </>
                        )}
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
    )
}

export default ChangeOwnership
