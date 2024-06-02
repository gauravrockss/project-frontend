import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import OrganizationTable from './OrganizationTable';
import Loading from './Loading';
import { authServer } from '../utilities/axiosPrototypes';

const OrganizationList = ({ children, setContent }) => {
    const [organizations, setOrganizations] = useState(null);

    const fetchOgranizations = useCallback(
        async function () {
            try {
                const response = await authServer.get(`/organization`);

                const fetchOrgs = response.data.organizations;

                setOrganizations(fetchOrgs);
            } catch (e) {
                console.log(e);
            }
        },
        [setOrganizations]
    );

    useEffect(() => {
        fetchOgranizations();
    }, [fetchOgranizations]);

    return (
        <>
            <Box my={3} px={2}>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={4} display='flex' alignItems='center'>
                        <Grid item xs display='flex' alignItems='center'>
                            <Typography variant='h5'>Organization</Typography>
                            <Typography variant='h5' color='text.secondary' sx={{ ml: 1 }}>
                                {' '}
                                List
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box my={4}>
                    <Typography color='text.secondary' variant='body2'>
                        Project organization refers to the style of coordination, communication and
                        management a team uses throughout a project's life cycle
                    </Typography>
                </Box>
                {organizations ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography color='text.secondary' variant='body2'>
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
                            <OrganizationTable
                                organizations={organizations}
                                setContent={setContent}
                                children={children}
                            />
                        </Box>
                    </>
                ) : (
                    <Loading />
                )}
            </Box>
        </>
    );
};

export default OrganizationList;
