import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    // CircularProgress,
    Container,
    // Dialog,
    // DialogActions,
    // DialogContent,
    // DialogContentText,
    // DialogTitle,
    Grid,
    IconButton,
    Tooltip,
    // Menu,
    // MenuItem,
    Typography,
} from '@mui/material';
import React from 'react';
import Image from '../../components/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
// import { useOrganizationId } from '../../hooks/Authorize';
// import { useMessage } from '../../components/Header';
// import axios from 'axios';

const AllProjectsCard = ({ projects, fetchProjects }) => {
    // const organizationId = useOrganizationId();
    // const { showError, showSuccess } = useMessage();
    const navigate = useNavigate();

    // const [deleteLoading, setDeleteLoading] = React.useState(false);
    // const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    //     React.useState(false);
    // const [anchorElSettings, setAnchorElSettings] = React.useState(null);

    // const openSettingsMenu = (event, id) => {
    //     setAnchorElSettings(event.currentTarget);
    //     setProjectEdit(id);
    // };
    // const closeSettingsMenu = () => {
    //     setAnchorElSettings(null);
    // };
    // const handleDeleteClick = () => {
    //     setConfirmDeleteDialogOpen(true);
    // };

    // const handleConfirmDelete = React.useCallback(
    //     async function () {
    //         setDeleteLoading(true);
    //         try {
    //             const response = await axios.delete(
    //                 `/organization/${organizationId}/project/${projectEdit}`
    //             );

    //             const { success, message } = response.data;

    //             if (!success) return showError(message);

    //             showSuccess('Projects deleted successfully');
    //             // Close the confirmation dialog
    //             setConfirmDeleteDialogOpen(false);
    //             setDeleteLoading(false);

    //             fetchProjects();
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [projectEdit, organizationId, showError, showSuccess, fetchProjects]
    // );

    // const handleCancelDelete = () => {
    //     setConfirmDeleteDialogOpen(false);
    // };

    return (
        <>
            {projects?.length ? (
                <Container maxWidth='md' sx={{ p: 0 }}>
                    <Grid
                        container
                        spacing={2}
                        display='flex'
                        alignItems='center'
                        mb={1}>
                        {projects.map((project, i) => (
                            <Grid item lg={4} sm={6} xs={12}>
                                <Card
                                    // elevation={0}
                                    sx={{
                                        pb: 0,
                                        cursor: 'pointer',
                                        backgroundImage: 'none',
                                        minHeight: '160px',
                                        '&:hover': {
                                            backgroundColor: 'custom.cardHover',
                                        },
                                    }}
                                    onClick={() =>
                                        navigate(`/projects/files/board`)
                                    }>
                                    <Box
                                        sx={{
                                            // backgroundColor: 'white.light',
                                            backgroundImage:
                                                'linear-gradient(90deg, rgb(237, 228, 100),rgb(252, 152, 51))',
                                            textAlign: 'right',
                                            height: '60px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Box sx={{ mt: 4, mx: 2 }}>
                                            <Image
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRQ4bYFmia4f1Se_Ui7AssWRCWI9r3j7RyHXjT0MjiA&s'
                                                alt='#icon'
                                                style={{
                                                    height: 50,
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </Box>
                                        <IconButton
                                            // onClick={(e) => {
                                            //     e.stopPropagation();
                                            //     openSettingsMenu(
                                            //         e,
                                            //         project._id
                                            //     );
                                            // }}
                                            sx={{
                                                background: 'none',
                                                '&:hover': {
                                                    background: 'none',
                                                },
                                            }}>
                                            <MoreVertIcon size='small' />
                                        </IconButton>
                                    </Box>
                                    {/* <Menu
                                        anchorOrigin={{
                                            vertical: 'right',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'right',
                                            horizontal: 'right',
                                        }}
                                        anchorEl={anchorElSettings}
                                        open={Boolean(anchorElSettings)}
                                        onClose={closeSettingsMenu}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <MenuItem
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick();
                                            }}
                                        >
                                            Delete
                                        </MenuItem>
                                    </Menu> */}
                                    <CardContent sx={{ pb: 0 }}>
                                        <Box mt={2}>
                                            <Typography
                                                color='text.tertiary'
                                                fontWeight={500}>
                                                {project.name}
                                            </Typography>
                                        </Box>

                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            mt={1}
                                            pb={0}>
                                            <Tooltip
                                                title={`${
                                                    'Project lead' +
                                                    ':  ' +
                                                    'Gaurav Gupta'
                                                }`}
                                                placement='bottom'>
                                                <Avatar
                                                    //     src='data:image/jpeg;base64,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'
                                                    sx={{
                                                        width: '25px',
                                                        height: '25px',

                                                        fontSize: '14px',
                                                    }}
                                                />
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
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
                        <Image name='noproject.svg' />
                    </Box>
                    <Typography
                        variant='h6'
                        color='text.secondary'
                        fontWeight='bold'
                        sx={{ mt: 1 }}>
                        You currently have no projects
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mt: 1 }}>
                        Let's create your first project in Clikkle Projects
                    </Typography>
                    <Link to='/create-project'>
                        <Button
                            startIcon={<AddIcon fontSize='small' />}
                            variant='contained'
                            size='small'
                            sx={{ mt: 2 }}>
                            Create New Project
                        </Button>
                    </Link>
                </Box>
            )}
            {/* <Dialog
                open={confirmDeleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to delete the Project
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancelDelete}
                        color='primary'
                        style={{ color: 'white' }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        onClick={handleConfirmDelete}
                        disabled={deleteLoading}
                        endIcon={
                            deleteLoading && (
                                <CircularProgress
                                    size='20px'
                                    sx={{ color: 'inherit' }}
                                />
                            )
                        }
                        style={{ backgroundColor: '#ff2121', border: 'none' }}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
};

export default AllProjectsCard;
