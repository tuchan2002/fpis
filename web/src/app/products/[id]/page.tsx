'use client'

import { AppDispatch } from '@/redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { getProductById, productSelector } from '@/redux/reducers/productSlice'
import { Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const dispatch = useDispatch<AppDispatch>()
    const authReducer = useSelector(authSelector)
    const productReducer = useSelector(productSelector)

    const router = useRouter()

    useEffect(() => {
        dispatch(
            getProductById({
                productID: params?.id,
                accessToken: authReducer.token
            })
        )
    }, [authReducer.token])

    return (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                <Button
                    variant='text'
                    onClick={() => router.back()}
                    startIcon={<ArrowBackIcon />}
                >
                    戻る
                </Button>
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper'
                    }}
                >
                    <ListItem>
                        <ListItemText
                            primary='ID'
                            secondary={productReducer.product?.productID}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='Model'
                            secondary={productReducer.product?.model}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='Description'
                            secondary={productReducer.product?.description}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='Manufactory Email'
                            secondary={productReducer.product?.manufactoryEmail}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='Retailer Email'
                            secondary={
                                productReducer.product?.retailerEmail
                                    ? productReducer.product?.retailerEmail
                                    : 'None'
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='Customer Email'
                            secondary={
                                productReducer.product?.customerEmail
                                    ? productReducer.product?.customerEmail
                                    : 'None'
                            }
                        />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    )
}

export default ProductDetails
