import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { web3Selector } from '../../../redux/reducers/web3Slice';
import { getProductById, productSelector } from '../../../redux/reducers/productSlice';
import { authSelector } from '../../../redux/reducers/authSlice';
import useAuthEffect from '../../../customHook/useAuthEffect';
import ProductInfoTable from '../../../components/product-info-table';
import ProductTimeline from '../../../components/product-timeline';

function ProductDetails() {
    const params = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const web3Reducer = useSelector(web3Selector);
    const productReducer = useSelector(productSelector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0, 1, 2, 3];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const qrCodeRef = useRef(null);
    const [openModalTimeline, setOpenModalTimeline] = useState(false);

    useEffect(() => {
        console.log('test', params.id, web3Reducer.contract, web3Reducer.account);
        if (web3Reducer.account) {
            dispatch(
                getProductById({
                    productID: params.id ? params.id : '',
                    contract: web3Reducer.contract,
                    accountAddress: web3Reducer.account
                })
            );
        }
    }, [web3Reducer.contract, web3Reducer.account]);

    const downloadQRcode = () => {
        const qrCodeImageATag = document.getElementById('qrCodeImage');
        qrCodeImageATag.click();
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                        <Button
                            variant='text'
                            onClick={() => navigate(-1)}
                            startIcon={<ArrowBackIcon />}
                        >
                            Back
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
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 1
                        }}
                        >
                            <a style={{width: 198, height: 198}} target='_blank' id='qrCodeImage' href={productReducer.product?.imageURL} rel='noreferrer'>
                                <img ref={qrCodeRef} alt={productReducer.product} src={productReducer.product?.imageURL} />
                            </a>
                            <Button
                                variant='contained'
                                onClick={downloadQRcode}
                                startIcon={<DownloadIcon />}
                                sx={{marginTop: 1}}
                            >
                                Download
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
    );
}

export default ProductDetails;
