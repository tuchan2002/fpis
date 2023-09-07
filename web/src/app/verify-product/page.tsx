'use client'

import QRCodeScanner from '@/components/qr-code-scanner'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@mui/material'
import React, { useState } from 'react'

interface IProduct {
    productID: string
    model: string
    description: string
    manufactoryEmail: string
    retailerEmail: string
    customerEmail: string
}
const VerifyProduct = () => {
    const [productScannerData, setProductScannerData] =
        useState<IProduct | null>(null)

    console.log('productScannerData', productScannerData)

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
                                secondary={productScannerData.manufactoryEmail}
                            />
                        </ListItem>
                    </List>
                )}
            </Paper>
        </Box>
    )
}

export default VerifyProduct
