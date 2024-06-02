import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Skeleton,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import Issues from './Issues';
import ShareIcon from '@mui/icons-material/Share';
import Activity from './Activity';
import CheckIcon from '@mui/icons-material/Check';
// import LineCharts from './LineCharts';
// import Reminders from './Reminders';
// import TaskStatus from './TaskStatus';
// import TaskTime from './TaskTime';
// import TaskSummary from './TaskSummary';
import { Link } from 'react-router-dom';

import { IssueType, Priority } from '../../services/stickerColor';
import Image from '../../components/Image';

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

const Index = () => {
    const issueData = [
        {
            status: 'Completed',
            name: 'Complete the project design',
            projectName: 'Projects',
            key: 'CP123',
            priority: 'Medium',
            issueType: 'Bug',
        },
        {
            status: 'Completed',
            name: 'Complete the project design',
            projectName: 'Projects',
            key: 'CP123',
            priority: 'High',
            issueType: 'Task',
        },
    ];
    const activityData = [
        {
            status: 'Completed',
            description: 'This is a demo Activity',
            fullName: 'CP123',
            type: 'issue',
        },
        {
            status: 'Completed',
            description: 'This is a demo Activity',
            fullName: 'CP123',
            type: 'comment',
        },
    ];

    const [tabSelected, setTabSelected] = useState(0);
    const members = null;

    const tabHandleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    const [issues] = useState(issueData);
    const [metrics] = useState({});
    const [activity] = useState(activityData);

    const [copyStates, setCopyStates] = useState(
        Array(metrics?.issues?.recent?.length).fill(false)
    );

    // const filterOptions = useMemo(
    //     () => [
    //         { name: 'Today', value: 'today' },
    //         { name: 'This week', value: 'week' },
    //         { name: 'This month', value: 'month' },
    //         { name: 'This year', value: 'year' },
    //     ],
    //     []
    // );

    // const fetchMetrics = useCallback(
    //     async function () {
    //         try {
    //             const response = await axios.get(
    //                 `/organization/${organizationId}/dashboard?pageSize=5&sortBy=time&direction=-1`
    //             );
    //             setMetrics(response.data.metrics);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [setMetrics, organizationId]
    // );

    const handleCopy = index => {
        const currentURL = window.location.href;

        navigator.clipboard
            .writeText(currentURL)
            .then(() => {
                const newCopyStates = [...copyStates];
                newCopyStates[index] = true;
                setCopyStates(newCopyStates);

                setTimeout(() => {
                    const resetCopyStates = [...newCopyStates];
                    resetCopyStates[index] = false;
                    setCopyStates(resetCopyStates);
                }, 3000);
            })
            .catch(error => {
                console.log('Error copying URL to clipboard');
            });
    };

    // useEffect(() => {
    //     fetchMetrics();
    // }, [fetchMetrics]);

    return (
        <Box>
            <Box sx={{ mt: 3, px: 2 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs display='flex' alignItems='center'>
                        <Typography variant='h5'> Dashboard</Typography>
                    </Grid>
                    <Grid item display='flex' alignItems='center'>
                        <Link to='/create-project'>
                            <Button
                                startIcon={<AddIcon fontSize='small' />}
                                variant='contained'
                                size='small'>
                                Create new project
                            </Button>
                        </Link>
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
                <Divider sx={{ mt: 1 }} />
            </Box>
            <Box
                sx={{
                    height: {
                        sm: 'calc(100vh - 174px)',
                        xs: 'calc(100vh - 250px)',
                    },
                    overflow: 'auto',
                    px: 2,
                }}>
                <Grid container spacing={2} mt={2}>
                    {!metrics?.issues ? (
                        <DashboardCard issue={metrics.issues || {}} />
                    ) : (
                        Array(4)
                            .fill(0)
                            .map((el, i) => (
                                <Grid item lg={6} xl={3} xs={12} key={i}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        height='112px'
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Grid>
                            ))
                    )}
                </Grid>
                <Box sx={{ mt: 4, mb: 1 }}>
                    <Grid container spacing={4} alignItems='center'>
                        <Grid item xs>
                            <Typography variant='h6'>Issues Updates</Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                size='medium'
                                LinkComponent={Link}
                                to={'/your-work'}
                                sx={{
                                    background: '#75757561',
                                    '&:hover': {
                                        background: '#75757561',
                                    },
                                }}>
                                View All
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Issues Data */}
                <Box mb={3}>
                    <Grid container spacing={2}>
                        {issues.map((issue, i) => (
                            <Grid item lg={4} xl={3} sm={6} xs={12} key={i}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        minHeight: '170px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: 'custom.cardHover',
                                        },
                                    }}
                                    // onClick={() =>
                                    //     navigate(
                                    //         `/projects/${issue.projectId}/board/?issues=${issue._id}`
                                    //     )
                                    // }
                                >
                                    <CardContent sx={{ p: 1, pb: 0 }}>
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'>
                                            {/* <Chip
                                                    label={issue.status}
                                                    variant='outlined'
                                                    size='small'
                                                    sx={{
                                                        color: 'white.dark',
                                                    }}
                                                /> */}
                                            <Typography
                                                variant='caption'
                                                sx={{
                                                    px: 1.5,
                                                    py: 0.3,
                                                    backgroundColor:
                                                        'custom.cardHover',
                                                    borderRadius: '20px',
                                                }}>
                                                {issue.status}
                                            </Typography>

                                            {copyStates[i] ? (
                                                <Box
                                                    sx={{
                                                        px: 1,
                                                        py: 1,
                                                        backgroundColor:
                                                            'lightGreen.dark',
                                                        borderRadius: '100%',
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <CheckIcon
                                                        fontSize='small'
                                                        sx={{
                                                            fontSize: '17px',
                                                        }}
                                                    />
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        px: 1,
                                                        py: 1,
                                                        backgroundColor:
                                                            'custom.cardHover',
                                                        borderRadius: '100%',
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Tooltip
                                                        title={'Copy link'}>
                                                        <ShareIcon
                                                            fontSize='small'
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleCopy(i);
                                                            }}
                                                            sx={{
                                                                fontSize:
                                                                    '17px',
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            )}
                                        </Box>

                                        <Box my={1} mt={1.5}>
                                            <Typography
                                                variant='body2'
                                                color='text.tertiary'
                                                sx={{
                                                    // maxWidth: '380px',
                                                    // whiteSpace: 'nowrap',
                                                    // overflow: 'hidden',
                                                    // textOverflow:
                                                    //     'ellipsis',
                                                    maxWidth: '100%',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 2,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                {issue.name}.
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant='caption'
                                                color='text.secondary'>
                                                {issue.projectName} {'--->'}
                                            </Typography>{' '}
                                            <Typography
                                                variant='caption'
                                                color='text.secondary'>
                                                {issue.key}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            justifySelf: 'end',
                                        }}>
                                        <Box>
                                            <Tooltip
                                                title={
                                                    'Reporter: ' +
                                                    'Gaurav Gupta'
                                                }>
                                                <Avatar
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                />
                                            </Tooltip>
                                        </Box>
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            mt={1}>
                                            <Tooltip
                                                title={
                                                    'Priority: ' +
                                                    issue.priority
                                                }>
                                                <Box>
                                                    <Image
                                                        name={
                                                            Priority[
                                                                issue.priority
                                                            ]
                                                        }
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            mr: 1,
                                                        }}
                                                    />
                                                </Box>
                                            </Tooltip>
                                            <Tooltip
                                                title={
                                                    'IssueType: ' +
                                                    issue.issueType
                                                }>
                                                <Box>
                                                    <Image
                                                        name={
                                                            IssueType[
                                                                issue.issueType
                                                            ]
                                                        }
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            mr: 1,
                                                        }}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Activity Data */}
                <Grid container spacing={2} mb={1}>
                    <Grid item lg={6} xl={6} xs={12}>
                        <Card
                            sx={{
                                height: '436px',
                                borderRadius: '8px',
                            }}>
                            <CardContent>
                                <Box
                                    display='flex'
                                    justifyContent='space-between'
                                    alignItems='center'
                                    sx={{ mb: 3 }}>
                                    <Typography variant='h6'>
                                        Activity
                                    </Typography>{' '}
                                    <Link to='/all-activity'>
                                        <Button
                                            variant='contained'
                                            size='small'>
                                            View All
                                        </Button>
                                    </Link>
                                </Box>
                                {activity.length ? (
                                    <Activity
                                        activities={activity}
                                        members={members}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            height: '60vh',
                                            width: '100%',
                                        }}>
                                        <Box sx={{ width: '150px' }}>
                                            <Image name='noActivity.svg' />
                                        </Box>
                                        <Typography
                                            variant='h6'
                                            color='text.secondary'
                                            fontWeight='bold'
                                            sx={{ mt: 1 }}>
                                            You currently have no Activity
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                            sx={{ mt: 1 }}>
                                            Let's create your first activity in
                                            Clikkle Projects
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* ) : (
                        <Grid item lg={6} xl={6} xs={12}>
                            <Skeleton
                                variant='rectangular'
                                animation='wave'
                                height='436px'
                                sx={{
                                    borderRadius: '4px',
                                }}
                            />
                        </Grid>
                    )} */}

                    <Grid item lg={6} xs={12}>
                        <Card
                            sx={{
                                height: '436px',
                                borderRadius: '8px',
                            }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        borderLeftWidth: '5px',
                                        borderLeftColor: 'primary.main',
                                        borderLeftStyle: 'solid',
                                        height: '40px',
                                        width: '5px',
                                        position: 'absolute',

                                        left: 1,
                                    }}></Box>
                                <Box
                                    display='flex'
                                    justifyContent='space-between'
                                    alignItems='center'>
                                    <Typography variant='h6'>Issues</Typography>{' '}
                                    <Link to='/your-work'>
                                        <Button
                                            variant='contained'
                                            size='small'>
                                            View All
                                        </Button>
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        my: 1,
                                    }}>
                                    <Tabs
                                        value={tabSelected}
                                        onChange={tabHandleChange}
                                        variant='scrollable'
                                        scrollButtons
                                        allowScrollButtonsMobile
                                        aria-label='scrollable force tabs example'>
                                        <Tab label='Todo Issues' />
                                        <Tab label='Pending Issues' />
                                        <Tab label='Review Issues' />
                                        <Tab label='Completed Issues' />
                                    </Tabs>
                                </Box>
                                <TabPanel value={tabSelected} index={0}>
                                    {issues?.length ? (
                                        <Issues issues={issues ? issues : []} />
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                height: '40vh',
                                                width: '100%',
                                            }}>
                                            <Box sx={{ width: '150px' }}>
                                                <Image name='noIssues.svg' />
                                            </Box>

                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{ mt: 1 }}>
                                                Currently no issues for today
                                            </Typography>
                                        </Box>
                                    )}
                                </TabPanel>
                                <TabPanel value={tabSelected} index={1}>
                                    {metrics.issues?.pending?.length ? (
                                        <Issues
                                            issues={
                                                metrics.issues
                                                    ? metrics.issues.pending
                                                    : []
                                            }
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                height: '40vh',
                                                width: '100%',
                                            }}>
                                            <Box sx={{ width: '150px' }}>
                                                <Image name='noIssues.svg' />
                                            </Box>

                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{ mt: 1 }}>
                                                Currently no issues in Pending
                                            </Typography>
                                        </Box>
                                    )}
                                </TabPanel>
                                <TabPanel value={tabSelected} index={2}>
                                    {metrics.issues?.review?.length ? (
                                        <Issues
                                            issues={
                                                metrics.issues
                                                    ? metrics.issues.review
                                                    : []
                                            }
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                height: '40vh',
                                                width: '100%',
                                            }}>
                                            <Box sx={{ width: '150px' }}>
                                                <Image name='noIssues.svg' />
                                            </Box>

                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{ mt: 1 }}>
                                                Currently no issues in Pending
                                            </Typography>
                                        </Box>
                                    )}
                                </TabPanel>
                                <TabPanel value={tabSelected} index={3}>
                                    {metrics.issues?.completed?.length ? (
                                        <Issues
                                            issues={
                                                metrics.issues
                                                    ? metrics.issues.completed
                                                    : []
                                            }
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                height: '40vh',
                                                width: '100%',
                                            }}>
                                            <Box sx={{ width: '150px' }}>
                                                <Image name='noIssues.svg' />
                                            </Box>

                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{ mt: 1 }}>
                                                Currently no issues in Pending
                                            </Typography>
                                        </Box>
                                    )}
                                </TabPanel>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* <Grid item lg={6} xl={6} xs={12}>
                            <Skeleton
                                variant='rectangular'
                                animation='wave'
                                height='436px'
                                sx={{
                                    borderRadius: '4px',
                                }}
                            />
                        </Grid> */}
                </Grid>
                {/* <Grid container spacing={2} my={3}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{ position: 'relative' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    borderLeftWidth: '5px',
                                    borderLeftColor: 'primary.main',
                                    borderLeftStyle: 'solid',
                                    height: '40px',
                                    width: '5px',
                                    position: 'absolute',

                                    left: 1,
                                }}
                            ></Box>
                            <Typography>Statistics</Typography>
                            <LineCharts />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4} xl={4} xs={12}>
                    <Card sx={{ position: 'relative' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    borderLeftWidth: '5px',
                                    borderLeftColor: 'primary.main',
                                    borderLeftStyle: 'solid',
                                    height: '40px',
                                    width: '5px',
                                    position: 'absolute',

                                    left: 1,
                                }}
                            ></Box>
                            <Typography variant='h6' sx={{ mb: 3 }}>
                                Reminders
                            </Typography>
                            <Reminders
                                Background='pink.light'
                                Textcolor='pink.dark'
                            />

                            <Reminders
                                Background='lightGreen.light'
                                Textcolor='lightGreen.dark'
                            />

                            <Reminders
                                Background='orange.light'
                                Textcolor='orange.dark'
                            />

                            <Reminders
                                Background='skyBlue.light'
                                Textcolor='skyBlue.dark'
                            />

                            <Reminders
                                Background='blue.light'
                                Textcolor='blue.dark'
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <TaskStatus />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <TaskTime />
                </Grid>
                <Grid item lg={8} xs={12}>
                    <Card sx={{ position: 'relative' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    borderLeftWidth: '5px',
                                    borderLeftColor: 'primary.main',
                                    borderLeftStyle: 'solid',
                                    height: '40px',
                                    width: '5px',
                                    position: 'absolute',

                                    left: 1,
                                }}
                            ></Box>
                            <Typography variant='h6' sx={{ mb: 3 }}>
                                Project Summary
                            </Typography>
                            <TaskSummary />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid> */}
            </Box>
        </Box>
    );
};

export default Index;
