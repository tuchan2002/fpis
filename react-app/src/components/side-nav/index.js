import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import { Link, useLocation } from 'react-router-dom';
import items from './config';
import SideNavItem from './side-nav-item';
import { authSelector } from '../../redux/reducers/authSlice';
import LogoIcon from '../logo-icon';

function SideNav() {
    const {pathname} = useLocation();

    const authReducer = useSelector(authSelector);
    const currentUserRole = authReducer.user && authReducer.user?.role;

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box sx={{ p: 3 }}>
                <Box
                    component={Link}
                    href='/'
                    sx={{
                        display: 'inline-flex',
                        height: 32,
                        width: 32
                    }}
                >
                    <LogoIcon />
                </Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        p: '12px'
                    }}
                >
                    <div>
                        <Typography
                            color='inherit'
                            variant='subtitle1'
                        >
                            FPISystem
                        </Typography>
                        <Typography
                            color='neutral.400'
                            variant='body2'
                        >
                            Production
                        </Typography>
                    </div>
                    <SvgIcon
                        fontSize='small'
                        sx={{ color: 'neutral.500' }}
                    >
                        <ChevronUpDownIcon />
                    </SvgIcon>
                </Box>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box
                component='nav'
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3
                }}
            >
                <Stack
                    component='ul'
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0
                    }}
                >
                    {items.map((item) => {
                        const active = item.path ? (pathname === item.path) : false;

                        if (authReducer.user?.isActive && currentUserRole !== null
                            && item.allowedRolesList.includes(
                                currentUserRole
                            )) {
                            if (currentUserRole === 2 && item.path === '/products') {
                                return (
                                    <SideNavItem
                                        active={active}
                                        disabled={item.disabled}
                                        external={item.external}
                                        icon={item.icon}
                                        key={item.title}
                                        path={item.path}
                                        title='Sản phẩm đang sở hữu'
                                    />
                                );
                            }

                            return (
                                <SideNavItem
                                    active={active}
                                    disabled={item.disabled}
                                    external={item.external}
                                    icon={item.icon}
                                    key={item.title}
                                    path={item.path}
                                    title={item.title}
                                />
                            );
                        }
                        return null;
                    })}
                </Stack>
            </Box>
        </Box>
    );

    return (
        (
            <Drawer
                anchor='left'
                onClose={() => {}}
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: 280
                    }
                }}
                sx={{ zIndex: 110 }}
                variant='permanent'
            >
                {content}
            </Drawer>
        )
    );
}

export default SideNav;
