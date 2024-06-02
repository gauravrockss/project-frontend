import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import Image from './Image';
import { useMessage } from './Header';
import { Form, Submit, useForm } from '../hooks/useForm';

import { Input } from '../hooks/useForm/inputs';
import { handleAxiosError } from '../utilities/function';
import OrganizationList from './OrganizationList';
import { authServer } from '../utilities/axiosPrototypes';

const Setup = ({ setContent, children, organizations }) => {
    const { showError, showSuccess } = useMessage();

    const handlers = useForm(
        useMemo(
            () => ({
                name: '',
            }),
            []
        ),
        { Input: TextField }
    );
    const submit = res => {
        const { success, message, errors } = res.data;

        if (!success) return showError(errors);

        showSuccess(message);
        setContent(
            <OrganizationList
                setContent={setContent}
                children={children}
                organizations={organizations}
            />
        );
    };
    return (
        <>
            <Form
                handlers={handlers}
                onSubmit={submit}
                action='/organization'
                method={'post'}
                axiosInstance={authServer}
                onError={e => handleAxiosError(e, showError)}>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    minHeight='100vh'
                    flexDirection='column'>
                    <Typography
                        variant='h3'
                        sx={{
                            fontSize: 'clamp(30px, 5vw, 40px)',
                            textAlign: 'center',
                        }}>
                        Create a Organization to track the status of your projects.
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                            my: 2,
                            fontSize: 'clamp(2px, 5vw, 15px)',
                            textAlign: 'center',
                        }}>
                        Project organization refers to the style of coordination, communication and
                        management a team uses throughout a project's life cycle
                    </Typography>
                    <Box sx={{ maxWidth: '300px' }}>
                        <Image name='setup.svg' width='200' />
                    </Box>
                    <Box my={4}>
                        <Box sx={{ width: { md: 400, xs: 300 } }}>
                            <Input
                                name='name'
                                label='Create Organization'
                                fullWidth
                                autoComplete='off'
                                size='small'
                            />
                        </Box>
                        <Box textAlign='right' mt={2}>
                            <Submit>
                                {loader => (
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        size='medium'
                                        disabled={loader}
                                        endIcon={loader}>
                                        Create
                                    </Button>
                                )}
                            </Submit>
                        </Box>
                    </Box>
                </Box>
            </Form>
        </>
    );
};

export default Setup;
