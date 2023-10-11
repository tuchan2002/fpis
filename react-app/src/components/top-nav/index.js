import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import AccountPopover from './account-popover';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);

    const handleOpenPopover = (e) => {
        setOpenPopover(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
        setAnchorEl(null);
    };

    return (
        <Box
            component='header'
            sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                position: 'sticky',
                left: {
                    lg: `${SIDE_NAV_WIDTH}px`
                },
                top: 0,
                width: {
                    lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                },
                zIndex: 10
            }}
        >
            <Stack
                alignItems='center'
                direction='row'
                justifyContent='space-between'
                spacing={2}
                sx={{
                    minHeight: TOP_NAV_HEIGHT,
                    px: 2
                }}
            >
                <Stack
                    alignItems='center'
                    direction='row'
                    spacing={2}
                >
                    <Tooltip title='Search'>
                        <IconButton>
                            <SvgIcon fontSize='small'>
                                <MagnifyingGlassIcon />
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack
                    alignItems='center'
                    direction='row'
                    spacing={2}
                >
                    <Tooltip title='Contacts'>
                        <IconButton>
                            <SvgIcon fontSize='small'>
                                <UsersIcon />
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Notifications'>
                        <IconButton>
                            <Badge
                                badgeContent={4}
                                color='success'
                                variant='dot'
                            >
                                <SvgIcon fontSize='small'>
                                    <BellIcon />
                                </SvgIcon>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Avatar
                        onClick={handleOpenPopover}
                        sx={{
                            cursor: 'pointer',
                            height: 40,
                            width: 40
                        }}
                        src='https://i.pinimg.com/564x/9e/1f/5b/9e1f5becc5813855a83791d50838a6a7.jpg'
                    />
                </Stack>
            </Stack>
            <AccountPopover
                anchorEl={anchorEl}
                open={openPopover}
                onClose={handleClosePopover}
            />
        </Box>
    );
}

export default TopNav;
