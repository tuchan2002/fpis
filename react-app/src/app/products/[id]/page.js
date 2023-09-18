import { Box, Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../../../redux'
import { web3Selector } from '../../../redux/reducers/web3Slice'
import { getProductById, productSelector } from '../../../redux/reducers/productSlice'
import { authSelector } from '../../../redux/reducers/authSlice'
import useAuthEffect from '../../../customHook/useAuthEffect'
import ProductInfoTable from '../../../components/product-info-table'
import ProductTimeline from '../../../components/product-timeline'

const ProductDetails = () => {
    const params = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const web3Reducer = useSelector(web3Selector)
    const productReducer = useSelector(productSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive)

    const [openModalTimeline, setOpenModalTimeline] = useState(false)

    useEffect(() => {
        dispatch(
            getProductById({
                productID: params.id ?  params.id : "",
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
                            onClick={() => navigate(-1)}
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
