import BellIcon from '@heroicons/react/24/solid/BellIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import {
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountPopover from './account-popover';
import { authSelector } from '../../redux/reducers/authSlice';
import { web3Selector } from '../../redux/reducers/web3Slice';
import connectWallet from '../../utils/connectWallet';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNav() {
    const dispatch = useDispatch();

    const web3Reducer = useSelector(web3Selector);
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
                    justifyContent='flex-end'
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
                        <Button
                            variant='contained'
                            onClick={() => connectWallet(web3Reducer, dispatch)}
                        >
                            Connect Wallet
                        </Button>
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
