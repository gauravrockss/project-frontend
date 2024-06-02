import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from './Image';

const Upcoming = () => {
    return (
        <>
            <Box mt={3}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '70vh',
                        width: '100%',
                    }}
                >
                    <Box sx={{ maxWidth: '350px', mb: 2 }}>
                        <Image name='upcoming.svg' width='200' />
                    </Box>
                    <Typography
                        variant='h5'
                        color='text.secondary'
                        fontWeight='bold'
                        sx={{ textAlign: 'center' }}
                    >
                        Unlocking Powerful Collaboration Features
                    </Typography>
                    <Box sx={{ maxWidth: 600, textAlign: 'center', mt: 2 }}>
                        <Typography
                            variant='caption'
                            color='text.secondary'
                            // fontWeight='bold'
                            textAlign='center'
                        >
                            Exciting updates are on the horizon for NextGen
                            Clikkle Projects! Uncover powerful collaboration
                            features that will elevate your project management
                            experience. Stay tuned for the reveal on all
                            platforms. Upcoming!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Upcoming;
