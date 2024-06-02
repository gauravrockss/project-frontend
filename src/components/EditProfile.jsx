import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useCallback, useState } from 'react';
import { useMessage } from './Header';

import axios from 'axios';
import styled from '@emotion/styled';
import { env } from '../utilities/function';
import { useSetUser } from '../hooks/Authorize';
import { getCookie } from '../utilities/cookies';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EditProfile = ({ user, closeProfile }) => {
    const { showSuccess, showError } = useMessage();
    const accessToken = getCookie('accessToken');
    const [profileLoading, setProfileLoading] = useState(false);
    const setUser = useSetUser();

    const fetchProfile = useCallback(
        async function () {
            try {
                const response = await axios.get('/user/profile', {
                    baseURL: env('AUTHENTICATION_SERVER'),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data.user);
            } catch (e) {
                console.log(e);
            }
        },
        [setUser, accessToken]
    );

    const updatePicture = useCallback(
        async function (newPicture) {
            setProfileLoading(true);
            try {
                const formData = new FormData();
                formData.append('photo', newPicture);

                const res = await axios.patch('/user/profile/photo', formData, {
                    baseURL: env('AUTHENTICATION_SERVER'),
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const { success, photo, message } = res.data;
                if (!success) return showError(message);

                setUser({ ...user, photo });
                fetchProfile();
                showSuccess('Update Profile Picture Successfully');
            } catch (e) {
                console.log(e);
            } finally {
                setProfileLoading(false);
            }
        },
        [showSuccess, user, setUser, showError, accessToken, fetchProfile]
    );

    const handleChange = (e) => {
        updatePicture(e.target.files[0]);
    };
    return (
        <>
            <Card
                sx={{
                    position: 'relative',
                    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    width: '100%',
                    px: 2,
                    py: 2,
                    mx: 2,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton onClick={closeProfile}>
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        color='text.secondary'
                        textAlign='center'
                    >
                        Edit Profile Picture
                    </Typography>
                    <MoreVertIcon />
                </Box>
                <Box my={3}>
                    <Typography
                        sx={{ mb: 1, fontWeight: '400' }}
                        variant='h6'
                        color='text.secondary'
                    >
                        Profile picture
                    </Typography>
                    <Typography variant='caption'>
                        A picture helps people to recognise you and lets you
                        know when you’re signed in to your account
                    </Typography>
                </Box>
                <Box textAlign='center'>
                    <IconButton
                        sx={{
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: 'primary.main',
                            p: '3px',
                        }}
                    >
                        {user ? (
                            <>
                                <Avatar
                                    alt='Remy Sharp'
                                    src={`https://api.files.clikkle.com/open/file/preview/${user?.photo}`}
                                    sx={{
                                        cursor: 'pointer',

                                        width: 150,
                                        height: 150,
                                    }}
                                />
                            </>
                        ) : (
                            <Avatar
                                alt='Remy Sharp'
                                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                                sx={{
                                    cursor: 'pointer',

                                    width: 30,
                                    height: 30,
                                    // borderRadius: '8px',
                                }}
                            />
                        )}
                    </IconButton>
                </Box>
                <Grid container spacing={2} mt={2}>
                    <Grid item md={6} xs={12}>
                        <Button
                            type='submit'
                            fullWidth
                            component='label'
                            variant='outlined'
                            disabled={profileLoading}
                            startIcon={<EditIcon />}
                            endIcon={
                                profileLoading && (
                                    <CircularProgress
                                        size='20px'
                                        sx={{ color: 'inherit' }}
                                    />
                                )
                            }
                        >
                            Upload Photo
                            <VisuallyHiddenInput
                                type='file'
                                accept='image/png, image/jpeg ,image/jpg'
                                onChange={handleChange}
                            />
                        </Button>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Button
                            variant='outlined'
                            startIcon={<DeleteIcon />}
                            fullWidth
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default EditProfile;
