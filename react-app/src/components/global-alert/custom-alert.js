import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';

function CustomAlert({
    message,
    success
}) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                severity={success ? 'success' : 'error'}
                sx={{ minWidth: '375px' }}
            >
                <AlertTitle>{success ? 'Success' : 'Error'}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomAlert;
