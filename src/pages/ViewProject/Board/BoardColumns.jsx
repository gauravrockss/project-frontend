import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    IconButton,
    Modal,
    Skeleton,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import CreateIssues from '../CreateIssues';
import AddIcon from '@mui/icons-material/Add';
import Image from '../../../components/Image';
import { Draggable } from 'react-beautiful-dnd';
import { IssueType, Priority } from '../../../services/stickerColor';
import { useSearchParams } from 'react-router-dom';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Form, Submit, useForm } from '../../../hooks/useForm';
import { Input } from '../../../hooks/useForm/inputs';
import { useMessage } from '../../../components/Header';
import { useOrganizationId } from '../../../hooks/Authorize';
import { handleAxiosError } from '../../../utilities/function';

const BoardColumns = props => {
    const {
        fetchIssues,
        ProjectId,
        title,
        members,
        issues,
        openIssueModal,
        fetchMoreIssue,
        totalIssueList,
        users,
        loadMoreLoading,
        currentPage,
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const [projectState, setprojectState] = useState(false);
    const [createIssueState, setCreateIssueState] = useState(false);
    const [issueId, setIssueId] = useState(null);

    const organizationId = useOrganizationId();
    // const user = useUser();
    // const [deafultStatus, setDeafultStatus] = useState(null);
    const issueState = Boolean(searchParams.get('issues'));

    // const openProject = (t) => {
    //     setprojectState(true);
    //     setDeafultStatus(t);
    // };
    const { showError, showSuccess } = useMessage();
    const handlers = useForm(
        useMemo(
            () => ({
                name: { required: true, value: '' },
            }),
            []
        ),
        { Input: TextField }
    );
    const closeProject = () => setprojectState(false);

    const onSubmit = res => {
        const { success, message, error } = res.data;
        if (!success) return showError(error);

        fetchIssues();
        showSuccess(message);
        setCreateIssueState(false);
    };

    return (
        <Box height='100%'>
            <Card
                elevation={0}
                sx={{
                    bgcolor: 'background.default',
                    boxShadow: 'none',
                    borderRadius: '6px',
                    backgroundImage:
                        'linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))',
                    height: '100%',
                    '&:hover': {
                        '#button': {
                            opacity: 1,
                        },
                    },
                }}>
                <Box
                    p={1.2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography
                        variant='caption'
                        sx={{
                            backgroundColor:
                                title === 'Done'
                                    ? 'lightGreen.light'
                                    : 'skyBlue.light',
                            fontWeight: 600,
                            color:
                                title === 'Done'
                                    ? 'lightGreen.dark'
                                    : 'skyBlue.dark',
                            px: 1,
                            py: 0.4,
                        }}>
                        {title}
                    </Typography>

                    <Typography
                        variant='caption'
                        sx={{
                            backgroundColor:
                                title === 'Done'
                                    ? 'lightGreen.light'
                                    : 'skyBlue.light',
                            color:
                                title === 'Done'
                                    ? 'lightGreen.dark'
                                    : 'skyBlue.dark',
                            fontWeight: 600,
                            px: 1,
                            py: 0.4,
                        }}>
                        {totalIssueList?.find(issue => issue._id === title)
                            ?.total
                            ? totalIssueList?.find(issue => issue._id === title)
                                  ?.total
                            : 0}
                    </Typography>
                </Box>

                <Box
                // sx={{
                //     overflowY: 'auto',
                //     maxHeight: '100dvh',
                //     height: '100%',
                //     '::-webkit-scrollbar': {
                //         width: '3px',
                //         //     backgroundColor: 'transparent',
                //     },
                // }}
                >
                    {issues
                        ? issues?.map((issue, i) => (
                              <Draggable
                                  key={i}
                                  draggableId={issue._id}
                                  index={i}>
                                  {provided => (
                                      <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}>
                                          <IssueCard
                                              issue={issue}
                                              setprojectState={setprojectState}
                                              setTaskId={setIssueId}
                                              fetchIssues={fetchIssues}
                                              taskId={issueId}
                                              members={members}
                                              issueState={issueState}
                                              setSearchParams={setSearchParams}
                                              searchParams={searchParams}
                                              openIssueModal={openIssueModal}
                                          />
                                      </div>
                                  )}
                              </Draggable>
                          ))
                        : Array(5)
                              .fill(5)
                              .map((_, i) => (
                                  <Card
                                      key={i}
                                      sx={{
                                          cursor: 'pointer',
                                          border: '1px solid',
                                          borderColor: 'transparent',
                                          backgroundImage: 'none',
                                          borderRadius: '6px',
                                          m: '5px',
                                          '&:hover': {
                                              background:
                                                  'rgba(255, 255, 255, 0.01)',
                                          },
                                      }}>
                                      <Box px={1} py={1}>
                                          <Box>
                                              <Skeleton width='100%' />{' '}
                                              <Skeleton width='90%' />
                                          </Box>
                                          <Box
                                              pt={2}
                                              display='flex'
                                              alignItems='center'
                                              justifyContent='space-between'>
                                              <Box
                                                  display='flex'
                                                  alignItems='center'>
                                                  <Skeleton
                                                      variant='circular'
                                                      width={20}
                                                      height={20}
                                                      sx={{
                                                          mr: 1,
                                                      }}
                                                  />
                                              </Box>
                                              <Box
                                                  display='flex'
                                                  alignItems='center'>
                                                  <Skeleton
                                                      variant='circular'
                                                      width={20}
                                                      height={20}
                                                      sx={{
                                                          mr: 1,
                                                      }}
                                                  />

                                                  <Box>
                                                      <Skeleton
                                                          variant='circular'
                                                          width={20}
                                                          height={20}
                                                      />
                                                  </Box>
                                              </Box>
                                          </Box>
                                      </Box>
                                  </Card>
                              ))}
                    {issues?.length >= 20 && (
                        <Button
                            id='button'
                            size='small'
                            disabled={
                                loadMoreLoading ||
                                issues?.length ===
                                    totalIssueList?.find(
                                        issue => issue._id === title
                                    ).total
                            }
                            endIcon={
                                loadMoreLoading ? (
                                    <CircularProgress
                                        size='20px'
                                        sx={{ color: 'inherit' }}
                                    />
                                ) : (
                                    <ExpandCircleDownOutlinedIcon fontSize='small' />
                                )
                            }
                            onClick={() =>
                                fetchMoreIssue(title, currentPage || 1)
                            }
                            fullWidth
                            sx={{ my: 0.3, opacity: 1 }}>
                            Load more
                        </Button>
                    )}
                    <Form
                        handlers={handlers}
                        onSubmit={onSubmit}
                        action={`/organization/${organizationId}/project/${ProjectId}/issue`}
                        method={'post'}
                        onError={e => handleAxiosError(e, showError)}
                        final={values => ({
                            ...values,
                            status: title,
                            priority: 'Medium',
                            issueType: 'Task',
                            assignee: null,
                            reporter: 'Gaurav Gupta',
                        })}>
                        {createIssueState ? (
                            <Box
                                sx={{
                                    padding: '0px 2px 1.5px 2px',
                                    margin: 0,
                                }}>
                                <Input
                                    name='name'
                                    placeholder='Enter title..'
                                    multiline
                                    maxRows={4}
                                    id='margin-none'
                                    margin='none'
                                    fullWidth
                                />
                                <Box display='flex' justifyContent='end' mt={0}>
                                    <Submit>
                                        {loader =>
                                            !loader ? (
                                                <IconButton
                                                    type='submit'
                                                    // disabled={loader}
                                                    // endIcon={loader}
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
                                                        // onClick={handleChangeSave}
                                                    />
                                                </IconButton>
                                            ) : (
                                                <CircularProgress
                                                    size='20px'
                                                    sx={{
                                                        borderRadius: '4px',
                                                        mr: 1,
                                                    }}
                                                />
                                            )
                                        }
                                    </Submit>

                                    <IconButton
                                        onClick={() =>
                                            setCreateIssueState(false)
                                        }
                                        sx={{
                                            width: 25,
                                            height: 25,
                                            backgroundColor:
                                                'background.default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '4px',
                                        }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ) : (
                            <Button
                                id='button'
                                startIcon={<AddIcon fontSize='small' />}
                                size='small'
                                // onClick={() => openProject(title)}
                                onClick={() => setCreateIssueState(true)}
                                fullWidth
                                sx={{ my: 0.3, opacity: 0 }}>
                                Create issues
                            </Button>
                        )}
                        {/*  */}
                    </Form>
                </Box>
            </Card>

            <Modal
                sx={{
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={projectState}
                onClose={closeProject}>
                <>
                    <CreateIssues
                        taskId={issueId}
                        projectId={ProjectId}
                        closeModal={closeProject}
                        fetchIssues={fetchIssues}
                        users={users}
                    />
                </>
            </Modal>
        </Box>
    );
};

export default BoardColumns;

const IssueCard = ({ issue, members, openIssueModal }) => {
    const { _id, priority, assignee, issueType, name } = issue;

    return (
        <>
            <Box
                sx={{
                    padding: '0px 2px 1.5px 2px',
                    margin: 0,
                }}>
                <Card
                    onClick={() => openIssueModal(_id)}
                    sx={{
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: 'transparent',
                        backgroundImage: 'none',
                        boxShadow:
                            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                        m: 0.3,
                        borderRadius: '6px',

                        // minHeight: '110px',
                        '&:hover': {
                            backgroundColor: 'custom.cardHover',
                        },
                    }}>
                    <Box px={1} py={1}>
                        <Box
                            sx={{
                                maxWidth: '100%',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                            <Typography variant='caption' color='text.tertiary'>
                                {name}
                            </Typography>
                        </Box>
                        <Box
                            pt={2}
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'>
                            <Box display='flex' alignItems='center'>
                                <Tooltip
                                    title={`${issueType}`}
                                    placement='bottom'>
                                    <Box>
                                        <Image
                                            name={IssueType[issueType]}
                                            sx={{
                                                width: 18,
                                                height: 18,
                                                mt: 1,
                                            }}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                            <Box display='flex' alignItems='center'>
                                <Tooltip
                                    title={`${priority}`}
                                    placement='bottom'>
                                    <Box>
                                        <Image
                                            name={Priority[priority]}
                                            sx={{ width: 16, height: 1, mt: 1 }}
                                        />
                                    </Box>
                                </Tooltip>

                                <Tooltip
                                    title={`${'Gaurav Gupta'}`}
                                    placement='bottom'>
                                    <Box>
                                        <Avatar
                                            src={`https://api.files.clikkle.com/open/file/preview/${members[assignee]?.photo}`}
                                            sx={{
                                                ml: 1,
                                                width: 22,
                                                height: 22,
                                            }}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
};
