import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import CheckIcon from '@mui/icons-material/Check';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ issue }) => {
    const navigate = useNavigate();
    const todo = issue.stats?.find((stat) => stat._id === 'To Do')?.items
        ? issue.stats?.find((stat) => stat._id === 'To Do')?.items
        : 0;
    const inprogress = issue.stats?.find((stat) => stat._id === 'In Progress')
        ?.items
        ? issue.stats?.find((stat) => stat._id === 'In Progress')?.items
        : 0;
    const Review = issue.stats?.find((stat) => stat._id === 'Review')?.items
        ? issue.stats?.find((stat) => stat._id === 'Review')?.items
        : 0;
    const Done = issue.stats?.find((stat) => stat._id === 'Done')?.items
        ? issue.stats?.find((stat) => stat._id === 'Done')?.items
        : 0;

    return (
        <>
            <Grid item lg={6} xl={3} xs={12}>
                <Card
                    onClick={() => navigate(`/your-work/?status=To Do`)}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'custom.cardHover',
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography mb={1} fontWeight='550'>
                                To Do
                            </Typography>
                            <Typography variant='h5' sx={{ color: '#F7284A' }}>
                                {todo}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                sx={{
                                    color: '#fff',
                                    height: '55px',
                                    width: '55px',
                                    background: '#F7284A',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        background: '#F7284A',
                                    },
                                }}
                            >
                                {/*  */}
                                <WorkHistoryOutlinedIcon
                                    sx={{ fontSize: '24px' }}
                                />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            {/*  */}
            <Grid item lg={6} xs={12} xl={3}>
                <Card
                    onClick={() => navigate(`/your-work/?status=In Progress`)}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'custom.cardHover',
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography mb={1} fontWeight='550'>
                                In Progress
                            </Typography>
                            <Typography variant='h5' sx={{ color: '#3366FF' }}>
                                {inprogress}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                sx={{
                                    color: '#fff',
                                    height: '55px',
                                    width: '55px',
                                    background: '#3366FF',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        background: '#3366FF',
                                    },
                                }}
                            >
                                {/*  */}
                                <WorkOutlineOutlinedIcon
                                    sx={{ fontSize: '24px' }}
                                />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item lg={6} xs={12} xl={3}>
                <Card
                    onClick={() => navigate(`/your-work/?status=Review`)}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'custom.cardHover',
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography mb={1} fontWeight='550'>
                                Review
                            </Typography>
                            <Typography variant='h5' sx={{ color: '#FE7F00' }}>
                                {Review}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                sx={{
                                    height: '55px',
                                    width: '55px',
                                    color: '#fff',
                                    background: '#FE7F00',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        background: '#FE7F00',
                                    },
                                }}
                            >
                                {/*  */}
                                <InfoOutlinedIcon sx={{ fontSize: '24px' }} />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            {/*  */}
            <Grid item lg={6} xs={12} xl={3}>
                <Card
                    onClick={() => navigate(`/your-work/?status=Done`)}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'custom.cardHover',
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography mb={1} fontWeight='550'>
                                Done
                            </Typography>
                            <Typography variant='h5' sx={{ color: '#0DCD94' }}>
                                {Done}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                sx={{
                                    color: '#fff',
                                    height: '55px',
                                    width: '55px',
                                    background: '#0DCD94',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        background: '#0DCD94',
                                    },
                                }}
                            >
                                {/*  */}
                                <CheckIcon sx={{ fontSize: '24px' }} />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default DashboardCard;
