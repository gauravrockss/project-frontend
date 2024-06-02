import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AllOrganization from './AllOrganization';
import Loading from '../../components/Loading';

const Index = () => {
    const orgData = [
        {
            name: 'Demo',
        },
    ];
    const [organizations] = useState(orgData);

    return (
        <>
            <Box my={3} px={2}>
                <Box sx={{ mt: 3 }}>
                    <Grid
                        container
                        spacing={4}
                        display='flex'
                        alignItems='center'>
                        <Grid item xs display='flex' alignItems='center'>
                            <Typography variant='h5'>Organizations</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box my={4}>
                    <Typography color='text.secondary' variant='body2'>
                        Project organization refers to the style of
                        coordination, communication and management a team uses
                        throughout a project's life cycle
                    </Typography>
                </Box>
                {organizations ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                                <Typography
                                    color='text.secondary'
                                    variant='body2'>
                                    Total Organization
                                </Typography>
                                <Typography
                                    color='text.secondary'
                                    fontWeight='400'
                                    textAlign='left'
                                    variant='h4'
                                    sx={{ mt: 1 }}>
                                    {organizations?.length}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box mt={3}>
                            <AllOrganization organization={organizations} />
                        </Box>
                    </>
                ) : (
                    <Loading />
                )}
            </Box>
        </>
    );
};

export default Index;
