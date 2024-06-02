import { Box, Card, Divider, Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

const IssueSkeleton = () => {
    return (
        <>
            <Card
                sx={{
                    position: 'relative',
                    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                    borderRadius: '8px',
                    maxWidth: '1250px',
                    border: 2,
                    borderColor: 'rgba(255, 255, 255, 0.07)',
                    width: '100%',
                    p: 2,
                    mx: 2,
                    height: { xs: '85vh', xl: '70vh' },
                    // maxHeight: '75vh',
                    overflowY: 'auto',
                    // overflowX: 'hidden',
                    // '::-webkit-scrollbar': { display: 'none' },
                    pb: 2,
                }}
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={1}
                >
                    {/* issuestype */}
                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        sx={{
                            height: 36,
                            width: 112,
                            borderRadius: '4px',
                        }}
                    />
                    {/* Header right menu */}

                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        sx={{
                            height: 36,
                            width: 112,
                            borderRadius: '4px',
                        }}
                    />
                </Stack>

                {/* form */}

                <Grid container spacing={3}>
                    <Grid item lg={8} xs={12}>
                        <Box
                            sx={{
                                p: 2,
                            }}
                        >
                            <Skeleton
                                variant='rectangular'
                                animation='wave'
                                sx={{
                                    height: 40,
                                    width: '100%',
                                    borderRadius: '4px',
                                }}
                            />
                            {/* button left */}
                            <Box
                                sx={{
                                    display: { md: 'flex', xs: 'block' },
                                }}
                                my={2}
                            >
                                <Skeleton
                                    variant='rectangular'
                                    animation='wave'
                                    sx={{
                                        height: 27,
                                        width: 80,
                                        borderRadius: '4px',
                                    }}
                                />
                            </Box>
                            {/* description */}
                            <Box mt={1}>
                                <Skeleton
                                    variant='rectangular'
                                    animation='wave'
                                    sx={{
                                        height: 30,
                                        width: '100%',
                                        borderRadius: '4px',
                                    }}
                                />
                            </Box>
                            {/* comments section */}
                            <Box mt={5}>
                                <Skeleton
                                    variant='rectangular'
                                    animation='wave'
                                    sx={{
                                        height: 27,
                                        width: 80,
                                        borderRadius: '4px',
                                    }}
                                />
                                <Box display='flex' alignItems='center' my={2}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                            mx: 2,
                                        }}
                                    />
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                            mx: 2,
                                        }}
                                    />
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 50,
                                            width: '100%',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box mb={1}>
                                <Box mt={1}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    border: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.07)',
                                }}
                            >
                                <Box p={1}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        sx={{
                                            height: 27,
                                            width: 80,
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                                <Divider />
                                <Box p={2}>
                                    <Grid
                                        container
                                        spacing={2}
                                        display='flex'
                                        alignItems='center'
                                    >
                                        <Grid item xs={4}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 27,
                                                    width: 80,
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 32,
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 27,
                                                    width: 80,
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 32,
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 27,
                                                    width: 80,
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 32,
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 27,
                                                    width: 80,
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 32,
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        {/* label */}
                                        <Grid item xs={4}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 27,
                                                    width: 80,
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Skeleton
                                                variant='rectangular'
                                                animation='wave'
                                                sx={{
                                                    height: 32,
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* {projectId && ( */}
                                </Box>
                            </Box>
                            {/* )} */}
                        </Box>
                        <Box
                            textAlign='right'
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Skeleton
                                variant='rectangular'
                                animation='wave'
                                sx={{
                                    height: 27,
                                    width: 80,
                                    borderRadius: '4px',
                                    mr: 2,
                                }}
                            />
                            <Skeleton
                                variant='rectangular'
                                animation='wave'
                                sx={{
                                    height: 27,
                                    width: 80,
                                    borderRadius: '4px',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default IssueSkeleton;
