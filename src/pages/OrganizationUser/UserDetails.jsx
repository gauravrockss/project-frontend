import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';

const UserDetails = () => {
    return (
        <>
            <Box my={3}>
                <Box sx={{ my: 3 }}>
                    <Grid
                        container
                        spacing={4}
                        display='flex'
                        alignItems='center'
                    >
                        <Grid item xs display='flex' alignItems='center'>
                            <Typography variant='h5'>User</Typography>
                            <Typography
                                variant='h5'
                                color='text.secondary'
                                sx={{ ml: 1 }}
                            >
                                {' '}
                                Details
                            </Typography>
                        </Grid>
                        <Grid item display='flex' alignItems='center'>
                            <Box sx={{ ml: 2 }}>
                                <Tooltip title='info' placement='top'>
                                    <IconButton
                                        // disableRipple
                                        // variant='navIcon'
                                        sx={{ mr: 0 }}
                                    >
                                        <InfoIcon fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Typography variant='h5'>Gaurav Gupta</Typography>
                    <Grid container spacing={2} mt={2}>
                        <Grid item lg={4} xs={12}>
                            <Card sx={{ minHeight: '385px', height: '100%' }}>
                                <CardContent>
                                    <Avatar
                                        alt='Remy Sharp'
                                        src='data:image/jpeg;base64,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'
                                        sx={{
                                            width: '90px',
                                            height: '90px',
                                            mb: 4,
                                        }}
                                    />
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                        fontWeight={500}
                                    >
                                        Full Name
                                    </Typography>
                                    <Typography
                                        color='text.tertiary'
                                        variant='body2'
                                    >
                                        Gaurav Gupta
                                    </Typography>
                                    <Box my={2}>
                                        <Typography
                                            variant='caption'
                                            color='text.secondary'
                                            fontWeight={500}
                                        >
                                            Email address
                                        </Typography>
                                        <Typography
                                            color='text.tertiary'
                                            variant='body2'
                                        >
                                            Gauravgupta@clikkmail.com
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                        fontWeight={500}
                                    >
                                        Public name
                                    </Typography>
                                    <Typography
                                        color='text.tertiary'
                                        variant='body2'
                                    >
                                        @Gaurav Gupta
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Card sx={{ minHeight: '385px', height: '100%' }}>
                                <CardContent>
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='space-between'
                                    >
                                        <Typography color='text.tertiary'>
                                            Product access
                                        </Typography>
                                        <Button variant='outlined' size='small'>
                                            Grant access
                                        </Button>
                                    </Box>
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                    >
                                        Manage existing organization roles and
                                        organization access.
                                    </Typography>
                                    <Box my={3}>
                                        <Typography color='text.tertiary'>
                                            Organizations
                                        </Typography>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid item xs={6}>
                                                <Typography variant='caption'>
                                                    Product
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='caption'>
                                                    Role
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body2'>
                                                    Clikkle Technology
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant='body2'>
                                                    User
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='space-between'
                                    >
                                        <Typography color='text.tertiary'>
                                            Group membership
                                        </Typography>
                                        <Button variant='outlined' size='small'>
                                            Add to groups
                                        </Button>
                                    </Box>
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                    >
                                        Use groups to manage permissions,
                                        restrictions, and organization access.
                                    </Typography>
                                    <Grid container spacing={2} mt={0.5}>
                                        <Grid item xs={6}>
                                            <Typography variant='caption'>
                                                Groups
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='caption'>
                                                Access to
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2'>
                                                Clikkle Technology
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2'>
                                                1 product
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default UserDetails;
