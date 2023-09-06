'use client'

import QRCodeScanner from '@/components/qr-code-scanner'
import { authSelector } from '@/redux/reducers/authSlice'
import { Box, Paper } from '@mui/material'
import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const VerifyProduct = () => {
    const authReducer = useSelector(authSelector)

    const [productInfo, setProductInfo] = useState<string | null>(null)

    return (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                <QRCodeScanner
                    result={productInfo}
                    setResult={setProductInfo}
                />
                <p style={{ marginTop: 20 }}>{productInfo}</p>
            </Paper>
        </Box>
    )
}

export default VerifyProduct
