import { Box, ButtonBase } from '@mui/material';

function SideNavItem(props) {
    const { active = false, disabled, icon, title } = props;

    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
            >
                {icon && (
                    <Box
                        component='span'
                        sx={{
                            alignItems: 'center',
                            color: '#9DA4AE',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(active && {
                                color: 'primary.main'
                            })
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component='span'
                    sx={{
                        color: '#9DA4AE',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'common.white'
                        }),
                        ...(disabled && {
                            color: 'neutral.500'
                        })
                    }}
                >
                    {title}
                </Box>
            </ButtonBase>
        </li>
    );
}

export default SideNavItem;
