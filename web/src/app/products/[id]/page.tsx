'use client'

import { AppDispatch } from '@/redux'
import { authSelector } from '@/redux/reducers/authSlice'
import { getProductById, productSelector } from '@/redux/reducers/productSlice'
import { Box, Button, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProductTimeline from '@/components/product-timeline'
import useAuthEffect from '@/customHook/useAuthEffect'
import ProductInfoTable from '@/components/product-info-table'
import { web3Selector } from '@/redux/reducers/web3Slice'

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const web3Reducer = useSelector(web3Selector)
    const productReducer = useSelector(productSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList)

    const [openModalTimeline, setOpenModalTimeline] = useState(false)

    useEffect(() => {
        dispatch(
            getProductById({
                productID: params?.id,
                contract: web3Reducer.contract,
                accountAddress: web3Reducer.account
            })
        )
    }, [web3Reducer.contract, web3Reducer.account])

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                        <Button
                            variant='text'
                            onClick={() => router.back()}
                            startIcon={<ArrowBackIcon />}
                        >
                            戻る
                        </Button>
                        {productReducer.product && (
                            <ProductInfoTable
                                productInfo={productReducer.product}
                            />
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 3
                            }}
                        >
                            <Button
                                variant='text'
                                onClick={() => setOpenModalTimeline(true)}
                            >
                                Show Product History
                            </Button>
                        </Box>
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

export default ProductDetails
