import { auth } from '../firebase/config'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/reducers/authSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'

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
]
const NavbarMenu = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const pathname = location.pathname;
    

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role

    const logout = () => {
        try {
            signOut(auth)
            window.location.href = '/login'
        } catch (err) {
            console.log(err)
        }
    }

    return (
        pathname !== '/login' && (
            <AppBar component='nav' position='sticky'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            fontStyle: 'italic'
                        }}
                    >
                        <Link to='/'>FPISystem</Link>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {navItems.map((item, index) => {
                            return (
                                currentUserRole !== null &&
                                item.allowedRolesList.includes(
                                    currentUserRole
                                ) && (
                                    <Button
                                        key={index}
                                        sx={{ color: '#fff' }}
                                        onClick={() => {
                                            navigate(item.to)
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                )
                            )
                        })}
                        {currentUserRole !== null && (
                            <Button sx={{ color: '#fff' }} onClick={logout}>
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        )
    )
}

export default NavbarMenu
