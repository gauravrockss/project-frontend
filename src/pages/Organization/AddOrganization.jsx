import React, { useCallback, useEffect, useMemo } from 'react';

import { Input } from '../../hooks/useForm/inputs';
import { Form, Submit, useForm } from '../../hooks/useForm';
import { useMessage } from '../../components/Header';
import { Button, Card, DialogActions, Typography, TextField } from '@mui/material';
import { authServer } from './../../utilities/axiosPrototypes';

const AddOrganization = ({ closeModal, organizationId, fetchOgranizations }) => {
    const title = organizationId ? 'Edit Organization' : 'Create New Organization';

    const buttonText = organizationId ? 'Save' : 'Create';
    const method = organizationId ? 'PATCH' : 'POST';
    const action = organizationId ? `/organization/${organizationId}` : '/organization';
    const successMessage = organizationId
        ? 'organization updated successfully'
        : 'organization created successfully';

    const handlers = useForm(
        useMemo(
            () => ({
                name: '',
            }),
            []
        ),
        { Input: TextField }
    );
    const { showSuccess, showError } = useMessage();

    const setValues = handlers.setValues;

    const fetchOgranization = useCallback(
        async function () {
            try {
                const response = await authServer.get(`organization/${organizationId}`);
                const organization = response.data.organization;
                setValues({ name: organization.name });
            } catch (e) {
                console.log(e);
            }
        },
        [setValues, organizationId]
    );

    useEffect(() => {
        organizationId && fetchOgranization();
    }, [fetchOgranization, organizationId]);

    const submit = res => {
        const { success, error } = res.data;

        if (!success) return showError(error);

        showSuccess(successMessage);
        closeModal();
        fetchOgranizations();
    };
    return (
        <>
            <Card
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    width: '100%',
                    p: 2,
                    m: 2,
                    mt: 8,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}>
                <Form
                    handlers={handlers}
                    onSubmit={submit}
                    action={action}
                    method={method}
                    axiosInstance={authServer}
                    onError={console.log}>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    <Input
                        name='name'
                        variant='standard'
                        placeHolder='Add Organization'
                        fullWidth
                        autoComplete='off'
                    />
                    <DialogActions sx={{ mt: 2 }}>
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
                                    {buttonText}
                                </Button>
                            )}
                        </Submit>
                    </DialogActions>
                </Form>
            </Card>
        </>
    );
};

export default AddOrganization;
