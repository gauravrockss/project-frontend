import {
    Box,
    Button,
    Card,
    DialogActions,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import Image from '../../components/Image';
import { useOrganizationId } from '../../hooks/Authorize';
import { Form, Submit, useForm } from '../../hooks/useForm';
import { useMessage } from '../../components/Header';
import { Input } from '../../hooks/useForm/inputs';
import { handleAxiosError } from '../../utilities/function';
import { authServer } from '../../utilities/axiosPrototypes';

const InviteUserModal = ({ closeModal, fetchOgranizationUser, openCopyModal }) => {
    const organizationId = useOrganizationId();
    const [role, setRole] = useState('Member');
    const handlers = useForm(
        useMemo(
            () => ({
                email: '',
            }),
            []
        ),
        { Input: TextField }
    );
    const { showSuccess, showError } = useMessage();
    const submit = res => {
        const { success, error, message } = res.data;

        if (!success) return showError(error);

        showSuccess(message);
        closeModal();
        fetchOgranizationUser();
        openCopyModal();
    };

    const handleChangeRole = e => {
        setRole(e.target.value);
    };
    return (
        <>
            <Card
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '100%',
                    p: 2,
                    m: 2,
                    my: 8,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}>
                <Form
                    handlers={handlers}
                    onSubmit={submit}
                    action={`/organization/${organizationId}/member`}
                    method={'post'}
                    axiosInstance={authServer}
                    onError={e => handleAxiosError(e, showError)}
                    final={values => ({
                        ...values,
                        role: role,
                    })}>
                    <Typography variant='h6'>Invite people to Organization</Typography>
                    <Typography variant='caption' color='text.secondary' sx={{ mb: 4 }}>
                        Invite teammates to collaborate and use products in your organization.
                    </Typography>
                    <Box sx={{ maxWidth: '150px', mx: 'auto', my: 3 }}>
                        <Image name='invite.svg' width='200' />
                    </Box>

                    <Typography variant='body2' sx={{ mb: 1 }}>
                        Email addresses <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Input
                        name='email'
                        variant='outlined'
                        placeholder='Invite by email address...'
                        fullWidth
                        size='small'
                    />
                    <Typography variant='body2' sx={{ mt: 1 }}>
                        Role <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    {/* <Input
                    name='role'
                    variant='outlined'
                    placeholder='Role'
                    fullWidth
                    size='small'
                /> */}
                    <FormControl size='small' fullWidth>
                        <Select
                            size='small'
                            sx={{
                                fontSize: '14px',
                            }}
                            value={role}
                            name='role'
                            // defaultValue='To Do'
                            onChange={handleChangeRole}>
                            <MenuItem value='owner'>Owner</MenuItem>
                            <MenuItem value='member'>Member</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions sx={{ mt: 1 }}>
                        <Button onClick={closeModal} size='small'>
                            Cancel
                        </Button>
                        <Submit>
                            {loader => (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    size='small'
                                    disabled={loader}
                                    endIcon={loader}>
                                    Invite user
                                </Button>
                            )}
                        </Submit>
                    </DialogActions>
                </Form>
            </Card>
        </>
    );
};

export default InviteUserModal;
