import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import QRCodeScanner from '../../components/qr-code-scanner';
import ProductInfoTable from '../../components/product-info-table';
import { getProductDetail } from '../../utils/web3-method/product';
import { web3Selector } from '../../redux/reducers/web3Slice';
import connectWallet from '../../utils/connectWallet';
import showSweetAlert from '../../utils/show-swal';
import { getProductById, productSelector } from '../../redux/reducers/productSlice';
import ProductTimeline from '../../components/product-timeline';

function VerifyProduct() {
    const dispatch = useDispatch();

    const productReducer = useSelector(productSelector);
    const web3Reducer = useSelector(web3Selector);
    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [2];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const [productScannerData, setProductScannerData] = useState(null);
    const [isResetScanner, setIsResetScanner] = useState(false);
    const [isRealStatus, setIsRealStatus] = useState(false);
    const [openModalTimeline, setOpenModalTimeline] = useState(false);

    useEffect(() => {
        console.log('Scan');
    }, [productScannerData]);

    const handleVerify = async () => {
        if (!productScannerData) {
            return;
        }

        if (!web3Reducer.account) {
            connectWallet(web3Reducer, dispatch);
            return;
        }

        try {
            const productInBlockchain = await getProductDetail(
                productScannerData?.productID,
                web3Reducer.contract,
                web3Reducer.accountAddress
            );

            let isReal = true;
            Object.keys(productInBlockchain).forEach((key) => {
                if (key === 'productID' || key === 'model' || key === 'manufactoryEmail') {
                    if (
                        productInBlockchain[key]
                                !== {
                                    ...productScannerData
                                }[key]
                    ) {
                        isReal = false;
                    }
                }
            });

            if (isReal) {
                await showSweetAlert('success', 'This product is genuine.');
                setIsRealStatus(true);
                dispatch(
                    getProductById({
                        productID: productScannerData?.productID,
                        contract: web3Reducer.contract,
                        accountAddress: web3Reducer.account
                    })
                );
            } else {
                await showSweetAlert('error', 'This product is fake.');
            }
        } catch (error) {
            console.log(error);
            await showSweetAlert('error', 'This product is fake.');
        }
    };

    const handleContinueScan = () => {
        setProductScannerData(null);
        setIsResetScanner(!isResetScanner);
        setIsRealStatus(false);
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h4' sx={{mb: 2}}>
                    Xác minh sản phẩm
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
                            <Typography variant='h5'>
                                {isRealStatus ? 'Thông tin sản phẩm' : 'Thông tin từ mã QR'}
                            </Typography>
                            <ProductInfoTable
                                productInfo={isRealStatus ? productReducer.product : productScannerData}
                            />
                            { !isRealStatus && (
                                <Button
                                    variant='contained'
                                    onClick={handleVerify}
                                >
                                    Xác minh
                                </Button>
                            )}
                            {isRealStatus && (
                                <Button
                                    color='info'
                                    variant='contained'
                                    onClick={() => setOpenModalTimeline(true)}
                                >
                                    Xem lịch sử sản phẩm
                                </Button>
                            )}
                            {isRealStatus && (
                                <ProductTimeline
                                    productHistory={
                                        productReducer.product?.history
                                            ? productReducer.product?.history
                                            : []
                                    }
                                    open={openModalTimeline}
                                    onClose={() => setOpenModalTimeline(false)}
                                />
                            )}
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
        )
    );
}

export default VerifyProduct;
