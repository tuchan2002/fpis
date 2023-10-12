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
import { getProductById, moveProductToRetailer, productSelector } from '../../redux/reducers/productSlice';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import QRCodeScanner from '../../components/qr-code-scanner';
import ProductInfoTable from '../../components/product-info-table';
import ProductTimeline from '../../components/product-timeline';
import { web3Selector } from '../../redux/reducers/web3Slice';
import connectWallet from '../../utils/connectWallet';
import showSweetAlert from '../../utils/show-swal';

function MoveProduct() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);
    const userReducer = useSelector(userSelector);
    const productReducer = useSelector(productSelector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const [productScannerData, setProductScannerData] = useState(null);

    const [selectedUserId, setSelectedUserId] = useState('');
    const [openModalTimeline, setOpenModalTimeline] = useState(false);

    useEffect(() => {
        dispatch(getUsersByRole({ role: 1 }));
    }, [authReducer.user]);

    useEffect(() => {
        const showSweetAlertInvalidQRCode = async () => {
            if (productScannerData && !productScannerData.productID && !productScannerData.model && !productScannerData.manufactoryEmail) {
                await showSweetAlert('error', 'Invalid QR code.');
                window.location.reload();
            }
        };

        if (productScannerData && productScannerData.productID) {
            dispatch(
                getProductById({
                    productID: productScannerData.productID,
                    contract: web3Reducer.contract,
                    accountAddress: web3Reducer.account
                })
            );
        }

        showSweetAlertInvalidQRCode();
    }, [productScannerData, productScannerData?.productID]);

    const handleMoveToRetailer = async () => {
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

        dispatch(moveProductToRetailer({
            data: {
                productID,
                retailerEmail: selectedUser.email,
                movingDate: moment().format('LLL')
            },
            contract: web3Reducer.contract,
            accountAddress: web3Reducer.account
        }));
    };

    console.log(productReducer.product);
    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <>
                <Box sx={{ px: 3, py: 8, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant='h4'>
                        Di chuyển sản phẩm
                    </Typography>
                    <Paper
                        sx={{
                            px: 3,
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
                        {productScannerData && (
                            <>
                                {productReducer.product && (
                                    <>
                                        <Typography variant='h5'>
                                            Thông tin sản phẩm
                                        </Typography>
                                        <ProductInfoTable
                                            productInfo={{...productReducer.product, description: productScannerData.description}}
                                        />
                                        <Button
                                            color='info'
                                            variant='contained'
                                            onClick={() => setOpenModalTimeline(true)}
                                        >
                                            Xem lịch sử sản phẩm
                                        </Button>
                                    </>
                                )}

                                {
                                    !productReducer.product?.retailerEmail
                                    && (
                                        <>
                                            <TextField
                                                sx={{ width: '50%' }}
                                                id='userId'
                                                select
                                                label='Chọn đại lý bán lẻ'
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
                                                onClick={handleMoveToRetailer}
                                            >
                                                Di chuyển
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

export default MoveProduct;
