import { Box, Grid, IconButton, Skeleton, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import InfoIcon from '@mui/icons-material/InfoOutlined';
import Upcoming from '../../components/Upcoming';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role='tabpanel' hidden={value !== index}>
            {value === index && (
                <Box p={1}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const YourWorkSkeleton = () => {
    const [tabSelected, setTabSelected] = useState(0);
    const tabHandleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    return (
        <>
            <Box my={3}>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={4} display='flex' alignItems='center'>
                        <Grid item xs display='flex' alignItems='center'>
                            <Typography variant='h5'> Your Work</Typography>
                        </Grid>
                        <Grid item display='flex' alignItems='center'>
                            <Box sx={{ ml: 2 }}>
                                <Tooltip title='info' placement='top'>
                                    <IconButton
                                        // disableRipple
                                        // variant='navIcon'
                                        sx={{ mr: 0 }}>
                                        <InfoIcon fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={1}>
                    <Typography color='text.tertiary'>Recent projects</Typography>
                    <Grid container spacing={2} mt={1}>
                        {Array(4)
                            .fill(0)
                            .map((el, i) => (
                                <Grid item lg={2.4} xl={2} xs={12} md={3} sm={6} key={i}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        height='139px'
                                        // width='213px'
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Box>

                <Box
                    mt={7}
                    sx={{
                        height: 'calc(100vh - 390px)',
                        overflow: 'auto',
                    }}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}>
                        <Tabs
                            value={tabSelected}
                            onChange={tabHandleChange}
                            aria-label='secondary tabs example'>
                            <Tab label='Assigned to me' />
                            <Tab label='Worked on' />
                            <Tab label='Starred' />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabSelected} index={0}>
                        <Grid container spacing={2}>
                            {Array(2)
                                .fill(0)
                                .map((el, i) => (
                                    <Grid item xs={12} key={i}>
                                        <Skeleton
                                            variant='rectangular'
                                            animation='wave'
                                            height='50px'
                                            sx={{
                                                borderRadius: '4px',
                                            }}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabSelected} index={1}>
                        <Upcoming />
                    </TabPanel>
                    <TabPanel value={tabSelected} index={2}>
                        <Upcoming />
                    </TabPanel>
                </Box>
            </Box>
        </>
    );
};

export default YourWorkSkeleton;
