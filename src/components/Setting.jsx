import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
// import LabelIcon from '@mui/icons-material/Label';

const Setting = ({ toggleTheme, mode, closeSettingsMenu }) => {
    return (
        <>
            <Box
                sx={{
                    width: 400,
                    maxHeight: '60vh',
                    overflowY: 'auto',
                }}
            >
                <Box py={1} px={1.5}>
                    <Typography variant='h6' color='text.tertiary'>
                        Settings
                    </Typography>
                </Box>
                <Box px={1.5}>
                    <Typography
                        variant='caption'
                        color='text.tertiary'
                        sx={{ textTransform: 'uppercase' }}
                    >
                        Personal Settings
                    </Typography>
                </Box>
                <MenuItem
                    onClick={() => {
                        toggleTheme();
                        closeSettingsMenu();
                    }}
                    sx={{ mt: 0.5 }}
                >
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        sx={{
                            backgroundColor: 'primary.main',
                            width: '30px',
                            height: '30px',
                            borderRadius: 1,
                            p: 2,
                            mr: 2,
                            color: '#fff',
                        }}
                    >
                        {mode === 'dark' ? (
                            <LightModeIcon
                                fontSize='small'
                                sx={{ fontSize: '15px' }}
                            />
                        ) : (
                            <DarkModeIcon fontSize='small' />
                        )}
                    </IconButton>
                    <Box>
                        <Typography
                            color='text.tertiary'
                            sx={{ fontSize: '14px' }}
                        >
                            Appearance Setting
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                            Manage your theme color
                        </Typography>
                    </Box>
                </MenuItem>

                {/* account setting */}
                {/* <Box px={1.5} my={1.5}>
                    <Typography
                        variant='caption'
                        color='text.tertiary'
                        sx={{ textTransform: 'uppercase' }}
                    >
                        Projects Settings
                    </Typography>
                </Box>

                <MenuItem sx={{ mt: 0.5 }}>
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        sx={{
                            backgroundColor: 'primary.main',
                            width: '30px',
                            height: '30px',
                            borderRadius: 1,
                            p: 2,
                            mr: 2,
                            color: '#fff',
                        }}
                    >
                        <LabelIcon fontSize='small' />
                    </IconButton>
                    <Box>
                        <Typography variant='body2' color='text.tertiary'>
                            Personal Setting
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                            Manage your personal setting
                        </Typography>
                    </Box>
                </MenuItem> */}

                {/*Admin Settinf  */}
                <Box px={1.5} my={1.5}>
                    <Typography
                        variant='caption'
                        color='text.tertiary'
                        sx={{ textTransform: 'uppercase' }}
                    >
                        admin Settings
                    </Typography>
                </Box>
                <Link
                    to='organization-user'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <MenuItem onClick={closeSettingsMenu}>
                        <IconButton
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                                backgroundColor: 'primary.main',
                                width: '30px',
                                height: '30px',
                                borderRadius: 1,
                                p: 2,
                                mr: 2,
                                color: '#fff',
                            }}
                        >
                            <PeopleIcon fontSize='small' />
                        </IconButton>
                        <Box>
                            <Typography variant='body2' color='text.tertiary'>
                                User Management
                            </Typography>
                            <Typography
                                variant='caption'
                                color='text.secondary'
                            >
                                Manage your organization user deatils
                            </Typography>
                        </Box>
                    </MenuItem>
                </Link>
            </Box>
        </>
    );
};

export default Setting;
