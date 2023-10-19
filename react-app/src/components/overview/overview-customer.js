import React from 'react';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import BuildingOfficeIcon from '@heroicons/react/24/solid/BuildingOfficeIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import { Container, Grid, Typography } from '@mui/material';
import OverviewCardItem from './overview-card-item';

function OverviewCustomer({totalSoldProduct, totalManufactory, totalRetailer}) {
    return (
        <Container maxWidth='xl'>
            <Typography variant='h4' sx={{marginBottom: 30}}>
                Tổng quan về doanh nghiệp
            </Typography>
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
                        value={totalManufactory}
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
                        value={totalRetailer}
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
