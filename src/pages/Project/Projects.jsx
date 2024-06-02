import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Pagination,
    Skeleton,
    Typography,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AllProjects from './AllProjects';
import AllProjectsCard from './AllProjectsCard';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import TableSkeleton from './TableSkeleton';
// import useAutoPaginate from '../../hooks/useAutoPaginate';

const Projects = () => {
    const projectsData = [
        {
            name: 'Clikkle Files',
            description: 'This is a demo Activity',
            fullName: 'CP123',
            type: 'issue',
        },
        {
            name: 'Clikkle Files',
            description: 'This is a demo Activity',
            fullName: 'CP123',
            type: 'comment',
        },
    ];
    const getProject = () => {
        return localStorage.getItem('projectOrder');
    };
    const [projects] = useState(projectsData);
    const [pageData] = useState({});
    const [pageNo, setPageNo] = useState(1);
    const [projectsOrder, setProjectsOrder] = useState(getProject());

    // const fetchProjects = useCallback(
    //     async function () {
    //         start();
    //         try {
    //             const response = await axios.get(
    //                 `/organization/${organizationId}/project?page=${pageNo}`
    //             );
    //             const { projects, pageData } = response.data;
    //             setProjects(projects);
    //             setPageData(pageData.totalPages);
    //             setTotalProjects(pageData.totalData);
    //         } catch (e) {
    //             console.log(e);
    //         } finally {
    //             end();
    //         }
    //     },
    //     [setProjects, organizationId, start, end, setPageData, pageNo]
    // );

    const handleChangeOrder = () => {
        setProjectsOrder(projectsOrder === 'table' ? 'grid' : 'table');
        localStorage.setItem(
            'projectOrder',
            projectsOrder === 'table' ? 'grid' : 'table'
        );
    };

    // useAutoPaginate({
    //     container: document.getElementById('project'),
    //     cb: fetchProjects,
    //     totalPages: pageData.totalPages,
    // });

    // useEffect(() => {
    //     fetchProjects();
    // }, [fetchProjects]);
    return (
        <>
            <Box my={3}>
                <Box sx={{ mt: 3, px: 2 }}>
                    <Grid
                        container
                        spacing={2}
                        display='flex'
                        alignItems='center'>
                        <Grid item xs display='flex' alignItems='center'>
                            <Typography variant='h5'>Projects</Typography>
                        </Grid>
                        <Grid
                            item
                            display='flex'
                            alignItems='center'
                            sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {projects?.length > 0 && (
                                <Link to='/create-project'>
                                    <Button
                                        startIcon={<AddIcon fontSize='small' />}
                                        variant='contained'
                                        size='small'>
                                        Create New Project
                                    </Button>
                                </Link>
                            )}
                        </Grid>
                        <Grid
                            item
                            sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <Link to='/create-project'>
                                <IconButton>
                                    <AddIcon fontSize='small' />
                                </IconButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <IconButton
                                // disableRipple
                                // variant='navIcon'
                                onClick={handleChangeOrder}
                                sx={{ mr: 0 }}>
                                {projectsOrder === 'grid' ? (
                                    <FormatListBulletedIcon fontSize='small' />
                                ) : (
                                    <WidgetsIcon fontSize='small' />
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Box my={2}>
                        <Typography color='text.secondary' variant='body2'>
                            Project organization refers to the style of
                            coordination, communication and management a team
                            uses throughout a project's life cycle
                        </Typography>
                    </Box>
                    <Divider />
                </Box>
                <Box
                    id='project'
                    sx={{
                        height: {
                            xs: 'calc(100vh - 280px)',
                            sm: 'calc(100vh - 200px)',
                        },
                        overflow: 'auto',
                        px: 2,
                    }}>
                    {projects ? (
                        <>
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={12} sm={2}>
                                    <Typography
                                        color='text.secondary'
                                        variant='body2'>
                                        Total Projects
                                    </Typography>

                                    <Typography
                                        color='text.secondary'
                                        fontWeight='400'
                                        textAlign='left'
                                        variant='h4'
                                        sx={{ mt: 1 }}>
                                        {/* {totalProjects} */} 2
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                {projectsOrder === 'grid' ? (
                                    <AllProjectsCard projects={projects} />
                                ) : (
                                    <AllProjects projects={projects} />
                                )}
                                <Box textAlign='right' my={2}>
                                    <Pagination
                                        color='primary'
                                        sx={{ float: 'right', my: 3 }}
                                        count={pageData}
                                        page={pageNo}
                                        onChange={(_, newPage) =>
                                            setPageNo(newPage)
                                        }
                                    />
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Box my={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}>
                                    <Skeleton
                                        variant='text'
                                        // width={40}
                                        // height={0}
                                    />

                                    <Skeleton
                                        variant='rounded'
                                        width={40}
                                        height={40}
                                    />
                                </Grid>
                            </Grid>
                            {projectsOrder === 'grid' ? (
                                <Container maxWidth='md' sx={{ mt: 4 }}>
                                    <Grid container spacing={2}>
                                        {Array(12)
                                            .fill(0)
                                            .map((el, i) => (
                                                <Grid
                                                    item
                                                    lg={4}
                                                    sm={6}
                                                    xs={12}
                                                    key={i}>
                                                    <Skeleton
                                                        variant='rectangular'
                                                        animation='wave'
                                                        height='112px'
                                                        sx={{
                                                            borderRadius: '4px',
                                                            minHeight: '160px',
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Container>
                            ) : (
                                <Box sx={{ mt: 4 }}>
                                    <TableSkeleton />
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Projects;
