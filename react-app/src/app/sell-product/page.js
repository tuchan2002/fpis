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
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getUsersByRole, userSelector } from '../../redux/reducers/userSlice';
import { getProductById, productSelector, sellProductToCustomer } from '../../redux/reducers/productSlice';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import QRCodeScanner from '../../components/qr-code-scanner';
import ProductInfoTable from '../../components/product-info-table';
import ProductTimeline from '../../components/product-timeline';
import { web3Selector } from '../../redux/reducers/web3Slice';
import connectWallet from '../../utils/connectWallet';
import showSweetAlert from '../../utils/show-swal';

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
    const [isResetScanner, setIsResetScanner] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [openModalTimeline, setOpenModalTimeline] = useState(false);

    useEffect(() => {
        dispatch(getUsersByRole({ role: 2 }));
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

        dispatch(sellProductToCustomer({
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

    const handleContinueScan = () => {
        setProductScannerData(null);
        setIsResetScanner(!isResetScanner);
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant='h4' sx={{mb: 2}}>
                        Bán sản phẩm
                    </Typography>
                    <Paper
                        sx={{
                            px: 3,
                            pb: 3,
                            maxWidth: 720,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 3
                        }}
                    >
                        <QRCodeScanner setResult={setProductScannerData} isResetScanner={isResetScanner} />

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
                                    !productReducer.product?.customerEmail
                                    && (
                                        <>
                                            <TextField
                                                sx={{ width: '50%' }}
                                                id='userId'
                                                select
                                                label='Chọn khách hàng'
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
                                                Bán
                                            </Button>
                                        </>
                                    )
                                }
                                <Button
                                    startIcon={<NavigateNextIcon />}
                                    variant='contained'
                                    onClick={handleContinueScan}
                                    size='small'
                                    sx={{alignSelf: 'flex-end'}}
                                    color='success'
                                >
                                    Tiếp tục quét
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
    );
}

export default SellProduct;
