'use client'

import { Box, Button } from '@mui/material'

export default function Home() {
    const logout = () => {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
    }
    return (
        <Box>
            <Button variant='contained' onClick={logout}>
                Logout
            </Button>
        </Box>
    )
}
