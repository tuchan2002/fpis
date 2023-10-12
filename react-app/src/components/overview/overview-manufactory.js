import React from 'react';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import ArchiveBoxIcon from '@heroicons/react/24/solid/ArchiveBoxIcon';
import { Container, Grid } from '@mui/material';
import OverviewCardItem from './overview-card-item';

function OverviewManufactory() {
    return (
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
                        title='Tổng sản phẩm đã sản xuất'
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
                        title='Tổng sản phẩm đã chuyển đi'
                        icon={<TruckIcon />}
                        sx={{ height: '100%' }}
                        value='24'
                        iconColor='success.main'
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                >
                    <OverviewCardItem
                        title='Tổng sản phẩm còn lại'
                        icon={<ArchiveBoxIcon />}
                        sx={{ height: '100%' }}
                        value='12'
                        iconColor='warning.main'
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default OverviewManufactory;
