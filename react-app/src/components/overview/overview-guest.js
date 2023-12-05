import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

function OverviewGuest() {
    return (
        <Box sx={{ px: 3, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Paper
                sx={{
                    p: 3,
                    maxWidth: 720,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3
                }}
                elevation={2}
            >
                <Typography>
                    Tài khoản của bạn chưa được kích hoạt.
                </Typography>
            </Paper>
        </Box>
    );
}

export default OverviewGuest;
