import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Pagination,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

import Image from '../../components/Image';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AssignedList from './AssignedList';
import Upcoming from '../../components/Upcoming';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../style/theme';
import { BackgroundColorYourWork } from '../../services/stickerColor';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role='tabpanel' hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

const Index = () => {
    const projectsData = [
        {
            name: 'Files',
            pending: '2',
            done: '5',
        },
        {
            name: 'Files',
            pending: '2',
            done: '5',
        },
    ];
    const { mode } = useTheme();
    const [tabSelected, setTabSelected] = useState(0);
    const [searchParams] = useSearchParams();
    const [pageData] = useState({});
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();
    const tabHandleChange = (event, newValue) => {
        setTabSelected(newValue);
    };
    const issueStatus = searchParams.get('status');
    const issueStatusState = Boolean(searchParams.get('status'));
    console.log(issueStatus);
    const [issues] = React.useState(null);
    const [projects] = React.useState(projectsData);

    // const fetchIssues = React.useCallback(
    //     async function () {
    //         try {
    //             const response = await axios.get(
    //                 !issueStatusState
    //                     ? `/organization/${organizationId}/your-work/issues?page=${pageNo}`
    //                     : `/organization/${organizationId}/your-work/issues/?status=${issueStatus}&page=${pageNo}`
    //             );
    //             setIssues(response.data.issues);
    //             setPageData(response.data.pageData.totalPages);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [setIssues, organizationId, issueStatusState, issueStatus, pageNo]
    // );

    // const fetchProjects = React.useCallback(
    //     async function () {
    //         try {
    //             const response = await axios.get(
    //                 `/organization/${organizationId}/your-work/projects`
    //             );
    //             setProjects(response.data.projects);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [setProjects, organizationId]
    // );

    // React.useEffect(() => {
    //     organizationId && fetchIssues();
    // }, [fetchIssues, organizationId]);

    // React.useEffect(() => {
    //     organizationId && fetchProjects();
    // }, [fetchProjects, organizationId]);
    return (
        <Box
            sx={{
                height: {
                    sm: 'calc(100vh - 90px)',
                    xs: 'calc(100vh - 120px)',
                },
                overflowY: 'auto',
                px: 2,
            }}>
            <Box my={3}>
                <Box sx={{ mt: 3 }}>
                    <Grid
                        container
                        spacing={4}
                        display='flex'
                        alignItems='center'>
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

                    <Typography color='text.tertiary' mt={1}>
                        Recent projects
                    </Typography>
                    {/* <Divider sx={{ mt: 1 }} /> */}
                </Box>

                {/* <Box
                        sx={{
                            height: 'calc(100vh - 174px)',
                            overflowY: 'auto',
                            px: 2,
                        }}
                    > */}
                <Grid container spacing={2} mt={1}>
                    {projects.length ? (
                        projects?.map((project, i) => (
                            <Grid
                                item
                                lg={2.4}
                                xl={2}
                                xs={12}
                                md={3}
                                sm={6}
                                key={i}>
                                <Card
                                    sx={{
                                        minHeight: '150px',
                                        height: '100%',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            boxShadow:
                                                mode === 'light'
                                                    ? '0px 0px 0px 1px #dcdcdc, 0px 8px 12px #0000001a, 0px 0px 1px 1px #00000033, 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.12)'
                                                    : '0px 0px 0px 1px #39424a, 0px 8px 12px #0304045C, 0px 0px 1px 1px #03040480, 0 2px 4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
                                        },
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/projects/${project._id}/board`
                                        )
                                    }>
                                    <Box
                                        sx={{
                                            backgroundColor:
                                                BackgroundColorYourWork[
                                                    Math.floor(
                                                        Math.random() * 5
                                                    )
                                                ],
                                            height: '100%',
                                            width: '30px',
                                            position: 'absolute',

                                            left: 1,
                                        }}></Box>
                                    <CardContent sx={{ p: 1.5 }}>
                                        <Box display='flex' alignItems='start'>
                                            <Box sx={{ zIndex: 1 }}>
                                                <Image
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRQ4bYFmia4f1Se_Ui7AssWRCWI9r3j7RyHXjT0MjiA&s'
                                                    alt='#icon'
                                                    style={{
                                                        height: 30,

                                                        borderRadius: '8px',
                                                    }}
                                                />
                                            </Box>
                                            <Box ml={1.5}>
                                                <Typography
                                                    variant='body2'
                                                    color='text.tertiary'
                                                    fontWeight='bold'
                                                    sx={{
                                                        fontSize: '14px',
                                                        // letterSpacing: 1,
                                                    }}>
                                                    {project.name}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '10px',
                                                        fontWeight: 600,
                                                    }}
                                                    color='text.secondary'>
                                                    Team-managed business
                                                </Typography>
                                                <Box mt={0.5}>
                                                    <Typography
                                                        variant='caption'
                                                        color='text.secondary'
                                                        fontWeight='bold'>
                                                        Issues Details
                                                    </Typography>
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='space-between'
                                                        mt={0.5}>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                            fontWeight='bold'
                                                            sx={{
                                                                fontSize:
                                                                    '11px',
                                                            }}>
                                                            Open issues
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                            fontWeight='bold'
                                                            sx={{
                                                                fontSize:
                                                                    '11px',
                                                            }}>
                                                            {project.pending}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='space-between'>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                            fontWeight='bold'
                                                            sx={{
                                                                fontSize:
                                                                    '11px',
                                                            }}>
                                                            Done
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                            fontWeight='bold'
                                                            sx={{
                                                                fontSize:
                                                                    '11px',
                                                            }}>
                                                            {project.done}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography
                                variant='body2'
                                color='text.secondary'
                                sx={{ mt: 1 }}>
                                You have no recently viewed projects
                            </Typography>
                            <Link to='/projects'>
                                <Button
                                    // startIcon={<AddIcon fontSize='small' />}
                                    variant='contained'
                                    size='small'
                                    sx={{ mt: 2 }}>
                                    View all projects
                                </Button>
                            </Link>
                        </Grid>
                    )}
                </Grid>

                <Box
                    sx={{
                        mt: 3,
                        borderBottom: 1,
                        borderColor: 'divider',
                        // px: 2,
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
                    <Box sx={{ overflow: 'auto' }}>
                        {issues?.length ? (
                            <>
                                <AssignedList
                                    issues={issues}
                                    issueStatusState={issueStatusState}
                                    issueStatus={issueStatus}
                                />
                                {pageData > 1 && (
                                    <Box textAlign='right' mt={2}>
                                        <Pagination
                                            color='primary'
                                            sx={{ float: 'right' }}
                                            count={pageData}
                                            page={pageNo}
                                            onChange={(_, newPage) =>
                                                setPageNo(newPage)
                                            }
                                        />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Grid container spacing={2} mt={3}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            width: '100%',
                                        }}>
                                        <Box sx={{ width: '150px' }}>
                                            <Image name='nowork.svg' />
                                        </Box>
                                        <Typography
                                            variant='h6'
                                            color='text.secondary'
                                            fontWeight='bold'
                                            sx={{ mt: 1 }}>
                                            You haven’t worked on anything yet
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                            sx={{ mt: 1 }}>
                                            In this page, you’ll find your
                                            recently worked on issues. Get
                                            started by finding the project your
                                            team is working on.
                                        </Typography>
                                        <Link to='/projects'>
                                            <Button
                                                // startIcon={<AddIcon fontSize='small' />}
                                                variant='contained'
                                                size='small'
                                                sx={{ mt: 2 }}>
                                                View all projects
                                            </Button>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </TabPanel>

                <TabPanel value={tabSelected} index={1}>
                    <Upcoming />
                </TabPanel>
                <TabPanel value={tabSelected} index={2}>
                    <Upcoming />
                </TabPanel>
            </Box>
        </Box>
    );
};

export default Index;
