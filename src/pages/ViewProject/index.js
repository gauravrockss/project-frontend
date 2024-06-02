import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    Grid,
    IconButton,
    Skeleton,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from '../../components/Image';
import List from './List';
import Board from './Board';
import CreateProject from '../Project/CreateProject';
import EditNoteIcon from '@mui/icons-material/EditNote';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role='tabpanel' hidden={value !== index}>
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const Index = () => {
    const projectData = [
        {
            name: 'Completed',
            description: 'This is a demo Activity',
            fullName: 'CP123',
            type: 'issue',
        },
        {
            name: 'Completed',
            description: 'This is a demo Activity',
            fullName: 'CP123',
            type: 'comment',
        },
    ];
    const projectId = useParams().id;

    const [tabSelected, setTabSelected] = useState(0);
    const [project] = useState(projectData);
    const [members] = useState({});

    const [memberCurrentPage] = useState(1);
    const [memberTotalPage] = useState(1);

    const tabHandleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    // const fetchProject = useCallback(async () => {
    //     try {
    //         const response = await axios.get(
    //             `/organization/${organizationId}/project/${projectId}`
    //         );
    //         setProject(response.data.project);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [setProject, organizationId, projectId]);

    // const fetchMembers = useCallback(
    //     async function (id) {
    //         try {
    //             const response = await authServer.get(
    //                 `organization/${organizationId}/member?page=${pageNo}`
    //             );

    //             setMembers({});

    //             const { members, pageData } = response.data;

    //             const formatMembers = {};

    //             members.forEach(member => (formatMembers[member.userId] = member));

    //             setMembers(formatMembers);
    //             setMemberTotalPage(pageData.currentPage);
    //             setMemberCurrentPage(pageData.totalPages);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [setMembers, organizationId, pageNo]
    // );

    // useEffect(() => {
    //     fetchMembers();
    // }, [fetchMembers]);

    // useEffect(() => {
    //     fetchProject();
    // }, [fetchProject]);

    return (
        <>
            <Box sx={{ mt: 3, px: 2 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    {project ? (
                        <>
                            <Grid item xs display='flex' alignItems='center'>
                                <Image
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRQ4bYFmia4f1Se_Ui7AssWRCWI9r3j7RyHXjT0MjiA&s'
                                    alt='#icon'
                                    style={{
                                        height: 30,
                                        borderRadius: '8px',
                                    }}
                                />

                                <Typography
                                    variant='h5'
                                    color='text.secondary'
                                    sx={{ ml: 1 }}>
                                    Clikkle Files
                                </Typography>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs display='flex' alignItems='center'>
                            <Skeleton
                                variant='rounded'
                                height={30}
                                width={30}
                            />

                            <Skeleton
                                variant='rounded'
                                width={120}
                                height={30}
                                sx={{ ml: 1 }}
                            />
                        </Grid>
                    )}
                </Grid>

                <Box
                    sx={{
                        mt: 0.5,
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}>
                    <Tabs value={tabSelected} onChange={tabHandleChange}>
                        {/* <Tab label='Summary' sx={{ px: 0 }} /> */}
                        <Tab label='Board' />
                        <Tab label='List' />
                        <Tab label='Project settings' />
                    </Tabs>
                </Box>
            </Box>

            {/* <TabPanel value={tabSelected} index={0}>
                <Summary />
            </TabPanel> */}

            <TabPanel value={tabSelected} index={0}>
                <Board
                    members={members}
                    setPageNo={2}
                    memberTotalPage={memberTotalPage}
                    memberCurrentPage={memberCurrentPage}
                />
            </TabPanel>

            <TabPanel value={tabSelected} index={1}>
                <List members={members} />
            </TabPanel>
            <TabPanel value={tabSelected} index={2}>
                <Box
                    sx={{
                        height: 'calc(100vh - 215px)',
                        overflow: 'auto',
                        px: 2,
                    }}>
                    <Accordion sx={{ my: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'>
                            <Box display='flex' alignItems='center'>
                                <IconButton>
                                    <EditNoteIcon />
                                </IconButton>
                                <Typography
                                    variant='h6'
                                    fontWeight='bold'
                                    color='text.secondary'
                                    sx={{ letterSpacing: '1px' }}>
                                    Edit Projects
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card elevation={0}>
                                <CreateProject projectId={projectId} />
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </TabPanel>
        </>
    );
};

export default Index;
