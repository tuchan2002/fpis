'use client'

import {
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux'
import { getUsersByRole, userSelector } from '../../redux/reducers/userSlice'
import { changeCustomerOfProduct, getProductById, productSelector } from '../../redux/reducers/productSlice'
import { authSelector } from '../../redux/reducers/authSlice'
import useAuthEffect from '../../customHook/useAuthEffect'
import QRCodeScanner from '../../components/qr-code-scanner'
import ProductInfoTable from '../../components/product-info-table'
import ProductTimeline from '../../components/product-timeline'
import { web3Selector } from '../../redux/reducers/web3Slice'
import moment from 'moment'

const ChangeOwnership = () => {
    const dispatch = useDispatch()

    const userReducer = useSelector(userSelector)
    const productReducer = useSelector(productSelector)
    const web3Reducer = useSelector(web3Selector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [2]
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive)

    const [productScannerData, setProductScannerData] =
        useState(null)

    const [selectedUserId, setSelectedUserId] = useState('')
    const [openModalTimeline, setOpenModalTimeline] = useState(false)

    useEffect(() => {
        dispatch(getUsersByRole({ role: 2 }))
    }, [authReducer.user])

    useEffect(() => {
        if (productScannerData && productScannerData.productID) {
            dispatch(
                getProductById({
                    productID: productScannerData.productID,
                    contract: web3Reducer.contract,
                    accountAddress: web3Reducer.account
                })
            )
        }
    }, [productScannerData?.productID])

    const handleChangeOwnership = async () => {
        if (!productScannerData) {
            return
        }

        const productID = productScannerData.productID
        const selectedUser = userReducer.users.find(
            (user) => user.uid === selectedUserId
        )

        dispatch(changeCustomerOfProduct({
            data: {
                productID,
                oldCustomerEmail: authReducer.user.email,
                newCustomerEmail: selectedUser.email,
                changeDate: moment().format('LLL')
            },
            contract: web3Reducer.contract,
            accountAddress: web3Reducer.account
        }))
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <>
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
                            Product Information
                        </Typography>
                        {productScannerData && (
                            <>
                                {productReducer.product && (
                                    <ProductInfoTable
                                        productInfo={productReducer.product}
                                    />
                                )}

                                <Button
                                    variant='text'
                                    onClick={() => setOpenModalTimeline(true)}
                                >
                                    Show Product History
                                </Button>

                                <TextField
                                    sx={{ width: '50%' }}
                                    id='userId'
                                    select
                                    label='Customer'
                                    variant='standard'
                                    value={selectedUserId}
                                    onChange={(e) =>
                                        setSelectedUserId(e.target.value)
                                    }
                                >
                                    {userReducer.users.map((user) => (
                                        <MenuItem key={user.uid} value={user.uid}>
                                            {`${user.displayName} - ${user.email}`}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Button
                                    variant='contained'
                                    disabled={selectedUserId ? false : true}
                                    onClick={handleChangeOwnership}
                                >
                                    Change
                                </Button>
                            </>
                        )}
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

export default ChangeOwnership
