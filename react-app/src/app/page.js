import { Box, Container, Grid} from '@mui/material';
import {useSelector } from 'react-redux';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import BuildingOfficeIcon from '@heroicons/react/24/solid/BuildingOfficeIcon';
import { authSelector } from '../redux/reducers/authSlice';
import useAuthEffect from '../customHook/useAuthEffect';
import OverviewCardItem from '../components/overview/overview-card-item';

function Home() {
    // const dispatch = useDispatch();

    // const web3Reducer = useSelector(web3Selector);

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;
    const allowedRolesList = [0, 1, 2, 3, -1];
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive);

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
                <Container maxWidth='xl'>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                            lg={6}
                        >
                            <OverviewCardItem
                                title='Tổng sản phẩm'
                                icon={<ShoppingBagIcon />}
                                sx={{ height: '100%' }}
                                value='32'
                                iconColor='error.main'
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                        >
                            <OverviewCardItem
                                title='Tổng số cơ sở sản xuất'
                                icon={<BuildingOfficeIcon />}
                                sx={{ height: '100%' }}
                                value='3'
                                iconColor='success.main'
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                        >
                            <OverviewCardItem
                                title='Tổng số đại lý'
                                icon={<BuildingStorefrontIcon />}
                                sx={{ height: '100%' }}
                                value='5'
                                iconColor='warning.main'
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                        >
                            <OverviewCardItem
                                title='Tổng số khách hàng'
                                icon={<UsersIcon />}
                                sx={{ height: '100%' }}
                                value='6'
                                iconColor='primary.main'
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    );
}
export default Home;
