import React from 'react';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import ArchiveBoxIcon from '@heroicons/react/24/solid/ArchiveBoxIcon';
import { Container, Grid } from '@mui/material';
import OverviewCardItem from './overview-card-item';

function OverviewRetailer() {
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
                        title='Tổng sản phẩm đã bán'
                        icon={<TagIcon />}
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
    );
}

export default OverviewRetailer;
