'use client'

import {
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux'
import { userSelector } from '../../redux/reducers/userSlice'
import { productSelector } from '../../redux/reducers/productSlice'
import { authSelector } from '../../redux/reducers/authSlice'
import useAuthEffect from '../../customHook/useAuthEffect'
import QRCodeScanner from '../../components/qr-code-scanner'
import ProductInfoTable from '../../components/product-info-table'
import ProductTimeline from '../../components/product-timeline'

const ChangeOwnership = () => {
    const dispatch = useDispatch()

    const userReducer = useSelector(userSelector)
    const productReducer = useSelector(productSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [2]
    useAuthEffect(currentUserRole, allowedRolesList)

    const [productScannerData, setProductScannerData] =
        useState(null)

    const [selectedUserId, setSelectedUserId] = useState('')
    const [openModalTimeline, setOpenModalTimeline] = useState(false)

    // useEffect(() => {
    //     dispatch(getUsersByRole({ role: 2, accessToken: authReducer.token }))
    // }, [authReducer.token])

    // useEffect(() => {
    //     if (productScannerData && productScannerData.productID) {
    //         dispatch(
    //             getProductById({
    //                 productID: productScannerData.productID,
    //                 accessToken: authReducer.token
    //             })
    //         )
    //     }
    // }, [authReducer.token, productScannerData?.productID])

    const handleChangeOwnership = async () => {
        if (!productScannerData) {
            return
        }

        const productID = productScannerData.productID
        const selectedUser = userReducer.users.find(
            (user) => user.uid === selectedUserId
        )

        // try {
        //     dispatch(showAlert({ loading: true }))

        //     const response = await axios.post(
        //         `http://localhost:8000/api/v1/product/exchange-another-customer`,
        //         { productID: productID, newCustomerEmail: selectedUser?.email },
        //         {
        //             headers: { Authorization: `Bearer ${authReducer.token}` }
        //         }
        //     )

        //     dispatch(showAlert({ success: response.data.message }))

        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // } catch (error: any) {
        //     dispatch(showAlert({ error: error.response.data.message }))
        // }
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
                                {productReducer.product && (
                                    <ProductInfoTable
                                        productInfo={productReducer.product}
                                    />
                                )}

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
                                        <MenuItem key={user.uid} value={user.uid}>
                                            {`${user.displayName} - ${user.email}`}
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
