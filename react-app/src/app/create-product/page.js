import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';
import { web3Selector } from '../../redux/reducers/web3Slice';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import { createProduct } from '../../redux/reducers/productSlice';

function CreateProduct() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);
    console.log('web3Reducerweb3Reducer', web3Reducer);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const qrCodeRef = useRef(null);
    const [productInputData, setProductInputData] = useState({
        productID: uuidv4(),
        model: '',
        description: '',
        manufactoryEmail: authReducer.user ? authReducer.user.email : '',
        productionDate: ''
    });

    const [showQRcode, setShowQRcode] = useState(false);
    const { productID, model, description } = productInputData;

    const onChangeProductInputData = (e) => {
        setProductInputData({
            ...productInputData,
            [e.target.name]: e.target.value
        });
    };

    const downloadQRcode = () => {
        html2canvas(qrCodeRef.current).then((canvas) => {
            const qrCodeImage = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = qrCodeImage;
            a.download = `${productID}_${model}.png`;
            a.click();
        });
    };

    const handleSubmit = async (e) => {
        console.log('handleSubmit > web3Reducer', web3Reducer);
        e.preventDefault();

        dispatch(
            createProduct({
                data: {
                    ...productInputData,
                    productionDate: moment().format('LLL')
                },
                contract: web3Reducer.contract,
                accountAddress: web3Reducer.account
            })
        );
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Typography variant='h4'>Create Product</Typography>
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='model'
                            label='Model'
                            name='model'
                            value={model}
                            onChange={onChangeProductInputData}
                        />
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='description'
                            label='Description'
                            name='description'
                            value={description}
                            onChange={onChangeProductInputData}
                        />
                        <Button
                            variant='contained'
                            sx={{ alignSelf: 'center' }}
                            onClick={() => setShowQRcode(true)}
                            disabled={
                                !(model.trim() && description.trim())
                            }
                        >
                            Generate QR code
                        </Button>

                        {showQRcode && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <div
                                    ref={qrCodeRef}
                                    style={{
                                        width: 180,
                                        height: 180,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <QRCode
                                        value={JSON.stringify(productInputData)}
                                        size={160}
                                    />
                                </div>

                                <Button
                                    variant='contained'
                                    onClick={downloadQRcode}
                                    startIcon={<DownloadIcon />}
                                >
                                    Download
                                </Button>
                            </Box>
                        )}

                        {showQRcode && (
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{ alignSelf: 'flex-end' }}
                            >
                                Create
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Box>
        )
    );
}

export default CreateProduct;
