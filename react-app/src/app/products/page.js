import {Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    ToggleButtonGroup,
    ToggleButton} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { web3Selector } from '../../redux/reducers/web3Slice';
import { getAllOfProducts, getAllProductsByCustomer, getAllProductsByManufactory, getAllProductsByRetailer, productSelector } from '../../redux/reducers/productSlice';
import { authSelector } from '../../redux/reducers/authSlice';
import useAuthEffect from '../../customHook/useAuthEffect';

function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const web3Reducer = useSelector(web3Selector);
    const productReducer = useSelector(productSelector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0, 1, 2, 3];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    useEffect(() => {
        if (web3Reducer.contract && web3Reducer.account) {
            if (currentUserRole === 0) {
                dispatch(getAllProductsByManufactory({
                    manufactoryEmail: authReducer.user?.email,
                    contract: web3Reducer.contract,
                    accountAddress: web3Reducer.account
                }));
            } else if (currentUserRole === 1) {
                dispatch(getAllProductsByRetailer({
                    retailerEmail: authReducer.user?.email,
                    contract: web3Reducer.contract,
                    accountAddress: web3Reducer.account
                }));
            } else if (currentUserRole === 2) {
                dispatch(
                    getAllProductsByCustomer({
                        customerEmail: authReducer.user?.email,
                        contract: web3Reducer.contract,
                        accountAddress: web3Reducer.account
                    })
                );
            } else if (currentUserRole === 3) {
                dispatch(
                    getAllOfProducts({
                        contract: web3Reducer.contract,
                        accountAddress: web3Reducer.account
                    })
                );
            }
        }
    }, [authReducer.user, web3Reducer.contract, web3Reducer.account]);

    const [option, setOption] = useState('total');
    const handleChangeOption = (
        event,
        newOption,
    ) => {
        setOption(newOption);
    };

    const generateProductListFilter = (products = [], optionFilter = 'total') => {
        if (optionFilter === 'atManufactory') {
            return products.filter((prod) => prod?.retailerEmail.trim() === '');
        } if (optionFilter === 'atRetailer') {
            return products.filter((prod) => prod?.retailerEmail.trim() !== '' && prod?.customerEmail.trim() === '');
        } if (optionFilter === 'sold') {
            return products.filter((prod) => prod?.customerEmail.trim() !== '');
        }
        return products;
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    alignItems: 'flex-end'
                }}
            >
                <Box sx={{display: 'flex', gap: 4, alignItems: 'center'}}>
                    {[0, 1, 3].includes(currentUserRole)
                    && (
                        <ToggleButtonGroup
                            color='secondary'
                            value={option}
                            exclusive
                            onChange={handleChangeOption}
                            size='small'
                        >
                            <ToggleButton value='total'>
                                {` Total (${generateProductListFilter(productReducer.products, 'total').length}) `}
                            </ToggleButton>
                            {currentUserRole !== 2 && (
                                <ToggleButton value='atManufactory'>
                                    {` At Manufactory (${generateProductListFilter(productReducer.products, 'atManufactory').length}) `}
                                </ToggleButton>
                            )}
                            <ToggleButton value='atRetailer'>
                                {` At Retailer (${generateProductListFilter(productReducer.products, 'atRetailer').length}) `}
                            </ToggleButton>
                            <ToggleButton value='sold'>
                                {` Sold (${generateProductListFilter(productReducer.products, 'sold').length}) `}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                    {currentUserRole === 0 && (
                        <Button
                            startIcon={<AddIcon />}
                            variant='contained'
                            onClick={() => navigate('/create-product')}
                        >
                            Create Product
                        </Button>
                    )}
                </Box>
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
                            {generateProductListFilter(productReducer.products, option).map((product) => (
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
    );
}

export default Products;
