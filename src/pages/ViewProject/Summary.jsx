import { Box, Typography } from '@mui/material';
import React from 'react';
import { useUser } from '../../hooks/Authorize';
import Image from '../../components/Image';

const Summary = () => {
    const user = useUser();
    return (
        <>
            <Box>
                <Typography
                    variant='h4'
                    sx={{ textAlign: 'center' }}
                    color='text.secondary'
                >
                    Welcome {user.fullName}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '55vh',
                        width: '100%',
                    }}
                >
                    <Box sx={{ width: '350px', mb: 2 }}>
                        <Image name='upcoming.svg' width='200' />
                    </Box>

                    <Typography
                        variant='h5'
                        color='text.secondary'
                        fontWeight='bold'
                    >
                        Coming Soon
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Summary;
