import BellIcon from '@heroicons/react/24/solid/BellIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
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
import { useSelector } from 'react-redux';
import AccountPopover from './account-popover';
import { authSelector } from '../../redux/reducers/authSlice';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNav() {
    const authReducer = useSelector(authSelector);

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
        (
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
                        <Tooltip title='Tìm kiếm'>
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
                        <Tooltip title='Thông tin'>
                            <IconButton>
                                <SvgIcon fontSize='small'>
                                    <QuestionMarkCircleIcon />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Thông báo'>
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
                            src={authReducer.user?.photoURL}
                            alt={authReducer.user?.displayName}
                        />
                    </Stack>
                </Stack>
                <AccountPopover
                    anchorEl={anchorEl}
                    open={openPopover}
                    onClose={handleClosePopover}
                    displayName={authReducer.user?.displayName}
                />
            </Box>
        )
    );
}

export default TopNav;
