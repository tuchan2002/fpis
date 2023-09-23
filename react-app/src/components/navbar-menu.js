import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authSelector } from '../redux/reducers/authSlice';
import { auth } from '../firebase/config';

const navItems = [
    { label: 'Accounts', to: '/accounts', allowedRolesList: [3] },
    { label: 'Products', to: '/products', allowedRolesList: [0, 1, 2, 3] },
    { label: 'Move Product', to: '/move-product', allowedRolesList: [0] },
    { label: 'Sell Product', to: '/sell-product', allowedRolesList: [1] },
    {
        label: 'Change Ownership',
        to: '/change-ownership',
        allowedRolesList: [2]
    },
    {
        label: 'Verify Product',
        to: '/verify-product',
        allowedRolesList: [2]
    }
];
function NavbarMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        try {
            signOut(auth);
            window.location.href = '/login';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        pathname !== '/login' && (
            <AppBar component='nav' position='sticky' sx={{paddingY: 0.5}}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            fontStyle: 'italic',
                            fontSize: 30,
                            mr: 8
                        }}
                    >
                        <Link to='/'>FPISystem</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                        {navItems.map((item, index) => (
                            authReducer.user?.isActive && currentUserRole !== null
                                && item.allowedRolesList.includes(
                                    currentUserRole
                                ) && (
                                <Button
                                    key={index}
                                    sx={{ color: '#fff' }}
                                    onClick={() => {
                                        navigate(item.to);
                                    }}
                                    size='large'
                                >
                                    {item.label}
                                </Button>
                            )
                        ))}
                    </Box>
                    {currentUserRole !== null && (
                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>{authReducer.user?.displayName}</Typography>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={authReducer.user?.displayName} src={authReducer.user?.photoURL} />
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu} sx={{minWidth: 120}}>
                                    <Typography textAlign='center'>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={logout} sx={{minWidth: 120}}>
                                    <Typography textAlign='center'>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        )
    );
}

export default NavbarMenu;
