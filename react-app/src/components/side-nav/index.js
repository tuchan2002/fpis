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
                    <svg
                        fill='none'
                        height='100%'
                        viewBox='0 0 24 24'
                        width='100%'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            opacity={0.16}
                            d='M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z'
                            fill='#3f50b5'
                        />
                        <path
                            d='M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z'
                            fill='#3f50b5'
                        />
                    </svg>
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
                            color='#9DA4AE'
                            variant='body2'
                        >
                            Production
                        </Typography>
                    </div>
                    <SvgIcon
                        fontSize='small'
                        sx={{ color: '#6C737F' }}
                    >
                        <ChevronUpDownIcon />
                    </SvgIcon>
                </Box>
            </Box>
            <Divider sx={{ borderColor: '#2F3746' }} />
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
                onClose={() => console.log('close')}
                open
                PaperProps={{
                    sx: {
                        backgroundColor: '#1C2536',
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
