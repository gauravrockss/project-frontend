import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { escapeDanger, formatTimeAgo } from '../../utilities/function';
import { useMessage } from '../../components/Header';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';

const Comments = ({
    activities,
    fetchComments,
    issueActivity,
    comments,
    members,
    issueId,
    organizationId,
    projectId,
    formats,
    modules,
    quillRef,
}) => {
    const [activityState, setActivityState] = useState(false);
    const [allState, setAllState] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [commentId, setCommentId] = useState(null);
    const { showError, showSuccess } = useMessage();
    const [editStates, setEditStates] = useState(Array(comments?.length).fill(false));
    const [editComment, setEditComment] = useState('');

    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

    const handleCancelDelete = () => {
        setConfirmDeleteDialogOpen(false);
    };
    const handleDeleteClick = id => {
        setConfirmDeleteDialogOpen(true);
        setCommentId(id);
    };

    const handleConfirmDelete = useCallback(
        async function () {
            setDeleteLoading(true);
            try {
                const response = await axios.delete(
                    `/organization/${organizationId}/project/${projectId}/issue/info/${issueId}/comment/${commentId}`
                );

                const { success, message, errors } = response.data;

                if (!success) return showError(errors);

                showSuccess(message);
                // Close the confirmation dialog
                setConfirmDeleteDialogOpen(false);
                setDeleteLoading(false);
                fetchComments(issueId);
            } catch (e) {
                console.log(e);
            }
        },
        [issueId, showSuccess, showError, fetchComments, organizationId, projectId, commentId]
    );

    const handleChangeEdit = (i, description) => {
        setEditComment(description);
        const resetEditStates = [...editStates];

        resetEditStates[i] = true;
        setEditStates(resetEditStates);
    };

    const handleChangeEditQuillCancel = i => {
        const resetEditStates = [...editStates];

        resetEditStates[i] = false;
        setEditStates(resetEditStates);
    };

    const handleChange = value => {
        setEditComment(value);
    };

    const updateComment = useCallback(
        async function (id, i) {
            setEditLoading(true);
            try {
                const response = await axios.patch(
                    `/organization/${organizationId}/project/${projectId}/issue/info/${issueId}/comment/${id}`,
                    {
                        description: editComment,
                    }
                );
                const { success, error, message } = response.data;

                if (!success) return showError(error);
                showSuccess(message);

                fetchComments(issueId);
                const resetEditStates = [...editStates];

                resetEditStates[i] = false;
                setEditStates(resetEditStates);
            } catch (e) {
                console.log(e);
            } finally {
                setEditLoading(false);
            }
        },
        [
            editStates,
            organizationId,
            projectId,
            issueId,
            fetchComments,
            showError,
            showSuccess,
            editComment,
        ]
    );

    return (
        <>
            <Box display='flex' alignItems='center' my={2}>
                <Typography variant='body2' color='text.tertiary'>
                    Show :
                </Typography>
                <Typography
                    variant='caption'
                    fontWeight='500'
                    sx={{
                        px: 1,
                        py: 0.4,
                        ml: 1,
                        cursor: 'pointer',
                        backgroundColor: 'white.light',
                        color: 'text.tertiary',
                        '&:hover': {
                            backgroundColor: 'white.light',
                            color: 'text.tertiary',
                        },
                    }}
                    onClick={() => {
                        setAllState(true);
                        issueActivity();
                        fetchComments(issueId);
                    }}>
                    All
                </Typography>
                <Typography
                    variant='caption'
                    fontWeight='500'
                    sx={{
                        px: 1,
                        py: 0.4,
                        ml: 1,
                        cursor: 'pointer',
                        backgroundColor: 'white.light',
                        color: 'text.tertiary',
                        '&:hover': {
                            backgroundColor: 'white.light',
                            color: 'text.tertiary',
                        },
                    }}
                    onClick={() => {
                        setActivityState(false);
                        fetchComments(issueId);
                        setAllState(false);
                    }}>
                    Comments
                </Typography>
                <Typography
                    variant='caption'
                    fontWeight='500'
                    sx={{
                        px: 1,
                        py: 0.4,
                        ml: 1,
                        cursor: 'pointer',
                        backgroundColor: 'white.light',
                        color: 'text.tertiary',
                        '&:hover': {
                            backgroundColor: 'white.light',
                            color: 'text.tertiary',
                        },
                    }}
                    onClick={() => {
                        setActivityState(true);
                        issueActivity();
                        setAllState(false);
                    }}>
                    History
                </Typography>
            </Box>
            {/* activity*/}

            {allState ? (
                <>
                    <Box>
                        {activities &&
                            activities.map(activity => {
                                const currentTime = new Date();
                                const activiteTime = new Date(activity.time);
                                const differenceInMilliseconds = currentTime - activiteTime;

                                const formattedTimeAgo = formatTimeAgo(differenceInMilliseconds);
                                return (
                                    <Box display='flex' alignItems='start' mb={2}>
                                        <Avatar
                                            sx={{
                                                height: 30,
                                                width: 30,
                                                mr: 2,
                                            }}
                                            src={`https://api.files.clikkle.com/open/file/preview/${
                                                members[activity.performerId]?.photo
                                            }`}
                                        />
                                        <Box>
                                            <Typography
                                                variant='body2'
                                                color='text.tertiary'
                                                sx={{
                                                    mb: 0.5,
                                                }}>
                                                {members[activity.performerId]?.fullName}
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    sx={{
                                                        ml: 3,
                                                    }}>
                                                    {formattedTimeAgo}
                                                </Typography>
                                            </Typography>

                                            <Typography variant='caption' color='text.secondary'>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: escapeDanger(
                                                            activity.description.replace(
                                                                /<img/g,
                                                                '<img style="width: 100%; max-width: 400px; height: auto; display:block; padding:5px"'
                                                            )
                                                        ),
                                                    }}></div>
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                    <Box>
                        {comments &&
                            comments.map((comment, i) => {
                                const currentTime = new Date();
                                const activiteTime = new Date(comment.createdAt);
                                const differenceInMilliseconds = currentTime - activiteTime;

                                const formattedTimeAgo = formatTimeAgo(differenceInMilliseconds);
                                return (
                                    <Box display='flex' alignItems='start' mb={2}>
                                        <Avatar
                                            sx={{
                                                height: 30,
                                                width: 30,
                                                mr: 2,
                                            }}
                                            src={`https://api.files.clikkle.com/open/file/preview/${
                                                members[comment.userId]?.photo
                                            }`}
                                        />
                                        <Box>
                                            <Typography
                                                variant='body2'
                                                color='text.tertiary'
                                                sx={{
                                                    mb: 0.5,
                                                }}>
                                                {comment.fullName}
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    sx={{
                                                        ml: 3,
                                                    }}>
                                                    {formattedTimeAgo}
                                                </Typography>
                                            </Typography>

                                            {editStates[i] ? (
                                                <Box sx={{ width: '100%' }}>
                                                    <ReactQuill
                                                        theme='snow'
                                                        value={editComment}
                                                        modules={modules}
                                                        formats={formats}
                                                        onChange={handleChange}
                                                        ref={quillRef}
                                                        className='.richtextWrap'
                                                    />

                                                    <Box mt={1}>
                                                        <Button
                                                            disabled={editLoading}
                                                            endIcon={
                                                                editLoading && (
                                                                    <CircularProgress
                                                                        size='20px'
                                                                        sx={{
                                                                            color: 'inherit',
                                                                        }}
                                                                    />
                                                                )
                                                            }
                                                            variant='contained'
                                                            size='small'
                                                            onClick={() => {
                                                                updateComment(comment._id, i);
                                                            }}>
                                                            {' '}
                                                            Save
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            size='small'
                                                            sx={{ ml: 1 }}
                                                            onClick={() => {
                                                                handleChangeEditQuillCancel(i);
                                                            }}>
                                                            {' '}
                                                            Cancel
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <>
                                                    <Typography
                                                        variant='caption'
                                                        color='text.secondary'>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: escapeDanger(
                                                                    comment.description.replace(
                                                                        /<img/g,
                                                                        '<img style="width: 100%; max-width: 400px; height: auto; display:block; padding:5px"'
                                                                    )
                                                                ),
                                                            }}></div>
                                                    </Typography>

                                                    {/* Edit and delete Comments for v2 */}
                                                    <Box mt={0.5}>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.tertiary'
                                                            fontWeight='bold'
                                                            onClick={() =>
                                                                handleChangeEdit(
                                                                    i,
                                                                    comment.description
                                                                )
                                                            }
                                                            sx={{
                                                                mr: 1,
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    borderBottom: '1px solid grey',
                                                                },
                                                            }}>
                                                            Edit
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.tertiary'
                                                            fontWeight='bold'
                                                            onClick={() => {
                                                                handleDeleteClick(comment._id);
                                                            }}
                                                            sx={{
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    textDecoration: 'underline',
                                                                },
                                                            }}>
                                                            Delete
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                </>
            ) : activityState ? (
                <Box>
                    {activities &&
                        activities.map((activity, i) => {
                            const currentTime = new Date();
                            const activiteTime = new Date(activity.time);
                            const differenceInMilliseconds = currentTime - activiteTime;

                            const formattedTimeAgo = formatTimeAgo(differenceInMilliseconds);
                            return (
                                <Box display='flex' alignItems='start' mb={2}>
                                    <Avatar
                                        sx={{
                                            height: 30,
                                            width: 30,
                                            mr: 2,
                                        }}
                                        src={`https://api.files.clikkle.com/open/file/preview/${
                                            members[activity.performerId]?.photo
                                        }`}
                                    />
                                    <Box>
                                        <Typography
                                            variant='body2'
                                            color='text.tertiary'
                                            sx={{
                                                mb: 0.5,
                                            }}>
                                            {members[activity.performerId]?.fullName}
                                            <Typography
                                                variant='caption'
                                                color='text.secondary'
                                                sx={{
                                                    ml: 3,
                                                }}>
                                                {formattedTimeAgo}
                                            </Typography>
                                        </Typography>

                                        <Typography variant='caption' color='text.secondary'>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: escapeDanger(
                                                        activity.description.replace(
                                                            /<img/g,
                                                            '<img style="width: 100%; max-width: 400px; height: auto; display:block; padding:5px"'
                                                        )
                                                    ),
                                                }}></div>
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                </Box>
            ) : (
                <Box>
                    {comments &&
                        comments.map((comment, i) => {
                            const currentTime = new Date();
                            const activiteTime = new Date(comment.createdAt);
                            const differenceInMilliseconds = currentTime - activiteTime;

                            const formattedTimeAgo = formatTimeAgo(differenceInMilliseconds);
                            return (
                                <Box display='flex' alignItems='start' flexBasis={'100%'} mb={2}>
                                    <Avatar
                                        sx={{
                                            height: 30,
                                            width: 30,
                                            mr: 2,
                                        }}
                                        src={`https://api.files.clikkle.com/open/file/preview/${
                                            members[comment.userId]?.photo
                                        }`}
                                    />
                                    <Box>
                                        <Typography
                                            variant='body2'
                                            color='text.tertiary'
                                            sx={{
                                                mb: 0.5,
                                            }}>
                                            {comment.fullName}
                                            <Typography
                                                variant='caption'
                                                color='text.secondary'
                                                sx={{
                                                    ml: 3,
                                                }}>
                                                {formattedTimeAgo}
                                            </Typography>
                                        </Typography>

                                        {editStates[i] ? (
                                            <Box sx={{ width: '100%' }}>
                                                <ReactQuill
                                                    theme='snow'
                                                    value={editComment}
                                                    modules={modules}
                                                    formats={formats}
                                                    onChange={handleChange}
                                                    ref={quillRef}
                                                    className='.richtextWrap'
                                                />

                                                <Box mt={1}>
                                                    <Button
                                                        disabled={editLoading}
                                                        endIcon={
                                                            editLoading && (
                                                                <CircularProgress
                                                                    size='20px'
                                                                    sx={{
                                                                        color: 'inherit',
                                                                    }}
                                                                />
                                                            )
                                                        }
                                                        variant='contained'
                                                        size='small'
                                                        onClick={() => {
                                                            updateComment(comment._id, i);
                                                        }}>
                                                        {' '}
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant='outlined'
                                                        size='small'
                                                        sx={{ ml: 1 }}
                                                        onClick={() => {
                                                            handleChangeEditQuillCancel(i);
                                                        }}>
                                                        {' '}
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <>
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: escapeDanger(
                                                                comment.description.replace(
                                                                    /<img/g,
                                                                    '<img style="width: 100%; max-width: 400px; height: auto; display:block; padding:5px"'
                                                                )
                                                            ),
                                                        }}></div>
                                                </Typography>

                                                {/* Edit and delete Comments for v2 */}
                                                <Box mt={0.5}>
                                                    <Typography
                                                        variant='caption'
                                                        color='text.tertiary'
                                                        fontWeight='bold'
                                                        onClick={() =>
                                                            handleChangeEdit(i, comment.description)
                                                        }
                                                        sx={{
                                                            mr: 1,
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                borderBottom: '1px solid grey',
                                                            },
                                                        }}>
                                                        Edit
                                                    </Typography>
                                                    <Typography
                                                        variant='caption'
                                                        color='text.tertiary'
                                                        fontWeight='bold'
                                                        onClick={() => {
                                                            handleDeleteClick(comment._id);
                                                        }}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                textDecoration: 'underline',
                                                            },
                                                        }}>
                                                        Delete
                                                    </Typography>
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            );
                        })}
                </Box>
            )}

            <Dialog
                open={confirmDeleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>Delete this comment?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Once you delete, it's gone for good.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color='primary' style={{ color: 'white' }}>
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        onClick={handleConfirmDelete}
                        disabled={deleteLoading}
                        endIcon={
                            deleteLoading && (
                                <CircularProgress size='20px' sx={{ color: 'inherit' }} />
                            )
                        }
                        style={{ backgroundColor: '#ff2121', border: 'none' }}
                        autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Comments;
