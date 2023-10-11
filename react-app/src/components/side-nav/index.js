import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography
} from '@mui/material';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import { useLocation } from 'react-router-dom';
import items from './config';
import SideNavItem from './side-nav-item';

function SideNav() {
    const {pathname} = useLocation();

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
                    href='/'
                    sx={{
                        display: 'inline-flex',
                        height: 32,
                        width: 32
                    }}
                >
                    FPISystem
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
                            Devias
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
                    })}
                </Stack>
            </Box>
        </Box>
    );

    return (
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
    );
}

export default SideNav;
