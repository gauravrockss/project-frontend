import React, { useCallback, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    Grid,
    Modal,
    Skeleton,
    Card,
    Stack,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
// import Search from '../../components/Search';
import UserTable from './UserTable';
import InviteUserModal from './InviteUserModal';
import useModal from '../../hooks/useModal';
import { useOrganizationId } from '../../hooks/Authorize';
import { env } from '../../utilities/function';
import { useMessage } from '../../components/Header';
import LinkIcon from '@mui/icons-material/Link';
import { authServer } from '../../utilities/axiosPrototypes';

const Index = () => {
    const {
        state: InviteUser,
        openModal: openInviteUser,
        closeModal: closeInviteUser,
    } = useModal();
    const organizationId = useOrganizationId();
    const { showError, showResponse } = useMessage();
    const [organizationUser, setOrganizationUser] = useState(null);
    const [pageData, setPageData] = useState({});
    const [pageNo, setPageNo] = useState(1);

    const { state, openModal: openCopyModal, closeModal: closeCopyModal } = useModal();
    const link = `${env('DOMAIN')}?org=${organizationId}`;

    const fetchOgranizationUser = useCallback(
        async function () {
            try {
                const response = await authServer.get(
                    `organization/${organizationId}/member?page=${pageNo}`
                );
                setOrganizationUser(response.data.members);
                setPageData(response.data.pageData.totalPages);
            } catch (e) {
                console.log(e);
            }
        },
        [setOrganizationUser, organizationId, pageNo]
    );

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            showResponse('Link copied');
        } catch (e) {
            showError('Failed to copy the link');
        }
    };

    useEffect(() => {
        fetchOgranizationUser();
    }, [fetchOgranizationUser]);

    return (
        <Box my={3}>
            <Box sx={{ mt: 3, px: 2 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs display='flex' alignItems='center'>
                        <Typography variant='h5'>Organization</Typography>
                        <Typography variant='h5' color='text.secondary' sx={{ ml: 1 }}>
                            {' '}
                            Users
                        </Typography>
                    </Grid>
                    <Grid item display='flex' alignItems='center'>
                        <Button
                            endIcon={<AddIcon fontSize='small' />}
                            variant='contained'
                            size='small'
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            onClick={openInviteUser}>
                            Invite User
                        </Button>
                    </Grid>
                    <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <IconButton onClick={openInviteUser}>
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box my={4}>
                    <Typography color='text.secondary' variant='body2'>
                        Manage product access for all users in your organization.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={2}>
                        <Typography color='text.secondary' variant='body2'>
                            Total Users
                        </Typography>
                        {organizationUser ? (
                            <Typography
                                color='text.secondary'
                                fontWeight='400'
                                textAlign='left'
                                variant='h4'
                                sx={{ mt: 1 }}>
                                {organizationUser?.length}
                            </Typography>
                        ) : (
                            <Skeleton animation='wave' sx={{ width: '40px', height: '70px' }} />
                        )}
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Typography color='text.secondary' variant='body2'>
                            Active Users
                        </Typography>
                        {organizationUser ? (
                            <Typography
                                color='text.secondary'
                                fontWeight='400'
                                textAlign='left'
                                variant='h4'
                                sx={{ mt: 1 }}>
                                {organizationUser.filter(user => user.status === 'Active').length}
                            </Typography>
                        ) : (
                            <Skeleton animation='wave' sx={{ width: '40px', height: '70px' }} />
                        )}
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Typography color='text.secondary' variant='body2'>
                            Administrators
                        </Typography>
                        {organizationUser ? (
                            <Typography
                                color='text.secondary'
                                fontWeight='400'
                                textAlign='left'
                                variant='h4'
                                sx={{ mt: 1 }}>
                                {
                                    organizationUser.filter(
                                        user => user.role === 'owner' || user.role === 'admin'
                                    ).length
                                }
                            </Typography>
                        ) : (
                            <Skeleton animation='wave' sx={{ width: '40px', height: '70px' }} />
                        )}
                    </Grid>
                </Grid>
                {/* <Box
                    sx={{
                        maxWidth: '300px',
                        ml: 'auto',
                        my: 2,
                        display: { xs: 'none', sm: 'block' },
                    }}
                >
                    <Search
                        placeholder='Enter user name'
                        value={query.search}
                        onChange={(e) =>
                            setQuery({ ...query, search: e.target.value })
                        }
                    />
                </Box> */}
            </Box>
            <Box mt={3}>
                {organizationUser ? (
                    <>
                        <UserTable
                            organizationUser={organizationUser}
                            fetchOgranizationUser={fetchOgranizationUser}
                            pageData={pageData}
                            setPageNo={setPageNo}
                            pageNo={pageNo}
                        />
                    </>
                ) : (
                    <Grid container spacing={2} px={2}>
                        {Array(4)
                            .fill(0)
                            .map((el, i) => (
                                <Grid item xs={12} key={i}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        height='50px'
                                        sx={{
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                )}
            </Box>

            <Modal
                open={InviteUser}
                onClose={closeInviteUser}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <>
                    <InviteUserModal
                        closeModal={closeInviteUser}
                        fetchOgranizationUser={fetchOgranizationUser}
                        openCopyModal={openCopyModal}
                    />
                </>
            </Modal>
            <Modal
                open={state}
                onClose={closeCopyModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Card
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                        borderRadius: '8px',
                        maxWidth: '563px',
                        width: '100%',
                        mx: 2,
                        p: 2,
                        bgcolor: 'custom.menu',
                        overflowY: 'auto',
                        backgroundImage:
                            'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
                    }}>
                    <Stack direction='horizontal' alignItems='center' mb={2}>
                        <Box
                            sx={{
                                width: '38px',
                                height: '36px',
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <LinkIcon />
                        </Box>
                        <Typography variant='h6' mx={1} fontWeight={400}>
                            Get link
                        </Typography>
                    </Stack>

                    <Grid container spacing={2} alignItems='center' mb={2}>
                        <Grid item xs>
                            <TextField
                                size='small'
                                fullWidth
                                sx={{ mb: 0 }}
                                value={link}
                                disabled
                            />
                        </Grid>
                        <Grid item>
                            <Button variant='outlined' sx={{ px: 2.5 }} onClick={copyToClipboard}>
                                Copy link
                            </Button>
                        </Grid>
                    </Grid>
                    <Stack
                        direction='horizontal'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Typography variant='caption' color='text.secondary'>
                            Share this link to your organization member to invite them directly.
                        </Typography>
                        <Button variant='contained' onClick={closeCopyModal}>
                            Done
                        </Button>
                    </Stack>
                </Card>
            </Modal>
        </Box>
    );
};

export default Index;
