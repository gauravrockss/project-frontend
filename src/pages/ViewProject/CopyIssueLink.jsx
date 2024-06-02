import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { useMessage } from '../../components/Header';

const CopyIssueLink = ({ handleClose }) => {
    const { showSuccess, showError } = useMessage();
    const handleCopy = () => {
        const currentURL = window.location.href;

        navigator.clipboard
            .writeText(currentURL)
            .then(() => {
                showSuccess('URL copied sucessfully');
            })
            .catch((error) => {
                showError('Error copying URL to clipboard');
            });

        handleClose();
    };
    return (
        <>
            <DialogTitle id='alert-dialog-title'>
                <Typography variant='body2' fontWeight='bold'>
                    Here's the link to your issues
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    <Typography variant='caption' color='text.secondary'>
                        Copy this link and send it to people that you want to
                        share with. Make sure that you save it so that you can
                        use it later, too.
                    </Typography>
                    <Box mt={2}>
                        <TextField
                            value={window.location.href}
                            size='small'
                            fullWidth
                            id='outlined-start-adornment'
                            placeholder='Copy link'
                            sx={{ pointer: 'cursor' }}
                        />
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleCopy} autoFocus>
                    Copy link
                </Button>
            </DialogActions>
        </>
    );
};

export default CopyIssueLink;
