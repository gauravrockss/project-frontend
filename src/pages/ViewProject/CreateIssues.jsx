import {
    Button,
    Card,
    IconButton,
    Stack,
    Typography,
    MenuItem,
    FormControl,
    Select,
    Box,
    Grid,
    TextField,
    Divider,
    Menu,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    CircularProgress,
    Avatar,
    ListItemAvatar,
} from '@mui/material';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Form, Submit, useForm } from '../../hooks/useForm';
import { useMessage } from '../../components/Header';
import { Input } from '../../hooks/useForm/inputs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import axios from 'axios';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMenu } from '../../hooks/useMenu';
import { useOrganizationId } from '../../hooks/Authorize';
import {
    escapeDanger,
    formatTimeAgo,
    handleAxiosError,
} from '../../utilities/function';
// import JoinInnerIcon from '@mui/icons-material/JoinInner';
// import LanIcon from '@mui/icons-material/Lan';
// import AttachmentIcon from '@mui/icons-material/Attachment';
import ShareIcon from '@mui/icons-material/Share';
import Image from '../../components/Image';
import { IssueType, Priority } from '../../services/stickerColor';
import Label from './Label';
import { useSearchParams } from 'react-router-dom';
import CopyIssueLink from './CopyIssueLink';
import Comments from './Comments';

const CreateIssues = props => {
    const {
        closeModal,
        description,
        fetchIssues,
        projectId,
        reporter,
        priority,
        issueType,
        status,
        assignee,
        labels,
        comments,
        fetchComments,
        name,
        keyId,
        members,
        createdAt,
        setPageNo,
        memberTotalPage,
        memberCurrentPage,
    } = props;

    // const user = useUser();

    const { showError, showSuccess } = useMessage();
    const organizationId = useOrganizationId();
    const [searchParams] = useSearchParams();
    const [showDescription, setShowDescription] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [assignSelect, setAssignSelect] = useState(true);
    const [prioritySelect, setPrioritySelect] = useState(true);
    const [reporterSelect, setReporterSelect] = useState(true);
    const [issueTypeSelect, setIssueTypeSelect] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [labelsList, setLabelsList] = useState([]);
    const [commentState, setCommentState] = useState(false);
    const [comment, setComment] = useState();
    const [activities, setActivities] = useState(null);

    const [text, setText] = useState();
    const quillRef = useRef(null);

    // const [commentEditState, setCommentEditState] = useState(false);
    // const [commentEdit, setCommentEdit] = useState();

    const [selectOption, setSelectOption] = useState({
        status: '',
        priority: '',
        issueType: '',
        assignee: '',
        reporter: '',
    });
    const issueId = searchParams.get('issues');

    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
        useState(false);

    const {
        anchorEl: anchorElSettings,
        openMenu: openSettingsMenu,
        closeMenu: closeSettingsMenu,
    } = useMenu();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const buttonText = issueId ? 'Save' : 'Create';
    const method = issueId ? 'PATCH' : 'POST';
    const action = issueId
        ? `/organization/${organizationId}/project/${projectId}/issue/${issueId}`
        : `/organization/${organizationId}/project/${projectId}/issue`;
    const successMessage = issueId
        ? 'Issue updated successfully'
        : 'Issue created successfully';

    const handlers = useForm(
        useMemo(
            () => ({
                name: { required: true, value: name },
            }),
            [name]
        ),
        { Input: TextField }
    );
    const setValues = handlers.setValues;

    useEffect(() => {
        setText(description);
        setValues({ name: name });
        setSelectOption({
            status: status || 'Backlog',
            priority: priority || 'Medium',
            issueType: issueType || 'Task',
            assignee: 'Gaurav Gupta',
            reporter: 'Gaurav Gupta',
        });
    }, [
        description,
        setValues,
        name,
        status,
        priority,
        issueType,
        assignee,
        reporter,
    ]);

    const onSubmit = res => {
        const { success, message } = res.data;
        if (!success) return showError(message);
        closeModal();
        fetchIssues();
        showSuccess(successMessage);
    };

    const handleDeleteClick = () => {
        setConfirmDeleteDialogOpen(true);
    };

    const handleConfirmDelete = useCallback(
        async function () {
            setDeleteLoading(true);
            try {
                const response = await axios.delete(
                    `/organization/${organizationId}/project/${projectId}/issue/${issueId}`
                );

                const { success, message } = response.data;

                if (!success) return showError(message);

                showSuccess('Issue deleted successfully');
                // Close the confirmation dialog
                setConfirmDeleteDialogOpen(false);
                setDeleteLoading(false);
                fetchIssues();
                closeModal();
            } catch (e) {
                console.log(e);
            }
        },
        [
            issueId,
            showSuccess,
            showError,
            closeModal,
            fetchIssues,
            organizationId,
            projectId,
        ]
    );

    const handleCancelDelete = () => {
        setConfirmDeleteDialogOpen(false);
    };

    // const uploadFile = async formData => {
    //     try {
    //         const response = await universal.post(
    //             `${env('FILES_SERVER')}/file/private/projects/${organizationId}`,
    //             formData
    //         );

    //         const { success, errors, uploaded } = response.data;
    //         if (!success) return showError(errors);

    //         return uploaded;
    //     } catch (e) {
    //         handleAxiosError(e, showError);
    //     }
    // };

    // const handleImage = () => {
    //     const input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();

    //     input.onchange = async () => {
    //         const file = input.files[0];
    //         if (!file) return;

    //         const formData = new FormData();
    //         formData.append('files', file);

    //         // const url = await uploadFile(formData);

    //         const url = URL.createObjectURL(file);
    //         const image = Quill.import('formats/image');
    //         image.sanitize = url => url;

    //         console.log({ url });

    //         if (!quillRef.current) return;
    //         const quill = quillRef.current;
    //         const editor = quill.getEditor();
    //         const range = editor.getSelection(true);
    //         editor.insertEmbed(range.index, 'image', url);
    //     };
    // };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image'],
                    ['clean'],
                ],
            },
        }),
        []
    );

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    const handleChange = value => {
        setText(value);
    };

    const handleChangeComments = value => {
        setComment(value);
    };

    const handleChangeOption = e => {
        const name = e.target.name;
        const value = e.target.value;
        setSelectOption({ ...selectOption, [name]: value });
    };

    const handleChangeAssign = e => {
        setAssignSelect(true);
        const name = e.target.name;
        const value = e.target.value;
        setSelectOption({ ...selectOption, [name]: value });
    };
    const handleChangePriority = e => {
        setPrioritySelect(true);
        const name = e.target.name;
        const value = e.target.value;
        setSelectOption({ ...selectOption, [name]: value });
    };
    const handleChangeReporter = e => {
        setReporterSelect(true);
        const name = e.target.name;
        const value = e.target.value;
        setSelectOption({ ...selectOption, [name]: value });
    };
    const handleChangeIssueType = e => {
        setIssueTypeSelect(true);
        const name = e.target.name;
        const value = e.target.value;
        setSelectOption({ ...selectOption, [name]: value });
    };

    // const EditComment = (value) => {
    //     setCommentEdit(value);
    // };

    // const handleChangeQuillEditCancel = (e) => {
    //     setCommentEditState(false);
    // };

    const handleChangeQuillCancel = () => {
        setShowDescription(false);
    };
    const handleChangeQuillSave = () => {
        setShowDescription(false);
        setText(text);
    };

    const handleChangeCancel = () => {
        setShowTitle(false);
    };
    const handleChangeSave = () => {
        setShowTitle(false);
    };

    const commentSave = useCallback(
        async function () {
            setCommentLoading(true);
            try {
                const response = await axios.post(
                    `/organization/${organizationId}/project/${projectId}/issue/info/${issueId}/comment`,
                    {
                        description: comment,
                    }
                );
                const { success, error } = response.data;

                if (!success) return showError(error);
                setCommentLoading(false);
                showSuccess('Comment Add successfully');
                setCommentState(false);
                setComment('');
                fetchComments(issueId);
            } catch (e) {
                console.log(e);
            }
        },
        [
            organizationId,
            projectId,
            showSuccess,
            showError,
            issueId,
            comment,
            fetchComments,
        ]
    );

    // activity
    const issueActivity = useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/activity?issue=${issueId}`
                );
                const { success, error, activities } = response.data;

                if (!success) return showError(error);
                setActivities(activities);
            } catch (e) {
                console.log(e);
            }
        },
        [organizationId, issueId, setActivities, showError]
    );
    // time

    const currentTime = new Date();
    const issueTime = new Date(createdAt);
    const differenceInMilliseconds = currentTime - issueTime;
    const formattedTimeAgo = formatTimeAgo(differenceInMilliseconds);

    const handleKeyPress = useCallback(event => {
        // Check if the pressed key is 'm' and if there are no active text fields
        if (
            event.key === 'm' ||
            (event.key === 'M' && document.activeElement.tagName !== 'INPUT')
        ) {
            // Perform the desired action (e.g., show comments)
            setCommentState(true);
            quillRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        // Add event listener when the component mounts
        window.addEventListener('keydown', handleKeyPress);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <>
            <Card
                sx={{
                    position: 'relative',
                    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                    borderRadius: '8px',
                    maxWidth: '1250px',
                    border: 2,
                    borderColor: 'rgba(255, 255, 255, 0.07)',
                    width: '100%',
                    p: 2,
                    mx: 2,
                    height: { xs: '85vh', xl: '70vh' },
                    // maxHeight: '75vh',
                    overflowY: 'auto',
                    // overflowX: 'hidden',
                    // '::-webkit-scrollbar': { display: 'none' },
                    pb: 2,
                }}>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={1}>
                    {/* issuestype */}
                    <Box display='flex' alignItems='center'>
                        <Image
                            name={issueType ? IssueType[issueType] : 'Task.png'}
                            sx={{ width: 16, height: 16 }}
                        />

                        <Typography
                            variant='body2'
                            fontWeight={500}
                            sx={{ ml: 1 }}
                            color='text.secondary'>
                            {keyId}
                        </Typography>
                    </Box>
                    {/* Header right menu */}

                    <Box>
                        <IconButton
                            disableFocusRipple
                            disableTouchRipple
                            disableRipple
                            onClick={handleClickOpen}>
                            <ShareIcon fontSize='small' />
                        </IconButton>
                        <IconButton
                            disableFocusRipple
                            disableTouchRipple
                            disableRipple
                            onClick={openSettingsMenu}>
                            <MoreHorizIcon sx={{ mx: 0.3 }} fontSize='small' />
                        </IconButton>
                        <IconButton
                            onClick={closeModal}
                            disableFocusRipple
                            disableTouchRipple
                            disableRipple>
                            <CloseIcon fontSize='small' />
                        </IconButton>
                    </Box>
                </Stack>
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
                    onClose={closeSettingsMenu}>
                    <MenuItem
                        onClick={() => {
                            handleDeleteClick();
                        }}>
                        Delete
                    </MenuItem>
                </Menu>
                {/* form */}
                <Form
                    handlers={handlers}
                    onSubmit={onSubmit}
                    action={action}
                    method={method}
                    onError={e => handleAxiosError(e, showError)}
                    final={values => ({
                        ...values,
                        description: text,
                        projectId: projectId,
                        labels: labelsList,
                        id: issueId,
                        ...selectOption,
                        assignee: selectOption.assignee
                            ? selectOption.assignee
                            : null,
                    })}>
                    <Grid container spacing={3}>
                        <Grid item lg={8} xs={12}>
                            <Box
                                sx={{
                                    p: 2,
                                    maxHeight: { xs: '60vh', xl: '50vh' },
                                    overflowY: 'auto',
                                    overflowX: 'auto',
                                }}>
                                <Box sx={{ mb: 1 }}>
                                    {showTitle ? (
                                        <>
                                            <Input
                                                name='name'
                                                size='small'
                                                fullWidth
                                                placeholder='Enter Title'
                                                multiline
                                                // maxRows={4}
                                                id='margin-none'
                                                margin='none'
                                                sx={{
                                                    m: 0,
                                                    mb: 0,

                                                    ' & .MuiFormControl-root .MuiTextField-root':
                                                        {
                                                            mb: 0,
                                                        },
                                                }}
                                                // variant='borderNone'
                                            />
                                            <Box
                                                display='flex'
                                                justifyContent='end'
                                                mb={0}
                                                pb={0}>
                                                <IconButton
                                                    sx={{
                                                        mt: 0,
                                                        width: 25,
                                                        height: 25,
                                                        backgroundColor:
                                                            'background.default',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        borderRadius: '4px',
                                                        mr: 0.3,
                                                    }}>
                                                    <CheckIcon
                                                        fontSize='small'
                                                        onClick={
                                                            handleChangeSave
                                                        }
                                                    />
                                                </IconButton>

                                                <IconButton
                                                    sx={{
                                                        width: 25,
                                                        height: 25,
                                                        backgroundColor:
                                                            'background.default',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        borderRadius: '4px',
                                                    }}>
                                                    <CloseIcon
                                                        onClick={
                                                            handleChangeCancel
                                                        }
                                                    />
                                                </IconButton>
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography
                                            onClick={() => setShowTitle(true)}
                                            sx={{
                                                maxWidth: '100%',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                py: 1,
                                                pl: 0.8,
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'white.light',
                                                },
                                            }}
                                            color='text.tertiary'
                                            variant='h6'>
                                            {handlers.values.name
                                                ? handlers.values.name
                                                : 'Add a Title...'}
                                        </Typography>
                                    )}
                                </Box>
                                {/* button left  for v2*/}
                                {/* <Box
                                    sx={{
                                        display: { md: 'flex', xs: 'block' },
                                    }}
                                    mb={2}
                                >
                                    <Button
                                        startIcon={
                                            <AttachmentIcon fontSize='small' />
                                        }
                                        variant='outlined'
                                        size='small'
                                        sx={{ fontSize: '11px' }}
                                    >
                                        Attach
                                    </Button>
                                    <Button
                                        startIcon={<LanIcon fontSize='small' />}
                                        variant='outlined'
                                        size='small'
                                        sx={{ fontSize: '11px', mx: 1 }}
                                    >
                                        Add a child issues
                                    </Button>
                                    <Button
                                        startIcon={
                                            <JoinInnerIcon fontSize='small' />
                                        }
                                        variant='outlined'
                                        size='small'
                                        sx={{ fontSize: '11px' }}
                                    >
                                        Link issues
                                    </Button>
                                </Box> */}
                                {/* description */}
                                <Box mt={1}>
                                    <Typography
                                        variant='caption'
                                        color='text.tertiary'
                                        sx={{ pl: 0.8 }}>
                                        Description
                                    </Typography>
                                    <Box mt={1} width='100%'>
                                        {showDescription ? (
                                            <>
                                                <ReactQuill
                                                    theme='snow'
                                                    value={text}
                                                    modules={modules}
                                                    formats={formats}
                                                    onChange={handleChange}
                                                    ref={quillRef}
                                                    className='.richtextWrap'
                                                />
                                                <Box mt={1}>
                                                    <Button
                                                        variant='contained'
                                                        size='small'
                                                        onClick={
                                                            handleChangeQuillSave
                                                        }>
                                                        {' '}
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant='outlined'
                                                        size='small'
                                                        sx={{ ml: 1 }}
                                                        onClick={
                                                            handleChangeQuillCancel
                                                        }>
                                                        {' '}
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </>
                                        ) : (
                                            <Box sx={{ width: '100%' }}>
                                                <Typography
                                                    onClick={() =>
                                                        setShowDescription(true)
                                                    }
                                                    color='text.tertiary'
                                                    sx={{
                                                        width: '100%',
                                                        fontSize: '14px',
                                                        py: 1,
                                                        pl: 0.8,
                                                        borderRadius: '4px',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                'white.light',
                                                        },
                                                    }}>
                                                    {text ? (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: escapeDanger(
                                                                    text.replace(
                                                                        /<img/g,
                                                                        '<img style="width: 100%; max-width: 400px; height: auto; display:block; padding:5px"'
                                                                    )
                                                                ),
                                                            }}></div>
                                                    ) : (
                                                        'Add a description...'
                                                    )}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                {/* comments section */}
                                <Box mt={10}>
                                    <Comments
                                        activities={activities}
                                        fetchComments={fetchComments}
                                        issueActivity={issueActivity}
                                        members={members}
                                        comments={comments}
                                        issueId={issueId}
                                        organizationId={organizationId}
                                        projectId={projectId}
                                        formats={formats}
                                        modules={modules}
                                        quillRef={quillRef}
                                    />
                                </Box>
                            </Box>

                            <Box
                                display='flex'
                                alignItems='start'
                                ml={2}
                                mt={1}
                                mb={2}>
                                <Avatar
                                    sx={{
                                        height: 30,
                                        width: 30,
                                        mr: 2,
                                        mt: 3,
                                    }}
                                />
                                {commentState ? (
                                    <Box width={'100%'}>
                                        <ReactQuill
                                            value={comment}
                                            modules={modules}
                                            formats={formats}
                                            onChange={handleChangeComments}
                                            className='.richtextWrap'
                                        />
                                        <Box mt={1}>
                                            <Button
                                                variant='contained'
                                                size='small'
                                                onClick={commentSave}
                                                disabled={commentLoading}
                                                endIcon={
                                                    commentLoading && (
                                                        <CircularProgress
                                                            size='20px'
                                                            sx={{
                                                                color: 'inherit',
                                                            }}
                                                        />
                                                    )
                                                }>
                                                {' '}
                                                Save
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                size='small'
                                                sx={{ ml: 1 }}
                                                onClick={() =>
                                                    setCommentState(false)
                                                }>
                                                {' '}
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        flexBasis='100%'>
                                        <TextField
                                            sx={{ mt: 2 }}
                                            fullWidth
                                            size='small'
                                            placeholder='Add a comments'
                                            onClick={() =>
                                                setCommentState(true)
                                            }
                                        />
                                        <Typography
                                            color='text.tertiary'
                                            variant='caption'>
                                            Pro tip: press
                                            <Typography
                                                variant='caption'
                                                color='text.tertiary'
                                                sx={{
                                                    px: 0.8,
                                                    py: 0.4,
                                                    mx: 0.5,

                                                    backgroundColor:
                                                        'white.light',
                                                    color: 'text.tertiary',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'white.light',
                                                        color: 'text.tertiary',
                                                    },
                                                }}>
                                                M
                                            </Typography>
                                            to comment
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <Box mb={1}>
                                    <Box mt={1}>
                                        <FormControl
                                            size='small'
                                            sx={{ minWidth: 120 }}>
                                            <Select
                                                size='small'
                                                sx={{
                                                    '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input':
                                                        {
                                                            pl: 1.5,
                                                            py: 0.8,
                                                        },
                                                    fontSize: '14px',
                                                    color: '#fff',
                                                    backgroundColor:
                                                        'primary.main',
                                                }}
                                                value={selectOption.status}
                                                name='status'
                                                onChange={handleChangeOption}>
                                                <MenuItem value='Backlog'>
                                                    Backlog
                                                </MenuItem>
                                                <MenuItem value='To Do'>
                                                    To Do
                                                </MenuItem>
                                                <MenuItem value='In Progress'>
                                                    In Progress
                                                </MenuItem>
                                                <MenuItem value='Review'>
                                                    Review
                                                </MenuItem>
                                                <MenuItem value='Done'>
                                                    Done
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        border: 1,
                                        borderColor:
                                            'rgba(255, 255, 255, 0.07)',
                                    }}>
                                    <Box p={1}>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                            fontWeight={500}>
                                            Details
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box p={2}>
                                        <Grid
                                            container
                                            spacing={2}
                                            display='flex'
                                            alignItems='center'>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    fontWeight={500}>
                                                    Assignee
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {assignSelect ? (
                                                    <Typography
                                                        variant='body2'
                                                        color='text.tertiary'
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            p: 0.5,
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    'white.light',
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            setAssignSelect(
                                                                false
                                                            )
                                                        }>
                                                        <Avatar
                                                            sx={{
                                                                height: 30,
                                                                width: 30,
                                                                mr: 1,
                                                            }}
                                                        />
                                                        Gaurav Gupta
                                                    </Typography>
                                                ) : (
                                                    <FormControl
                                                        size='small'
                                                        fullWidth>
                                                        <Select
                                                            size='small'
                                                            displayEmpty
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                            }}
                                                            name='assignee'
                                                            value={
                                                                selectOption.assignee
                                                            }
                                                            MenuProps={{
                                                                style: {
                                                                    maxHeight: 200,
                                                                },
                                                            }}
                                                            onChange={
                                                                handleChangeAssign
                                                            }
                                                            renderValue={v => {
                                                                if (
                                                                    v.length ===
                                                                    0
                                                                ) {
                                                                    return (
                                                                        <Box
                                                                            display='flex'
                                                                            alignItems='center'
                                                                            p={
                                                                                0
                                                                            }>
                                                                            <Avatar
                                                                                sx={{
                                                                                    height: 25,
                                                                                    width: 25,
                                                                                    mr: 1,
                                                                                }}
                                                                            />
                                                                            <em>
                                                                                Unassigned
                                                                            </em>
                                                                        </Box>
                                                                    );
                                                                }

                                                                return v ? (
                                                                    <Box
                                                                        display='flex'
                                                                        alignItems='center'
                                                                        p={0}>
                                                                        <Avatar
                                                                            sx={{
                                                                                height: 25,
                                                                                width: 25,
                                                                                mr: 1,
                                                                            }}
                                                                        />
                                                                        {
                                                                            members[
                                                                                v
                                                                            ]
                                                                                ?.fullName
                                                                        }
                                                                    </Box>
                                                                ) : (
                                                                    ''
                                                                );
                                                            }}>
                                                            <MenuItem value=''>
                                                                <ListItemAvatar
                                                                    sx={{
                                                                        minWidth:
                                                                            '45px',
                                                                    }}>
                                                                    <Avatar
                                                                        sx={{
                                                                            height: 30,
                                                                            width: 30,
                                                                            mr: 1,
                                                                        }}
                                                                    />
                                                                </ListItemAvatar>
                                                                <em>
                                                                    Unassigned
                                                                </em>
                                                            </MenuItem>
                                                            {Object.keys(
                                                                members
                                                            ).map(member => (
                                                                <MenuItem
                                                                    value={
                                                                        member
                                                                    }>
                                                                    <ListItemAvatar
                                                                        sx={{
                                                                            minWidth:
                                                                                '45px',
                                                                        }}>
                                                                        <Avatar
                                                                            sx={{
                                                                                height: 30,
                                                                                width: 30,
                                                                                mr: 1,
                                                                            }}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    {
                                                                        members[
                                                                            member
                                                                        ]
                                                                            ?.fullName
                                                                    }
                                                                </MenuItem>
                                                            ))}
                                                            {memberTotalPage >
                                                                1 && (
                                                                <Box
                                                                    display='flex'
                                                                    alignItems='center'
                                                                    justifyContent='center'
                                                                    mt={1}>
                                                                    <Button
                                                                        fullWidth
                                                                        size='small'
                                                                        variant='text'
                                                                        sx={{
                                                                            fontSize:
                                                                                '11px',
                                                                        }}
                                                                        startIcon={
                                                                            <KeyboardArrowDownIcon />
                                                                        }
                                                                        onClick={setPageNo(
                                                                            memberCurrentPage +
                                                                                1
                                                                        )}
                                                                        disabled={
                                                                            memberCurrentPage ===
                                                                            memberTotalPage
                                                                        }>
                                                                        Show
                                                                        More
                                                                    </Button>
                                                                    <Button
                                                                        fullWidth
                                                                        size='small'
                                                                        sx={{
                                                                            fontSize:
                                                                                '11px',
                                                                        }}
                                                                        startIcon={
                                                                            <KeyboardArrowUpIcon fontSize='small' />
                                                                        }
                                                                        onClick={setPageNo(
                                                                            memberCurrentPage -
                                                                                1
                                                                        )}
                                                                        disabled={
                                                                            memberCurrentPage ===
                                                                            1
                                                                        }>
                                                                        Show
                                                                        Less
                                                                    </Button>
                                                                </Box>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    fontWeight={500}>
                                                    Priority
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {prioritySelect ? (
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            p: 0.5,
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    'white.light',
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            setPrioritySelect(
                                                                false
                                                            )
                                                        }>
                                                        <Box mt={0.5}>
                                                            <Image
                                                                name={
                                                                    Priority[
                                                                        selectOption
                                                                            .priority
                                                                    ]
                                                                }
                                                                sx={{
                                                                    width: 16,
                                                                    height: 16,
                                                                }}
                                                            />
                                                        </Box>

                                                        <Typography
                                                            variant='body2'
                                                            color='text.tertiary'
                                                            sx={{ ml: 1 }}>
                                                            {selectOption.priority
                                                                ? selectOption.priority
                                                                : 'None'}
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <FormControl
                                                        size='small'
                                                        fullWidth>
                                                        <Select
                                                            size='small'
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                            }}
                                                            value={
                                                                selectOption.priority
                                                            }
                                                            name='priority'
                                                            onChange={
                                                                handleChangePriority
                                                            }
                                                            renderValue={selected => (
                                                                <Box
                                                                    display='flex'
                                                                    alignItems='center'>
                                                                    <Image
                                                                        name={
                                                                            Priority[
                                                                                selectOption
                                                                                    .priority
                                                                            ]
                                                                        }
                                                                        sx={{
                                                                            width: 16,
                                                                            height: 16,
                                                                            mr: 1,
                                                                        }}
                                                                    />

                                                                    {selected}
                                                                </Box>
                                                            )}>
                                                            <MenuItem value='Lowest'>
                                                                <Image
                                                                    name='lowest.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                Lowest
                                                            </MenuItem>
                                                            <MenuItem value='Low'>
                                                                <Image
                                                                    name='low.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                Low
                                                            </MenuItem>
                                                            <MenuItem value='Medium'>
                                                                <Image
                                                                    name='medium.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                Medium
                                                            </MenuItem>
                                                            <MenuItem value='High'>
                                                                <Image
                                                                    name='high.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                High
                                                            </MenuItem>
                                                            <MenuItem value='Highest'>
                                                                <Image
                                                                    name='highest.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                Highest
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    fontWeight={500}>
                                                    Reporter
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {reporterSelect ? (
                                                    <Typography
                                                        variant='body2'
                                                        color='text.tertiary'
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            p: 0.5,
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    'white.light',
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            setReporterSelect(
                                                                false
                                                            )
                                                        }>
                                                        <Avatar
                                                            sx={{
                                                                height: 30,
                                                                width: 30,
                                                                mr: 1,
                                                            }}
                                                            src={`https://api.files.clikkle.com/open/file/preview/${
                                                                members[
                                                                    selectOption
                                                                        .reporter
                                                                ]?.photo
                                                            }`}
                                                        />
                                                        Gaurav Gupta
                                                    </Typography>
                                                ) : (
                                                    <FormControl
                                                        size='small'
                                                        fullWidth>
                                                        <Select
                                                            size='small'
                                                            displayEmpty
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                            }}
                                                            name='reporter'
                                                            value={
                                                                selectOption.reporter
                                                            }
                                                            onChange={
                                                                handleChangeReporter
                                                            }
                                                            MenuProps={{
                                                                style: {
                                                                    maxHeight: 200,
                                                                },
                                                            }}
                                                            renderValue={selected => {
                                                                const selectedOption =
                                                                    members[
                                                                        selected
                                                                    ]?.fullName;
                                                                return selectedOption ? (
                                                                    <Box
                                                                        display='flex'
                                                                        alignItems='center'
                                                                        p={0}>
                                                                        <Avatar
                                                                            sx={{
                                                                                height: 25,
                                                                                width: 25,
                                                                                mr: 1,
                                                                            }}
                                                                            src={`https://api.files.clikkle.com/open/file/preview/${members[selected]?.photo}`}
                                                                        />
                                                                        {
                                                                            selectedOption
                                                                        }
                                                                    </Box>
                                                                ) : (
                                                                    ''
                                                                );
                                                            }}>
                                                            {Object.keys(
                                                                members
                                                            )?.map(member => (
                                                                <MenuItem
                                                                    value={
                                                                        member
                                                                    }>
                                                                    <ListItemAvatar
                                                                        sx={{
                                                                            minWidth:
                                                                                '45px',
                                                                        }}>
                                                                        <Avatar
                                                                            sx={{
                                                                                height: 30,
                                                                                width: 30,
                                                                                mr: 1,
                                                                            }}
                                                                            src={`https://api.files.clikkle.com/open/file/preview/${members[member]?.photo}`}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    {
                                                                        members[
                                                                            member
                                                                        ]
                                                                            ?.fullName
                                                                    }
                                                                </MenuItem>
                                                            ))}
                                                            {memberTotalPage >
                                                                1 && (
                                                                <Box
                                                                    display='flex'
                                                                    alignItems='center'
                                                                    justifyContent='center'
                                                                    mt={1}>
                                                                    <Button
                                                                        fullWidth
                                                                        size='small'
                                                                        variant='text'
                                                                        sx={{
                                                                            fontSize:
                                                                                '11px',
                                                                        }}
                                                                        startIcon={
                                                                            <KeyboardArrowDownIcon />
                                                                        }
                                                                        onClick={setPageNo(
                                                                            memberCurrentPage +
                                                                                1
                                                                        )}
                                                                        disabled={
                                                                            memberCurrentPage ===
                                                                            memberTotalPage
                                                                        }>
                                                                        Show
                                                                        More
                                                                    </Button>
                                                                    <Button
                                                                        fullWidth
                                                                        size='small'
                                                                        sx={{
                                                                            fontSize:
                                                                                '11px',
                                                                        }}
                                                                        startIcon={
                                                                            <KeyboardArrowUpIcon fontSize='small' />
                                                                        }
                                                                        onClick={setPageNo(
                                                                            memberCurrentPage -
                                                                                1
                                                                        )}
                                                                        disabled={
                                                                            memberCurrentPage ===
                                                                            1
                                                                        }>
                                                                        Show
                                                                        Less
                                                                    </Button>
                                                                </Box>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    fontWeight={500}>
                                                    Issue Type
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {issueTypeSelect ? (
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            p: 0.5,
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    'white.light',
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            setIssueTypeSelect(
                                                                false
                                                            )
                                                        }>
                                                        <Image
                                                            name={
                                                                IssueType[
                                                                    selectOption
                                                                        .issueType
                                                                ]
                                                            }
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                mr: 1,
                                                            }}
                                                        />

                                                        <Typography
                                                            variant='body2'
                                                            color='text.tertiary'
                                                            sx={{ ml: 1 }}>
                                                            {selectOption.issueType
                                                                ? selectOption.issueType
                                                                : 'None'}
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <FormControl
                                                        size='small'
                                                        fullWidth>
                                                        <Select
                                                            size='small'
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                            }}
                                                            value={
                                                                selectOption.issueType
                                                            }
                                                            name='issueType'
                                                            renderValue={selected => (
                                                                <Box
                                                                    display='flex'
                                                                    alignItems='center'>
                                                                    <Image
                                                                        name={
                                                                            IssueType[
                                                                                selectOption
                                                                                    .issueType
                                                                            ]
                                                                        }
                                                                        sx={{
                                                                            width: 16,
                                                                            height: 16,
                                                                            mr: 1,
                                                                        }}
                                                                    />

                                                                    {selected}
                                                                </Box>
                                                            )}
                                                            onChange={
                                                                handleChangeIssueType
                                                            }>
                                                            <MenuItem
                                                                value='Task'
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                }}>
                                                                <Image
                                                                    name='Task.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                Task
                                                            </MenuItem>
                                                            <MenuItem value='Bug'>
                                                                <Image
                                                                    name='bug.png'
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                Bug
                                                            </MenuItem>
                                                            <MenuItem value='Subtask'>
                                                                <Image
                                                                    name='subTask.png'
                                                                    sx={{
                                                                        width: 16,

                                                                        height: 16,
                                                                        mr: 1,
                                                                    }}
                                                                />
                                                                SubTask
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Grid>
                                            {/* label */}
                                            <Label
                                                setLabelsList={setLabelsList}
                                                labels={labels}
                                            />
                                        </Grid>

                                        {/* {projectId && ( */}
                                    </Box>
                                </Box>
                                {/* created at */}
                                <Box mt={2}>
                                    <Typography
                                        variant='body2'
                                        fontWeight='bold'
                                        color='text.secondary'>
                                        Created at : {formattedTimeAgo}
                                    </Typography>
                                </Box>
                                {/* )} */}
                            </Box>
                            <Box textAlign='right' sx={{ mt: 2 }}>
                                <Button
                                    type='submit'
                                    variant='outlined'
                                    onClick={closeModal}
                                    size='small'
                                    sx={{
                                        mx: 1,
                                    }}>
                                    Cancel
                                </Button>
                                <Submit>
                                    {loader => (
                                        <Button
                                            type='submit'
                                            size='small'
                                            variant='contained'
                                            disabled={loader}
                                            endIcon={loader}>
                                            {buttonText}
                                        </Button>
                                    )}
                                </Submit>
                            </Box>
                        </Grid>
                    </Grid>
                </Form>
            </Card>

            <Dialog
                open={confirmDeleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to delete the Task
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancelDelete}
                        color='primary'
                        style={{ color: 'white' }}>
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
                        autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <CopyIssueLink handleClose={handleClose} />
            </Dialog>
        </>
    );
};

export default CreateIssues;
