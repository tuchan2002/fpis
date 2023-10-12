import React from 'react';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import BuildingOfficeIcon from '@heroicons/react/24/solid/BuildingOfficeIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import { Container, Grid } from '@mui/material';
import OverviewCardItem from './overview-card-item';

function OverviewCustomer({totalSoldProduct}) {
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
                        title='Tổng sản phẩm đã được bán'
                        icon={<TagIcon />}
                        sx={{ height: '100%' }}
                        value={totalSoldProduct}
                        iconColor='primary.main'
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default OverviewCustomer;
