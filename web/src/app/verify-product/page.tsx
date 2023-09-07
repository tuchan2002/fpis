'use client'

import QRCodeScanner from '@/components/qr-code-scanner'
import { authSelector } from '@/redux/reducers/authSlice'
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
const VerifyProduct = () => {
    const authReducer = useSelector(authSelector)

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
                if (key !== 'retailerEmail') {
                    if (productInfo[key] !== productScannerData[key]) {
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
                <Typography variant='h5'>Product Information</Typography>
                {productScannerData && (
                    <>
                        <TextField
                            label='Customer Email'
                            variant='standard'
                            value={customerEmailInputData}
                            onChange={(e) =>
                                setCustomerEmailInputData(e.target.value)
                            }
                        />
                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <ListItem>
                                <ListItemText
                                    primary='ID'
                                    secondary={productScannerData.productID}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Model'
                                    secondary={productScannerData.model}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Description'
                                    secondary={productScannerData.description}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Manufactory Email'
                                    secondary={
                                        productScannerData.manufactoryEmail
                                    }
                                />
                            </ListItem>
                        </List>

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
}

export default VerifyProduct
