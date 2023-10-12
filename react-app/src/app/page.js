import { Box } from '@mui/material';
import {useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice';
import useAuthEffect from '../customHook/useAuthEffect';
import OverviewAdmin from '../components/overview/overview-admin';
import OverviewManufactory from '../components/overview/overview-manufactory';
import OverviewRetailer from '../components/overview/overview-retailer';
import OverviewCustomer from '../components/overview/overview-customer';

function Home() {
    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0, 1, 2, 3, -1];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

    const generateHomePageByRole = (userRole) => {
        if (userRole === 0) {
            return <OverviewManufactory />;
        } if (userRole === 1) {
            return <OverviewRetailer />;
        } if (userRole === 2) {
            return <OverviewCustomer />;
        } if (userRole === 3) {
            return <OverviewAdmin />;
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
