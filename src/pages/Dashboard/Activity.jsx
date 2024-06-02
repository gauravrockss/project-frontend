import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { escapeDanger, formatTimeAgo } from '../../utilities/function';
import Loading from '../../components/Loading';
import { BackgroundColor, Color } from '../../services/stickerColor';
import { useNavigate } from 'react-router-dom';

const Activity = ({ activities, members }) => {
    const navigate = useNavigate();

    const activityTypePage = {
        member: '/organization-user',
        organization: '/organizations',
        project: '/projects',
    };

    return (
        <>
            {activities ? (
                activities?.map((activity, i) => {
                    const currentTime = new Date();
                    const activiteTime = new Date(activity.time);
                    const differenceInMilliseconds = currentTime - activiteTime;
                    const formattedTimeAgo = formatTimeAgo(
                        differenceInMilliseconds
                    );

                    return (
                        <Grid
                            key={i}
                            container
                            spacing={2}
                            alignItems='start'
                            flexWrap='nowrap'
                            mb={2}
                            py={1}>
                            <Grid item>
                                <Avatar variant='rounded' />
                            </Grid>
                            <Grid
                                item
                                xs
                                sx={{
                                    minWidth: '0',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    navigate(
                                        activity.type === 'issue' ||
                                            activity.type === 'comment'
                                            ? `/projects/${activity.correspondId?.project}/board?issues=${activity.correspondId?.issue}`
                                            : activityTypePage[activity.type]
                                    )
                                }>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'row nowrap',
                                        position: 'relative',
                                        minHeight: '100%',
                                        minWidth: '0',
                                    }}>
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: escapeDanger(
                                                activity.description
                                            ),
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            backgroundColor:
                                                BackgroundColor[activity.type],
                                            fontWeight: 600,
                                            color: Color[activity.type],
                                            borderRadius: '4px',
                                            textTransform: 'capitalize',
                                            px: 0.4,
                                            fontSize: 13,
                                            ml: 1,
                                        }}>
                                        {activity.type}
                                    </Box>
                                </Box>
                                <Typography
                                    variant='body2'
                                    fontSize='12px'
                                    color='text.secondary'>
                                    {activity.fullName}
                                </Typography>
                            </Grid>
                            <Grid item textAlign='center'>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'>
                                    {formattedTimeAgo}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Activity;
