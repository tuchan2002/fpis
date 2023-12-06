import { Box } from '@mui/material';
import { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';
import useAuthEffect from '../customHook/useAuthEffect';
import OverviewAdmin from '../components/overview/overview-admin';
import OverviewManufactory from '../components/overview/overview-manufactory';
import OverviewRetailer from '../components/overview/overview-retailer';
import OverviewCustomer from '../components/overview/overview-customer';
import { getAllOfUsers, userSelector } from '../redux/reducers/userSlice';
import { web3Selector } from '../redux/reducers/web3Slice';
import { getAllOfProducts, getAllProductsByManufactory, getAllProductsByRetailer, productSelector } from '../redux/reducers/productSlice';
import OverviewGuest from '../components/overview/overview-guest';

function Home() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);
    const userReducer = useSelector(userSelector);
    const productReducer = useSelector(productSelector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0, 1, 2, 3, -1];
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
                    getAllOfProducts({
                        contract: web3Reducer.contract,
                        accountAddress: web3Reducer.account
                    })
                );
                dispatch(getAllOfUsers());
            } else if (currentUserRole === 3) {
                dispatch(
                    getAllOfProducts({
                        contract: web3Reducer.contract,
                        accountAddress: web3Reducer.account
                    })
                );
                dispatch(getAllOfUsers());
            }
        }
    }, [authReducer.user, web3Reducer.contract, web3Reducer.account]);

    const generateUserByRole = (users = [], userRole = 0) => users.filter((user) => user?.role === userRole);

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

    const generateHomePageByRole = (userRole) => {
        const totalProduct = generateProductListFilter(productReducer.products, 'total').length;
        const totalSoldProduct = generateProductListFilter(productReducer.products, 'sold').length;
        // const totalAtManufactoryProduct = generateProductListFilter(productReducer.products, 'atManufactory').length;
        const totalAtRetailerProduct = generateProductListFilter(productReducer.products, 'atRetailer').length;
        const totalManufactory = generateUserByRole(userReducer.users, 0).length;
        const totalRetailer = generateUserByRole(userReducer.users, 1).length;
        const totalCustomer = generateUserByRole(userReducer.users, 2).length;

        if (userRole === 0) {
            return <OverviewManufactory totalCreatedProduct={totalProduct} totalMovedProduct={totalAtRetailerProduct + totalSoldProduct} />;
        } if (userRole === 1) {
            return <OverviewRetailer totalReceivedProduct={totalProduct} totalSoldProduct={totalSoldProduct} />;
        } if (userRole === 2) {
            return <OverviewCustomer totalSoldProduct={totalSoldProduct} totalManufactory={totalManufactory} totalRetailer={totalRetailer} />;
        } if (userRole === 3) {
            return <OverviewAdmin totalProduct={totalProduct} totalSoldProduct={totalSoldProduct} totalManufactory={totalManufactory} totalRetailer={totalRetailer} totalCustomer={totalCustomer} />;
        } if (userRole === -1) {
            return <OverviewGuest />;
        }
    };

    return (
        currentUserRole !== null
        && allowedRolesList.includes(currentUserRole) && (
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                {generateHomePageByRole(currentUserRole)}
            </Box>
        )
    );
}
export default Home;
