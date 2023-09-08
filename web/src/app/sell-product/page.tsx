'use client'

import QRCodeScanner from '@/components/qr-code-scanner'
import { AppDispatch } from '@/redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { getUsersByRole, userSelector } from '@/redux/reducers/userSlice'
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
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
const SellProduct = () => {
    const dispatch = useDispatch<AppDispatch>()

    const authReducer = useSelector(authSelector)
    const userReducer = useSelector(userSelector)

    const [productScannerData, setProductScannerData] =
        useState<IProduct | null>(null)

    const [selectedUserId, setSelectedUserId] = useState<string>('')

    useEffect(() => {
        dispatch(getUsersByRole({ role: 2, accessToken: authReducer.token }))
    }, [authReducer.token])

    const handleSellToCustomer = async () => {
        if (!productScannerData) {
            return
        }

        const productID = productScannerData.productID
        const selectedUser = userReducer.users.find(
            (user) => user.id === -(-selectedUserId)
        )

        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/product/sell-to-customer`,
                { productID: productID, customerEmail: selectedUser?.email },
                {
                    headers: { Authorization: `Bearer ${authReducer.token}` }
                }
            )

            await Swal.fire({
                icon: 'success',
                text: `${response.data.message}`
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

                        <TextField
                            sx={{ width: '50%' }}
                            id='userId'
                            select
                            label='Customer'
                            variant='standard'
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
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
                            onClick={handleSellToCustomer}
                        >
                            Sell
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    )
}

export default SellProduct
