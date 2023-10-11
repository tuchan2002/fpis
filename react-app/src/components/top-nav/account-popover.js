import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

function AccountPopover(props) {
    const { anchorEl, onClose, open, displayName } = props;

    const handleSignOut = () => {
        onClose?.();

        try {
            signOut(auth);
            window.location.href = '/login';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 200 } }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant='overline'>
                    Tài khoản
                </Typography>
                <Typography
                    color='text.secondary'
                    variant='body2'
                >
                    {displayName}
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                <MenuItem onClick={handleSignOut}>
                    Đăng xuất
                </MenuItem>
            </MenuList>
        </Popover>
    );
}

export default AccountPopover;
