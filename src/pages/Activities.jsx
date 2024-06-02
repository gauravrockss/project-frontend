import React, { useCallback, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Divider,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Stack,
    Typography,
} from '@mui/material';
import { BackgroundColor, Color } from '../services/stickerColor';

import axios from 'axios';

import { useMembers, useOrganizationId } from '../hooks/Authorize';
import Loading from '../components/Loading';
import { escapeDanger } from '../utilities/function';
import { Select } from '../components/Select';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import NoResult from '../components/NoResult';
// import useAutoPaginate from '../hooks/useAutoPaginate';

const Activities = () => {
    const [activities, setActivities] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();
    const organizationId = useOrganizationId();
    const [pageData, setPageData] = useState({});
    const members = useMembers();

    const [query, setQuery] = useState({
        action: '',
        type: '',
        search: '',
    });

    const handleChangeQuery = e => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery({ ...query, [name]: value });
    };

    const fetchActivities = useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/activity?page=${pageNo}&${
                        query.search && `search=${query.search}&searchBy=description`
                    }${query.action && `&action=${query.action}`}${
                        query.type && `&type=${query.type}`
                    }`
                );
                setActivities(response.data.activities);
                setPageData(response.data.pageData.totalPages);
            } catch (e) {
                console.log(e);
            }
        },
        [setActivities, organizationId, query, setPageData, pageNo]
    );

    const formatTimeAgo = differenceInMilliseconds => {
        const timeUnits = [
            { unit: 'year', value: 365 * 24 * 60 * 60 * 1000 },
            { unit: 'month', value: 30 * 24 * 60 * 60 * 1000 },
            { unit: 'week', value: 7 * 24 * 60 * 60 * 1000 },
            { unit: 'day', value: 24 * 60 * 60 * 1000 },
            { unit: 'hour', value: 60 * 60 * 1000 },
            { unit: 'minute', value: 60 * 1000 },
            { unit: 'second', value: 1000 },
        ];

        for (const { unit, value } of timeUnits) {
            const differenceInUnit = Math.floor(differenceInMilliseconds / value);

            if (differenceInUnit > 0) {
                return `${differenceInUnit} ${differenceInUnit === 1 ? unit : unit + 's'} ago`;
            }
        }

        return 'Just now';
    };

    const activityTypePage = {
        member: '/organization-user',
        organization: '/organizations',
        project: '/projects',
    };

    // useAutoPaginate({
    //     container: document.getElementById('activities'),
    //     cb: fetchActivities,
    //     totalPages: pageData.totalPages,
    // });

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    return (
        <>
            <Box my={3}>
                <Box sx={{ mt: 3, px: 2 }}>
                    <Typography variant='h5'>Activities</Typography>

                    <Typography color='text.secondary' variant='body2' my={2}>
                        Stay up to date with what's happening across the project.
                    </Typography>

                    <Divider />
                    <Stack
                        mt={2}
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='space-between'>
                        <Search
                            placeholder='Search this activities'
                            sx={{ height: '35px', width: '100%' }}
                            value={query.search}
                            onChange={e => setQuery({ ...query, search: e.target.value })}
                        />
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            sx={{
                                mt: { xs: 2, sm: 0 },
                            }}
                            spacing={2}
                            my={2}
                            justifyContent='space-between'>
                            <FormControl fullWidth size='small'>
                                <Select
                                    fullWidth
                                    sx={{
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        paddingTop: '0px',
                                        paddingBottom: '0px',
                                        width: '100%',
                                    }}
                                    value={query.type}
                                    name='type'
                                    displayEmpty
                                    onChange={handleChangeQuery}
                                    filter={query.type}
                                    clear={() => setQuery({ ...query, type: '' })}
                                    renderValue={v => {
                                        if (!query.type) return 'Activities types';
                                        return v;
                                    }}>
                                    <MenuItem value='issue'>Issue</MenuItem>
                                    <MenuItem value='comment'>Comment</MenuItem>
                                    <MenuItem value='member'>Member</MenuItem>

                                    <MenuItem value='project'>Project</MenuItem>
                                    <MenuItem value='organization'>Organization</MenuItem>
                                </Select>
                            </FormControl>

                            {query.type === 'issue' && (
                                <>
                                    <FormControl fullWidth size='small'>
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
                                            fullWidth
                                            value={query.action}
                                            name='action'
                                            displayEmpty
                                            onChange={handleChangeQuery}
                                            filter={query.action}
                                            disableClose={true}
                                            clear={() =>
                                                setQuery({
                                                    ...query,
                                                    action: 'create',
                                                })
                                            }
                                            renderValue={v => {
                                                if (!query.action) return 'Action';
                                                return v;
                                            }}>
                                            <MenuItem value='create'>Create</MenuItem>
                                            <MenuItem value='delete'>Delete</MenuItem>
                                            <MenuItem value='status'>Status</MenuItem>
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        </Stack>
                    </Stack>
                </Box>

                <Box
                    id='activities'
                    sx={{
                        height: 'calc(100vh - 245px)',
                        overflow: 'auto',
                        px: 1,
                    }}>
                    {activities ? (
                        <>
                            {activities?.map((activity, i) => {
                                const currentTime = new Date();
                                const activiteTime = new Date(activity.time);
                                const differenceInMilliseconds = currentTime - activiteTime;

                                const formattedTimeAgo = formatTimeAgo(differenceInMilliseconds);
                                return (
                                    <>
                                        <Grid
                                            container
                                            spacing={2}
                                            key={i}
                                            sx={{
                                                px: 1,
                                                pt: 0,
                                                pr: 0,
                                                mt: 0.3,
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'custom.cardHover',
                                                },
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    activity.type === 'issue' ||
                                                        activity.type === 'comment'
                                                        ? `/projects/${activity.correspondId?.project}/board?issues=${activity.correspondId?.issue}`
                                                        : activityTypePage[activity.type]
                                                )
                                            }>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        mt: 1,
                                                    }}
                                                    variant='rounded'
                                                    src={`https://api.files.clikkle.com/open/file/preview/${
                                                        members[activity.performerId]?.photo
                                                    }`}
                                                />
                                            </Grid>
                                            <Grid item xs sx={{ minWidth: 0 }}>
                                                <Box display='flex' flexDirection='column'>
                                                    <Box overflow='hidden' mt={0.5}>
                                                        <Typography
                                                            variant='caption'
                                                            component='span'
                                                            sx={{
                                                                fontSize: '13px',
                                                                p: 0,
                                                            }}
                                                        />
                                                        <span
                                                            style={{
                                                                color: '#B6C2CF',
                                                                fontSize: '13px',
                                                                maxWidth: '100px',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: escapeDanger(
                                                                    activity.description
                                                                ),
                                                            }}
                                                        />
                                                        <Typography
                                                            variant='caption'
                                                            sx={{
                                                                backgroundColor:
                                                                    BackgroundColor[activity.type],
                                                                fontWeight: 600,
                                                                color: Color[activity.type],
                                                                borderRadius: '4px',
                                                                textTransform: 'capitalize',
                                                                px: 0.4,
                                                                ml: 0.5,
                                                            }}>
                                                            {activity.type}
                                                        </Typography>
                                                    </Box>
                                                    <Box display='flex' alignItems='center'>
                                                        <Box display='flex' alignItems='center'>
                                                            <Avatar
                                                                sx={{
                                                                    mr: 1,
                                                                    height: 18,
                                                                    width: 18,
                                                                }}
                                                                src={`https://api.files.clikkle.com/open/file/preview/${
                                                                    members[activity.performerId]
                                                                        ?.photo
                                                                }`}
                                                            />
                                                            <Typography variant='caption'>
                                                                {activity.fullName}
                                                            </Typography>
                                                        </Box>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                            ml={1}>
                                                            {formattedTimeAgo}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Link
                                                    to={
                                                        activity.type === 'issue' ||
                                                        activity.type === 'comment'
                                                            ? `/${activity.correspondId?.projectId}/board?issues=${activity.correspondId?.issueId}`
                                                            : activityTypePage[activity.type]
                                                    }>
                                                    <IconButton
                                                        sx={{
                                                            my: {
                                                                xl: 0,
                                                                xs: 1,
                                                            },
                                                            mx: 1,
                                                            borderRadius: '12px',
                                                            backgroundColor: 'blue.light',
                                                            color: 'blue.dark',
                                                            '&:hover': {
                                                                backgroundColor: 'blue.light',
                                                            },
                                                        }}>
                                                        <CallMadeIcon fontSize='small' />
                                                    </IconButton>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </>
                                );
                            })}
                            <Box textAlign='right' my={2}>
                                {activities?.length ? (
                                    <Pagination
                                        color='primary'
                                        sx={{ float: 'right', my: 3 }}
                                        count={pageData}
                                        page={pageNo}
                                        onChange={(_, newPage) => setPageNo(newPage)}
                                    />
                                ) : (
                                    ''
                                )}
                            </Box>
                        </>
                    ) : (
                        <Loading />
                    )}

                    {!activities?.length && (
                        <Box display='flex' justifyContent='center' mx='auto'>
                            <NoResult height='50vh' />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Activities;
