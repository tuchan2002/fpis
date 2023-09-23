import {
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getUsersByRole, userSelector } from '../../redux/reducers/userSlice';
import { getProductById, productSelector, sellProductToRetailer } from '../../redux/reducers/productSlice';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import QRCodeScanner from '../../components/qr-code-scanner';
import ProductInfoTable from '../../components/product-info-table';
import ProductTimeline from '../../components/product-timeline';
import { web3Selector } from '../../redux/reducers/web3Slice';
import connectWallet from '../../utils/connectWallet';

function SellProduct() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);
    const userReducer = useSelector(userSelector);
    const productReducer = useSelector(productSelector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [1];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const [productScannerData, setProductScannerData] = useState(null);

    const [selectedUserId, setSelectedUserId] = useState('');
    const [openModalTimeline, setOpenModalTimeline] = useState(false);

    useEffect(() => {
        dispatch(getUsersByRole({ role: 2 }));
    }, [authReducer.user]);

    useEffect(() => {
        if (productScannerData && productScannerData.productID) {
            dispatch(
                getProductById({
                    productID: productScannerData.productID,
                    contract: web3Reducer.contract,
                    accountAddress: web3Reducer.account
                })
            );
        }
    }, [productScannerData?.productID]);

    const handleSellToCustomer = async () => {
        if (!productScannerData) {
            return;
        }

        if (!web3Reducer.account) {
            connectWallet(web3Reducer, dispatch);
            return;
        }

        const {productID} = productScannerData;
        const selectedUser = userReducer.users.find(
            (user) => user.uid === selectedUserId
        );

        dispatch(sellProductToRetailer({
            data: {
                productID,
                retailerEmail: authReducer.user.email,
                customerEmail: selectedUser.email,
                saleDate: moment().format('LLL')
            },
            contract: web3Reducer.contract,
            accountAddress: web3Reducer.account
        }));
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
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
                                {
                                    !productReducer.product?.customerEmail
                                    && (
                                        <>
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
                                                    <MenuItem key={user.uid} value={user.uid}>
                                                        {`${user.displayName} - ${user.email}`}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <Button
                                                variant='contained'
                                                disabled={!selectedUserId}
                                                onClick={handleSellToCustomer}
                                            >
                                                Sell
                                            </Button>
                                        </>
                                    )
                                }
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
    );
}

export default SellProduct;