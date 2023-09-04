'use client'

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton } from '@mui/material'
import React from 'react'

const rows = [
    {
        id: 1,
        model: 'Sneaker 1',
        description: 'This is Sneaker 1',
        manufactoryEmail: 'trananhtu@gmail.com'
    },
    {
        id: 2,
        model: 'Sneaker 2',
        description: 'This is Sneaker 2',
        manufactoryEmail: 'trananhtu@gmail.com'
    },
    {
        id: 3,
        model: 'Sneaker 3',
        description: 'This is Sneaker 3',
        manufactoryEmail: 'trananhtu@gmail.com'
    }
]
const ProductsPage = () => {
    const router = useRouter()

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: 'flex-end'
            }}
        >
            <Button
                variant='contained'
                onClick={() => router.push('/create-product')}
            >
                Create Product
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align='left'>Model</TableCell>
                            <TableCell align='left'>Description</TableCell>
                            <TableCell align='left'>
                                Manufactory Email
                            </TableCell>
                            <TableCell align='left'>Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component='th' scope='row'>
                                    {row.id}
                                </TableCell>
                                <TableCell align='left'>{row.model}</TableCell>
                                <TableCell align='left'>
                                    {row.description}
                                </TableCell>
                                <TableCell align='left'>
                                    {row.manufactoryEmail}
                                </TableCell>
                                <TableCell align='left'>
                                    <Link href={`/products/${row.id}`}>
                                        <IconButton>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ProductsPage
