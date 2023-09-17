import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux'
import { authSelector } from '../../redux/reducers/authSlice'
import useAuthEffect from '../../customHook/useAuthEffect'
import QRCodeScanner from '../../components/qr-code-scanner'
import ProductInfoTable from '../../components/product-info-table'

const VerifyProduct= () => {
    const dispatch = useDispatch()

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [2]
    useAuthEffect(currentUserRole, allowedRolesList)

    const [productScannerData, setProductScannerData] =
        useState(null)
    const [customerEmailInputData, setCustomerEmailInputData] =
        useState('')

    const handleVerify = async () => {
        if (!productScannerData) {
            return
        }

        // try {
        //     const response = await axios.post(
        //         `http://localhost:8000/api/v1/product/verify-product`,
        //         {
        //             productScannerData,
        //             customerEmail: customerEmailInputData
        //         },
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
                        Product Information from QR code
                    </Typography>
                    {productScannerData && (
                        <>
                            <ProductInfoTable
                                productInfo={productScannerData}
                            />
                            <TextField
                                sx={{ width: '50%' }}
                                label='Owned customer email'
                                variant='standard'
                                value={customerEmailInputData}
                                onChange={(e) =>
                                    setCustomerEmailInputData(e.target.value)
                                }
                            />
                            <Button
                                variant='contained'
                                disabled={
                                    customerEmailInputData.trim() ? false : true
                                }
                                onClick={handleVerify}
                            >
                                Verify
                            </Button>
                        </>
                    )}
                </Paper>
            </Box>
        )
    )
}

export default VerifyProduct
