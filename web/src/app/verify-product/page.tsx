'use client'

import QRCodeScanner from '@/components/qr-code-scanner'
import useAuthEffect from '@/customHook/useAuthEffect'
import { authSelector } from '@/redux/reducers/authSlice'
import { IProduct } from '@/global-types'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import ProductInfoTable from '@/components/product-info-table'

const VerifyProduct = () => {
    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [2]
    useAuthEffect(currentUserRole, allowedRolesList)

    const [productScannerData, setProductScannerData] =
        useState<IProduct | null>(null)
    const [customerEmailInputData, setCustomerEmailInputData] =
        useState<string>('')

    const handleVerify = async () => {
        if (!productScannerData) {
            return
        }

        const productID = productScannerData.productID
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/product/${productID}`,
                {
                    headers: { Authorization: `Bearer ${authReducer.token}` }
                }
            )

            const productInfo: IProduct = response.data.data.product

            let isReal = true
            Object.keys(productInfo).forEach((key) => {
                if (key !== 'retailerEmail' && key !== 'history') {
                    if (
                        productInfo[key] !==
                        {
                            ...productScannerData,
                            customerEmail: customerEmailInputData
                        }[key]
                    ) {
                        isReal = false
                        return
                    }
                }
            })

            await Swal.fire({
                icon: `${isReal ? 'success' : 'error'}`,
                text: `${
                    isReal
                        ? 'This product is genuine.'
                        : 'This product is fake.'
                }`
            })
        } catch (error) {
            console.log(error)
        }
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
