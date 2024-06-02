import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';

const Reminders = ({ Textcolor, Background }) => {
    return (
        <>
            <Grid
                container
                spacing={2}
                display='flex'
                alignItems='center'
                mb={2}
            >
                <Grid item>
                    <IconButton
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            backgroundColor: Background,
                            borderRadius: '8px',
                            color: Textcolor,
                            '&:hover': {
                                backgroundColor: Background,
                            },
                        }}
                    >
                        <Box display='flex' flexDirection='column'>
                            <Typography
                                textAlign='center'
                                fontWeight='bold'
                                variant='body1'
                            >
                                3
                            </Typography>
                            <Typography variant='caption' fontWeight='bold'>
                                FEB
                            </Typography>
                        </Box>
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Typography variant='body1' sx={{ fontSize: '14px' }}>
                        Designing Work Deadline
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                        mobile App ui Design
                    </Typography>
                </Grid>
                <Grid
                    item
                    lg={3}
                    textAlign='center'
                    variant='body2'
                    color='text.secondary'
                >
                    <Typography variant='caption' color='text.secondary'>
                        6 min ago
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default Reminders;
