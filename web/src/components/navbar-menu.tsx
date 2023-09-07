'use client'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const navItems = [
    { label: 'Products', to: '/products' },
    { label: 'Move Product', to: '/move-product' },
    { label: 'Sell Product', to: '/sell-product' },
    { label: 'Change Ownership', to: '/change-ownership' },
    { label: 'Verify Product', to: '/verify-product' }
]
const NavbarMenu = () => {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
    }

    return (
        <AppBar component='nav' position='sticky'>
            <Toolbar>
                <Typography
                    variant='h6'
                    component='div'
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <Link href='/'>FPI System</Link>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            sx={{ color: '#fff' }}
                            onClick={() => {
                                router.push(item.to)
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                    <Button sx={{ color: '#fff' }} onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavbarMenu
