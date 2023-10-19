'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signInWithPopup
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { authSelector } from '../../redux/reducers/authSlice';
import LogoIcon from '../../components/logo-icon';
import { auth } from '../../firebase/config';
import { addDocument } from '../../firebase/services';

const googleProvider = new GoogleAuthProvider();
function Login() {
    const navigate = useNavigate();

    const authReducer = useSelector(authSelector);

    useEffect(() => {
        if (authReducer.user) {
            navigate('/');
        }
    }, [authReducer.user]);

    const handleLoginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const { user } = result;
            const details = getAdditionalUserInfo(result);

            console.log(details, result.user);
            if (details?.isNewUser) {
                await addDocument('users', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: details.providerId,
                    role: -1,
                    isActive: false
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            component='main'
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                height: '100vh'
            }}
        >
            <Grid
                container
                sx={{ flex: '1 1 auto' }}
            >
                <Grid
                    xs={12}
                    md={6}
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            flex: '1 1 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%',
                                marginBottom: 15
                            }}
                        >
                            <div>
                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        align='center'
                                        color='inherit'
                                        sx={{
                                            fontSize: '32px',
                                            lineHeight: '46px',
                                            mb: 1
                                        }}
                                        variant='h1'
                                    >
                                        Welcome to
                                        {' '}
                                        <Box
                                            component='a'
                                            sx={{ color: '#15B79E' }}
                                            target='_blank'
                                        >
                                            FPISystem
                                        </Box>
                                    </Typography>
                                    <Typography
                                        align='center'
                                        sx={{ mb: 3, fontSize: '18px' }}
                                        variant='subtitle1'
                                    >
                                        Hệ thống nhận dạng hàng giả áp dụng BlockChain và QR Code.
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Button
                                        startIcon={<GoogleIcon />}
                                        fullWidth
                                        size='large'
                                        variant='contained'
                                        onClick={handleLoginWithGoogle}
                                    >
                                        Đăng nhập với Google
                                    </Button>
                                </Box>
                            </div>
                        </Box>
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    md={6}
                    sx={{
                        alignItems: 'center',
                        background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        '& img': {
                            maxWidth: '100%'
                        }
                    }}
                >

                    <Box
                        component={Link}
                        href='/'
                        sx={{
                            display: 'inline-flex',
                            height: 220,
                            width: 220
                        }}
                    >
                        <LogoIcon />
                    </Box>
                </Grid>
            </Grid>
        </Box>

    );
}

export default Login;
