import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material'

const ProductInfoTable = ({ productInfo }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableBody>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            ID
                        </TableCell>
                        <TableCell align='right'>
                            {productInfo.productID}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            Model
                        </TableCell>
                        <TableCell align='right'>{productInfo.model}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            Description
                        </TableCell>
                        <TableCell align='right'>
                            {productInfo.description}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            Manufactory Email
                        </TableCell>
                        <TableCell align='right'>
                            {productInfo.manufactoryEmail}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            Retailer Email
                        </TableCell>
                        <TableCell align='right'>
                            {productInfo.retailerEmail}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            Customer Email
                        </TableCell>
                        <TableCell align='right'>
                            {productInfo.customerEmail}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductInfoTable
