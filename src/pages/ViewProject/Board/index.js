import { Grid, Modal, FormControl, MenuItem, Stack, Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BoardColumns from './BoardColumns';

import { useOrganizationId } from '../../../hooks/Authorize';
import { useMessage } from '../../../components/Header';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CreateIssues from '../CreateIssues';
import { Select } from '../../../components/Select';
import Search from '../../../components/Search';

const statuses = ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'];
const priorities = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];
const types = ['Task', 'Bug'];

const Index = props => {
    const issueListData = [
        {
            _id: 'demo',
            name: 'This is my demo issue data',
            issueType: 'Bug',
            assignee: 'Gaurav Gupta',
            priority: 'High',
        },
        {
            _id: 'demo',
            name: 'This is my demo issue data',
            issueType: 'Bug',
            assignee: 'Gaurav Gupta',
            priority: 'Medium',
        },
        {
            _id: 'demo',
            name: 'This is my demo issue data',
            issueType: 'Task',
            assignee: 'Gaurav Gupta',
            priority: 'Low',
        },
    ];
    const { members, setPageNo, memberTotalPage, memberCurrentPage } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [openIssue, setOpenIssue] = useState(
        Boolean(searchParams.get('issues'))
    );

    const [issueList, setIssueList] = useState(issueListData);
    const [comments, setComments] = useState(null);

    const [selectedIssue, setSelectedIssue] = useState();
    const [issueDetail, setIssueDetail] = useState(null);
    const [totalIssueList, setTotalIssueList] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);

    const projectId = useParams().id;
    const organizationId = useOrganizationId();

    const { showError } = useMessage();

    const [query, setQuery] = useState({
        assignee: '',
        priority: '',
        type: '',
        search: '',
    });
    const handleChangeQuery = e => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery({ ...query, [name]: value });
    };

    const onDragEnd = result => {
        const { source, destination, draggableId } = result;
        console.log({ result });

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const draggingIssue = issueList[source.droppableId][source.index];
        issueList[source.droppableId].splice(source.index, 1);
        issueList[destination.droppableId].splice(
            destination.index,
            0,
            draggingIssue
        );

        setIssueList({ ...issueList });

        UpdateIssues(destination.droppableId, draggableId);
    };

    const fetchIssues = useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/project/${projectId}/issue?${
                        query.search && `search=${query.search}`
                    }${query.assignee && `&assignee=${query.assignee}`}${
                        query.priority && `&priority=${query.priority}`
                    }${query.type && `&issueType=${query.type}`}`
                );

                const issuesList = {};

                for (const status of statuses) {
                    issuesList[status] = [];
                }

                for (const statusList of response.data.issues) {
                    const { _id: status, issues } = statusList;
                    issuesList[status] = issues;
                }
                setIssueList(issuesList);
                setTotalIssueList(response.data.issues);
            } catch (e) {
                console.log(e);
            }
        },
        [
            setIssueList,
            projectId,
            organizationId,
            query.assignee,
            query.priority,
            query.type,
            query.search,
        ]
    );

    const UpdateIssues = useCallback(
        async function (status, issueId) {
            try {
                const response = await axios.patch(
                    `/organization/${organizationId}/project/${projectId}/issue/${issueId}`,
                    {
                        status: status,
                    }
                );
                const { success, error } = response.data;

                if (!success) return showError(error);

                fetchIssues();
            } catch (e) {
                console.log(e);
            }
        },
        [organizationId, projectId, showError, fetchIssues]
    );

    const fetchIssue = useCallback(
        async function (id) {
            setIssueDetail(null);
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/project/${projectId}/issue/info/${id}`
                );
                setIssueDetail(response.data.issue);
            } catch (e) {
                console.log(e);
            }
        },
        [setIssueDetail, organizationId, projectId]
    );

    const fetchComments = useCallback(
        async function (id) {
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/project/${projectId}/issue/info/${id}/comment`
                );
                setComments(response.data.comments);
            } catch (e) {
                console.log(e);
            }
        },
        [setComments, organizationId, projectId]
    );
    const fetchMoreIssue = useCallback(
        async function (status, page) {
            setLoadMoreLoading(true);
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/project/${projectId}/issue/${encodeURIComponent(
                        status
                    )}?page=${page + 1}`
                );
                const { issues, pageData } = response.data;
                issueList[status] = [...issueList[status], ...issues];
                setIssueList({ ...issueList });
                setCurrentPage(pageData.currentPage);
            } catch (e) {
                console.log(e);
            } finally {
                setLoadMoreLoading(false);
            }
        },
        [organizationId, projectId, issueList]
    );

    const closeIssueModal = () => {
        searchParams.delete('issues');
        // 👇️ update state after
        setSearchParams(searchParams, { replace: true });
        setOpenIssue(false);
    };

    const openIssueModal = id => {
        setSearchParams(
            params => {
                params.set('issues', id);
                return params;
            },
            { replace: true }
        );

        setSelectedIssue(id);

        setOpenIssue(true);
        fetchIssue(id);
    };

    useEffect(() => {
        projectId && fetchIssues();
    }, [fetchIssues, projectId]);

    useEffect(() => {
        Boolean(searchParams.get('issues')) &&
            fetchIssue(searchParams.get('issues'));
    }, [fetchIssue, searchParams]);

    useEffect(() => {
        Boolean(searchParams.get('issues')) &&
            fetchComments(searchParams.get('issues'));
    }, [searchParams, fetchComments]);

    return (
        <Box>
            <Stack
                my={2}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent='space-between'
                px={2}>
                <Search
                    placeholder='Search this board'
                    sx={{ height: '35px', width: '100%' }}
                    value={query.search}
                    onChange={e =>
                        setQuery({ ...query, search: e.target.value })
                    }
                />
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{
                        mt: { xs: 2, sm: 0 },
                    }}
                    spacing={2}
                    mb={1}
                    justifyContent='space-between'>
                    <FormControl size='small'>
                        <Select
                            sx={{
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                paddingTop: '0px',
                                paddingBottom: '0px',
                                width: '100%',
                            }}
                            value={query.assignee}
                            name='assignee'
                            displayEmpty
                            onChange={handleChangeQuery}
                            filter={members[query.assignee]?.fullName}
                            clear={() => setQuery({ ...query, assignee: '' })}
                            renderValue={v => {
                                if (!query.assignee) return 'Assignee';

                                return members[v]?.fullName;
                            }}>
                            {Object.keys(members).map(member => (
                                <MenuItem value={member}>
                                    {members[member]?.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size='small'>
                        <Select
                            sx={{
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                paddingTop: '0px',
                                paddingBottom: '0px',
                                width: '100%',
                            }}
                            value={query.priority}
                            name='priority'
                            displayEmpty
                            onChange={handleChangeQuery}
                            filter={query.priority}
                            clear={() => setQuery({ ...query, priority: '' })}
                            renderValue={v => {
                                if (!query.priority) return 'Priority';

                                return v;
                            }}>
                            {priorities.map(priority => (
                                <MenuItem value={priority}>{priority}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size='small'>
                        <Select
                            sx={{
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                                width: '100%',
                                cursor: 'pointer',
                                paddingTop: '0px',
                                paddingBottom: '0px',
                            }}
                            value={query.type}
                            name='type'
                            displayEmpty
                            onChange={handleChangeQuery}
                            filter={query.type}
                            clear={() => setQuery({ ...query, type: '' })}
                            renderValue={v => {
                                if (!query.type) return 'Issue Type';

                                return v;
                            }}>
                            {types.map(type => (
                                <MenuItem value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            <Box
                sx={{
                    height: {
                        xs: 'calc(100vh - 470px)',
                        sm: 'calc(100vh - 290px)',
                    },
                    overflow: 'auto',
                    px: 2,
                }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid
                        container
                        spacing={2}
                        mb={3}

                        // flexWrap='nowrap'
                        // sx={{
                        //     '&>.MuiGrid-item': {
                        //         flexBasis: '280px',
                        //         flexShrink: 0,
                        //     },
                        // }}
                    >
                        <Grid item lg={2.4} md={4} sm={6} xs={12}>
                            <Droppable droppableId='Backlog'>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            height: '100%',
                                            overflow: 'hidden',
                                        }}>
                                        <BoardColumns
                                            loadMoreLoading={loadMoreLoading}
                                            currentPage={currentPage}
                                            totalIssueList={totalIssueList}
                                            fetchMoreIssue={fetchMoreIssue}
                                            ProjectId={projectId}
                                            fetchIssues={fetchIssues}
                                            issueList={issueList}
                                            title='Backlog'
                                            issues={issueList}
                                            members={members}
                                            openIssueModal={openIssueModal}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item lg={2.4} md={4} sm={6} xs={12}>
                            <Droppable droppableId='To Do'>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ height: '100%' }}>
                                        <BoardColumns
                                            currentPage={currentPage}
                                            loadMoreLoading={loadMoreLoading}
                                            totalIssueList={totalIssueList}
                                            fetchMoreIssue={fetchMoreIssue}
                                            ProjectId={projectId}
                                            fetchIssues={fetchIssues}
                                            issueList={issueList}
                                            issues={issueList}
                                            members={members}
                                            title='To Do'
                                            openIssueModal={openIssueModal}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item lg={2.4} md={4} sm={6} xs={12}>
                            <Droppable droppableId='In Progress'>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ height: '100%' }}>
                                        <BoardColumns
                                            currentPage={currentPage}
                                            loadMoreLoading={loadMoreLoading}
                                            totalIssueList={totalIssueList}
                                            fetchMoreIssue={fetchMoreIssue}
                                            ProjectId={projectId}
                                            fetchIssues={fetchIssues}
                                            issueList={issueList}
                                            issues={issueList}
                                            members={members}
                                            title='In Progress'
                                            openIssueModal={openIssueModal}
                                            setComments={setComments}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item lg={2.4} md={4} sm={6} xs={12}>
                            <Droppable droppableId='Review'>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ height: '100%' }}>
                                        <BoardColumns
                                            currentPage={currentPage}
                                            loadMoreLoading={loadMoreLoading}
                                            totalIssueList={totalIssueList}
                                            ProjectId={projectId}
                                            fetchMoreIssue={fetchMoreIssue}
                                            fetchIssues={fetchIssues}
                                            issueList={issueList}
                                            issues={issueList}
                                            members={members}
                                            title='Review'
                                            openIssueModal={openIssueModal}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item lg={2.4} md={4} sm={6} xs={12}>
                            <Droppable droppableId='Done'>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ height: '100%' }}>
                                        <BoardColumns
                                            currentPage={currentPage}
                                            loadMoreLoading={loadMoreLoading}
                                            totalIssueList={totalIssueList}
                                            ProjectId={projectId}
                                            fetchIssues={fetchIssues}
                                            fetchMoreIssue={fetchMoreIssue}
                                            issueList={issueList}
                                            members={members}
                                            title='Done'
                                            issues={issueList}
                                            openIssueModal={openIssueModal}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>

                        {/* {!totalIssueList?.length && (
                            <Box
                                display='flex'
                                justifyContent='center'
                                mx='auto'
                            >
                                <NoResult height='30vh' />
                            </Box>
                        )} */}
                    </Grid>
                </DragDropContext>
            </Box>

            <Modal
                sx={{
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={openIssue}
                onClose={closeIssueModal}>
                <>
                    {/* {issueDetail ? ( */}
                    <CreateIssues
                        name={'This is my demo issue data'}
                        description={'This is my demo issue data'}
                        assignee={'Gaurav Gupta'}
                        status={'Done'}
                        issueType={'Bug'}
                        priority={'Medium'}
                        keyId={'CP123'}
                        taskId={selectedIssue}
                        reporter={'Gaurav Gupta'}
                        projectId={issueDetail?.projectId}
                        closeModal={closeIssueModal}
                        fetchIssues={fetchIssues}
                        //     fetchTask={fetchTask}

                        labels={issueDetail?.labels}
                        commentsList={issueDetail?.comments}
                        createdAt={issueDetail?.createdAt}
                        searchParams={searchParams}
                        comments={comments}
                        fetchComments={fetchComments}
                        members={members}
                        setPageNo={setPageNo}
                        memberTotalPage={memberTotalPage}
                        memberCurrentPage={memberCurrentPage}
                    />
                    {/* // ) : ( // <IssueSkeleton /> */}
                    {/* // )} */}
                </>
            </Modal>
        </Box>
    );
};

export default Index;
