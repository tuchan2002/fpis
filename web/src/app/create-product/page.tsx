'use client'

import { authSelector } from '@/redux/reducers/authSlice'
import { Box, Button, Paper, TextField } from '@mui/material'
import { notFound } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import QRCode from 'qrcode.react'
import { v4 as uuidv4 } from 'uuid'

const CreateProduct = () => {
    const auth = useSelector(authSelector)

    useEffect(() => {
        console.log(auth.user?.role)

        if (auth.user?.role !== undefined && auth.user?.role !== 0) {
            return notFound()
        }
    }, [auth.user?.role])

    const [productInputData, setProductInputData] = useState({
        productID: uuidv4(),
        model: '',
        description: ''
    })
    console.log('productInputData', productInputData)

    const [showQRcode, setShowQRcode] = useState(false)

    const { model, description } = productInputData

    const onChangeProductInputData = (e: ChangeEvent<HTMLInputElement>) => {
        setProductInputData({
            ...productInputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {}

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}
                >
                    <TextField
                        variant='standard'
                        required
                        fullWidth
                        id='model'
                        label='Model'
                        name='model'
                        value={model}
                        onChange={onChangeProductInputData}
                    />
                    <TextField
                        variant='standard'
                        required
                        fullWidth
                        id='description'
                        label='Description'
                        name='description'
                        value={description}
                        onChange={onChangeProductInputData}
                    />
                    <Button
                        variant='contained'
                        sx={{ alignSelf: 'flex-start' }}
                        onClick={() => setShowQRcode(true)}
                        disabled={model.trim() && description.trim() ? false : true}
                    >
                        Generate QR code
                    </Button>

                    {showQRcode && (
                        <QRCode value={JSON.stringify(productInputData)} />
                    )}

                    {showQRcode && (
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ alignSelf: 'flex-end' }}
                        >
                            Create
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}

export default CreateProduct
