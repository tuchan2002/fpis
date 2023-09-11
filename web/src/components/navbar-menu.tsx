'use client'

import { authSelector } from '@/redux/reducers/authSlice'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const navItems = [
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
        allowedRolesList: [0, 1, 2, 3]
    },
    { label: 'Accounts', to: '/accounts', allowedRolesList: [3] }
]
const NavbarMenu = () => {
    const router = useRouter()
    const pathname = usePathname()

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    console.log('navbar menu user role', currentUserRole)

    const logout = () => {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
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
                        <Link href='/'>FPISystem</Link>
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
                                            router.push(item.to)
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                )
                            )
                        })}
                        <Button sx={{ color: '#fff' }} onClick={logout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        )
    )
}

export default NavbarMenu
