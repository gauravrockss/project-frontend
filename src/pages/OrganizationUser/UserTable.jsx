import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Pagination,
    Typography,
} from '@mui/material';
import { useMembers, useOrganizationId } from '../../hooks/Authorize';
import { useMessage } from '../../components/Header';
import { handleAxiosError } from '../../utilities/function';
import { authServer } from '../../utilities/axiosPrototypes';

const columns = [
    { id: 'User', label: 'User', minWidth: 200 },

    {
        id: 'Status',
        label: 'Status',
        minWidth: 150,
    },

    {
        id: '',
        label: '',
        minWidth: 150,
    },
];

const UserTable = ({ organizationUser, setPageNo, pageData, pageNo, fetchOgranizationUser }) => {
    const organizationId = useOrganizationId();
    const members = useMembers();
    const [userId, setUserId] = React.useState(null);
    const { showError, showSuccess } = useMessage();
    const [confirmSuspendDialogOpen, setConfirmSuspendDialogOpen] = React.useState(false);
    const [suspendLoading, setSuspendLoading] = React.useState(false);
    const handleCancelSuspend = () => {
        setConfirmSuspendDialogOpen(false);
    };

    const suspendOgranizationUser = React.useCallback(
        async function () {
            setSuspendLoading(true);
            try {
                const response = await authServer.patch(
                    `organization/${organizationId}/member/${userId}`,
                    {
                        status: 'Suspended',
                    }
                );
                const { success, errors, message } = response.data;
                if (!success) return showError(errors);

                showSuccess(message);

                fetchOgranizationUser();
            } catch (e) {
                handleAxiosError(e, showError);
            } finally {
                setConfirmSuspendDialogOpen(false);
                setSuspendLoading(false);
            }
        },
        [fetchOgranizationUser, organizationId, showSuccess, showError, userId]
    );

    const handleChange = id => {
        setConfirmSuspendDialogOpen(true);
        setUserId(id);
    };

    return (
        <Box
            sx={{
                height: {
                    xs: 'calc(100vh - 470px)',
                    sm: 'calc(100vh - 340px)',
                },
                overflow: 'auto',
                px: 2,
            }}>
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                    }}>
                                    <Typography variant='caption'>{column.label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizationUser.map((member, i) => (
                            <TableRow
                                key={i}
                                hover
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}>
                                <TableCell component='th' scope='row'>
                                    <Box display='flex' alignItems='center'>
                                        <Avatar
                                            src={`https://api.files.clikkle.com/open/file/preview/${
                                                members[member.userId]?.photo
                                            }`}
                                        />
                                        <Box display='flex' flexDirection='column' ml={2}>
                                            <Typography variant='body2'>
                                                {member.fullName}
                                                {member.role === 'owner' ||
                                                member.role === 'admin' ? (
                                                    <span>
                                                        <Chip
                                                            label={member.role}
                                                            size='small'
                                                            sx={{
                                                                ml: 1,
                                                                textTransform: 'uppercase',
                                                                fontSize: '12px',
                                                                backgroundColor: '#9F8FEF',
                                                            }}
                                                        />
                                                    </span>
                                                ) : (
                                                    ''
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{ mt: 1 }}
                                                variant='caption'
                                                color='text.secondary'>
                                                {member.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell component='th' scope='row'>
                                    {member.status}
                                </TableCell>
                                {/* <TableCell component='th' scope='row'>
                                    <Link to='/user-details'>
                                        <Button size='small'>
                                            Show Details
                                        </Button>
                                    </Link>
                                </TableCell> */}
                                <TableCell component='th' scope='row' align='center'>
                                    {/* <IconButton
                                    // onClick={
                                    //     (() => {openSettingsMenu,
                                    //     setUserId(member.userId)})
                                    // }
                                    >
                                        <MoreHorizIcon />
                                    </IconButton> */}
                                    <Button
                                        variant='contained'
                                        size='small'
                                        disabled={member.status === 'Suspended'}
                                        onClick={() => handleChange(member.userId)}>
                                        Suspend
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAlign='right' my={2}>
                <Pagination
                    color='primary'
                    sx={{ float: 'right', my: 3 }}
                    count={pageData}
                    page={pageNo}
                    onChange={(_, newPage) => setPageNo(newPage)}
                />
            </Box>
            {/* <Menu
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
                <MenuItem>Suspend access</MenuItem>
            </Menu> */}

            <Dialog
                open={confirmSuspendDialogOpen}
                onClose={handleCancelSuspend}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>Suspend User</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to Suspend the User
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancelSuspend}
                        color='primary'
                        style={{ color: 'white' }}>
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        onClick={suspendOgranizationUser}
                        disabled={suspendLoading}
                        endIcon={
                            suspendLoading && (
                                <CircularProgress size='20px' sx={{ color: 'inherit' }} />
                            )
                        }
                        style={{ backgroundColor: '#ff2121', border: 'none' }}
                        autoFocus>
                        Suspend
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserTable;
