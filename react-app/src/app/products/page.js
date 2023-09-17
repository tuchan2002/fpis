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
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux'
import { Link, useNavigate } from 'react-router-dom'
import { web3Selector } from '../../redux/reducers/web3Slice'
import { getAllOfProducts, productSelector } from '../../redux/reducers/productSlice'
import { authSelector } from '../../redux/reducers/authSlice'
import useAuthEffect from '../../customHook/useAuthEffect'

const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const web3Reducer = useSelector(web3Selector)
    const productReducer = useSelector(productSelector)

    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [0, 1, 2, 3]
    useAuthEffect(currentUserRole, allowedRolesList)

    useEffect(() => {
        // if (currentUserRole === 0 || currentUserRole === 1) {
        //     dispatch(getOwnedProducts({ accessToken: authReducer.token }))
        // } else if (currentUserRole === 2) {
        //     dispatch(
        //         getProductsByCustomer({
        //             customerId: '' + authReducer.user?.id,
        //             accessToken: authReducer.token
        //         })
        //     )
        // } else if (currentUserRole === 3) {
        //     dispatch(getAllOfProducts({ accessToken: authReducer.token }))
        // }
        dispatch(
            getAllOfProducts({
                contract: web3Reducer.contract,
                accountAddress: web3Reducer.account
            })
        )
    }, [web3Reducer.contract, web3Reducer.account])

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    alignItems: 'flex-end'
                }}
            >
                {currentUserRole === 0 && (
                    <Button
                        variant='contained'
                        onClick={() => navigate('/create-product')}
                    >
                        Create Product
                    </Button>
                )}
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
                            {productReducer.products?.map((product) => (
                                <TableRow
                                    key={product.productID}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {product.productID}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {product.model}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {product.description}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {product.manufactoryEmail}
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Link
                                            to={`/products/${product.productID}`}
                                        >
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
    )
}

export default Products
