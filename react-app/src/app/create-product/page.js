import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { web3Selector } from '../../redux/reducers/web3Slice';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';
import { createProduct } from '../../redux/reducers/productSlice';
import { imageDb } from '../../firebase/config';
import connectWallet from '../../utils/connectWallet';

const initialFieldValidator = {
    model: '',
    description: ''
};
function CreateProduct() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);

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
        productionDate: '',
        imageURL: ''
    });

    const { model, description } = productInputData;

    const onChangeProductInputData = (e) => {
        setProductInputData({
            ...productInputData,
            [e.target.name]: e.target.value
        });
    };
    const [fieldValidator, setFieldValidator] = useState(initialFieldValidator);

    const validateField = () => {
        if (model.trim() === '' || description.trim() === '') {
            setFieldValidator({
                ...fieldValidator,
                model: model.trim() === '' ? 'Không được bỏ trống trường này' : '',
                description: description.trim() === '' ? 'Không được bỏ trống trường này' : ''
            });
            return true;
        }
        return false;
    };

    const dataURLToBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateField()) {
            return;
        }

        if (!web3Reducer.account) {
            connectWallet(web3Reducer, dispatch);
            return;
        }

        html2canvas(qrCodeRef.current).then((canvas) => {
            const qrCodeImage = canvas.toDataURL('image/png');
            const blob = dataURLToBlob(qrCodeImage);

            const imgRef = ref(imageDb, `qrcode/${productInputData.productID}`);
            uploadBytes(imgRef, blob).then((snapshot) => getDownloadURL(snapshot.ref))
                .then((downloadURL) => {
                    dispatch(
                        createProduct({
                            data: {
                                ...productInputData,
                                productionDate: moment().format('LLL'),
                                imageURL: `${downloadURL}`
                            },
                            contract: web3Reducer.contract,
                            accountAddress: web3Reducer.account
                        })
                    );
                });
        });
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
                        <Typography variant='h4'>Thêm sản phẩm</Typography>
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='model'
                            label='Model'
                            name='model'
                            value={model}
                            onChange={onChangeProductInputData}
                            error={!!fieldValidator.model}
                            helperText={fieldValidator.model}
                        />
                        <TextField
                            variant='standard'
                            required
                            fullWidth
                            id='description'
                            label='Mô tả sản phẩm'
                            name='description'
                            value={description}
                            onChange={onChangeProductInputData}
                            error={!!fieldValidator.description}
                            helperText={fieldValidator.description}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            {(model.trim() !== '' && description.trim() !== '')
                                && (
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
                                )}

                        </Box>

                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ alignSelf: 'flex-end' }}
                        >
                            Thêm
                        </Button>

                    </Box>
                </Paper>
            </Box>
        )
    );
}

export default CreateProduct;
