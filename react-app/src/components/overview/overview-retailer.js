import React from 'react';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import ArchiveBoxIcon from '@heroicons/react/24/solid/ArchiveBoxIcon';
import { Container, Grid } from '@mui/material';
import OverviewCardItem from './overview-card-item';

function OverviewRetailer({totalReceivedProduct, totalSoldProduct}) {
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
                        title='Tổng sản phẩm được chuyển đến'
                        icon={<ShoppingBagIcon />}
                        sx={{ height: '100%' }}
                        value={totalReceivedProduct}
                        iconColor='error.main'
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                >
                    <OverviewCardItem
                        title='Tổng sản phẩm đã bán'
                        icon={<TagIcon />}
                        sx={{ height: '100%' }}
                        value={totalSoldProduct}
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
                        value={totalReceivedProduct - totalSoldProduct}
                        iconColor='warning.main'
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default OverviewRetailer;
