import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from '../../components/Image';
import { Form, Submit, useForm } from '../../hooks/useForm';
import { useMessage } from '../../components/Header';
import { Input } from '../../hooks/useForm/inputs';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { useOrganizationId } from '../../hooks/Authorize';
import { handleAxiosError } from '../../utilities/function';
import { projectsImg } from '../../services/stickerColor';

const CreateProject = () => {
    const projectId = useParams().id;
    const organizationId = useOrganizationId();

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
        useState(false);

    const {
        anchorEl: anchorElSettings,
        openMenu: openSettingsMenu,
        closeMenu: closeSettingsMenu,
    } = useMenu();
    const navigate = useNavigate();
    const { showSuccess, showError } = useMessage();

    const buttonText = projectId ? 'Save' : 'Create';
    const method = projectId ? 'PATCH' : 'POST';
    const action = projectId
        ? `/organization/${organizationId}/project/${projectId}`
        : `/organization/${organizationId}/project/`;
    const successMessage = projectId
        ? 'Project updated successfully'
        : 'Project created successfully';
    const handlers = useForm(
        useMemo(
            () => ({
                name: { required: true, value: '' },
                key: { required: true, value: '' },
            }),
            []
        ),
        { Input: TextField }
    );

    const setValues = handlers.setValues;

    const fetchProject = useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/project/${projectId}`
                );
                const { project, success, errors } = response.data;
                if (!success) return showError(errors);

                setValues({ name: project.name, key: project.key });
            } catch (e) {
                handleAxiosError(e, showError);
            }
        },
        [projectId, setValues, organizationId, showError]
    );

    // const fetchUsers = useCallback(
    //     async function () {
    //         try {
    //             const response = await axios.get(`/user`);
    //             setUsers(response.data.users);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [setUsers]
    // );

    const handleConfirmDelete = useCallback(
        async function () {
            setDeleteLoading(true);
            try {
                const response = await axios.delete(
                    `/organization/${organizationId}/project/${projectId}`
                );

                const { success, message } = response.data;

                if (!success) return showError(message);

                showSuccess('Project deleted successfully');
                setConfirmDeleteDialogOpen(false);
                setDeleteLoading(false);
                localStorage.setItem('selectOption', '');
                navigate('/projects');
            } catch (e) {
                console.log(e);
            }
        },
        [projectId, showSuccess, showError, navigate, organizationId]
    );
    const handleCancelDelete = () => {
        setConfirmDeleteDialogOpen(false);
    };

    useEffect(() => {
        projectId && fetchProject();
    }, [fetchProject, projectId]);

    const handleDeleteClick = () => {
        setConfirmDeleteDialogOpen(true);
    };

    const onSubmit = (res) => {
        const { success, errors } = res.data;
        if (!success) return showError(errors);

        showSuccess(successMessage);
        fetchProject();
    };

    return (
        <>
            <Box my={3}>
                {!projectId && (
                    <Box sx={{ my: 3 }}>
                        <Grid
                            container
                            spacing={4}
                            display='flex'
                            alignItems='center'
                        >
                            <Grid item xs display='flex' alignItems='center'>
                                <Typography variant='h5'>Project</Typography>
                                <Typography
                                    variant='h5'
                                    color='text.secondary'
                                    sx={{ ml: 1 }}
                                >
                                    {' '}
                                    Details
                                </Typography>
                            </Grid>
                            {projectId && (
                                <Grid item display='flex' alignItems='center'>
                                    <Box sx={{ ml: 2 }}>
                                        <IconButton
                                            // disableRipple
                                            // variant='navIcon'
                                            onClick={openSettingsMenu}
                                            sx={{ mr: 0 }}
                                        >
                                            <MoreVertIcon fontSize='small' />
                                        </IconButton>
                                    </Box>
                                    <Menu
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        anchorEl={anchorElSettings}
                                        open={Boolean(anchorElSettings)}
                                        onClose={closeSettingsMenu}
                                    >
                                        <MenuItem onClick={handleDeleteClick}>
                                            Delete
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                )}
                <Box mt={4}>
                    <Box
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        <Image
                            name='project.png'
                            alt='#icon'
                            style={{ height: 100 }}
                        />

                        <Box>
                            <Button
                                variant='outlined'
                                size='small'
                                sx={{ fontSize: '11px', my: 1 }}
                            >
                                Change icon
                            </Button>
                        </Box>
                    </Box>
                    <Form
                        handlers={handlers}
                        onSubmit={onSubmit}
                        action={action}
                        method={method}
                        final={
                            projectId
                                ? (values) => ({
                                      ...values,
                                      id: projectId,
                                      imageURL:
                                          projectsImg[
                                              Math.floor(Math.random() * 26)
                                          ],
                                  })
                                : (values) => ({
                                      ...values,
                                      imageURL:
                                          projectsImg[
                                              Math.floor(Math.random() * 26)
                                          ],
                                  })
                        }
                        onError={(e) => handleAxiosError(e, showError)}
                    >
                        <Box sx={{ maxWidth: '300px', mx: 'auto', mt: 3 }}>
                            <Box>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                >
                                    Name
                                </Typography>
                                <Input
                                    placeholder='Name'
                                    size='small'
                                    name='name'
                                    fullWidth
                                />
                            </Box>
                            <Box mt={1}>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                >
                                    Key
                                </Typography>
                                <Input
                                    placeholder='Key'
                                    name='key'
                                    size='small'
                                    fullWidth
                                />
                            </Box>

                            {/* <Box mt={1}>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                >
                                    Default assignee
                                </Typography>
                                <Autocomplete
                                    size='small'
                                    disablePortal
                                    disabled
                                    options={projectLead}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Box> */}
                            <Submit>
                                {(loader) => (
                                    <Button
                                        type='submit'
                                        size='small'
                                        variant='contained'
                                        disabled={loader}
                                        endIcon={loader}
                                    >
                                        {buttonText}
                                    </Button>
                                )}
                            </Submit>
                        </Box>
                    </Form>
                </Box>
            </Box>

            <Dialog
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
                        Are you sure you want to delete the project
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
            </Dialog>
        </>
    );
};

export default CreateProject;
