import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import QRCodeScanner from '../../components/qr-code-scanner';
import ProductInfoTable from '../../components/product-info-table';
import { getProductDetail } from '../../utils/web3-method/product';
import { web3Selector } from '../../redux/reducers/web3Slice';
import { showAlert } from '../../redux/reducers/alertSlice';

function VerifyProduct() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);
    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [2];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const [productScannerData, setProductScannerData] = useState(null);
    const [customerEmailInputData, setCustomerEmailInputData] = useState('');

    const handleVerify = async () => {
        if (!productScannerData) {
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
                if (key !== 'retailerEmail' && key !== 'history') {
                    if (
                        productInBlockchain[key]
                                !== {
                                    ...productScannerData,
                                    customerEmail: customerEmailInputData
                                }[key]
                    ) {
                        isReal = false;
                    }
                }
            });

            await Swal.fire({
                icon: `${isReal ? 'success' : 'error'}`,
                text: `${
                    isReal
                        ? 'This product is genuine.'
                        : 'This product is fake.'
                }`
            });
        } catch (error) {
            console.log(error);
            dispatch(
                showAlert({
                    error: 'Failed retrieved product information.'
                })
            );
        }
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
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
                        Product Information from QR code
                    </Typography>
                    {productScannerData && (
                        <>
                            <ProductInfoTable
                                productInfo={productScannerData}
                            />
                            <TextField
                                sx={{ width: '50%' }}
                                label='Owned customer email'
                                variant='standard'
                                value={customerEmailInputData}
                                onChange={(e) => setCustomerEmailInputData(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                disabled={
                                    !customerEmailInputData.trim()
                                }
                                onClick={handleVerify}
                            >
                                Verify
                            </Button>
                        </>
                    )}
                </Paper>
            </Box>
        )
    );
}

export default VerifyProduct;
