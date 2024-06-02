import * as React from 'react';
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import Image from '../../components/Image';
import { IssueType } from '../../services/stickerColor';
import { useNavigate } from 'react-router-dom';

const AssignedList = ({ issues, issueStatusState, issueStatus }) => {
    const navigate = useNavigate();

    return (
        <>
            {!issueStatusState ? (
                issues?.map((issue, i) => (
                    <Box>
                        <Typography
                            variant='body2'
                            fontWeight='500'
                            textTransform='uppercase'
                            color='text.secondary'
                            my={2}>
                            {issue._id}
                        </Typography>
                        {issue?.issues?.map(issue => (
                            <Grid
                                container
                                spacing={2}
                                key={i}
                                sx={{
                                    p: 1,
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
                                        `/projects/${issue.projectId}/board/?issues=${issue._id}`
                                    )
                                }>
                                <Grid item>
                                    <Tooltip title={issue.issueType} placement='top'>
                                        <Box
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                mr: 1,

                                                cursor: 'pointer',
                                            }}>
                                            <Image name={IssueType[issue.issueType]} />
                                        </Box>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs sx={{ minWidth: 0 }}>
                                    <Box display='flex' alignItems='flex-start'>
                                        <Box
                                            sx={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexFlow: 'column nowrap',
                                                position: 'relative',
                                                minHeight: '100%',
                                                minWidth: '0',
                                            }}>
                                            <Typography
                                                variant='body2'
                                                color='text.tertiary'
                                                fontWeight='bold'
                                                lineHeight='1rem'
                                                sx={{
                                                    // maxWidth: '800px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    py: 0,
                                                    m: 0,
                                                }}>
                                                {issue.name}
                                            </Typography>
                                            <Typography variant='caption' color='text.secondary'>
                                                {issue.key}
                                                {/* -{issue.projectName} */}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        sx={{
                                            mr: 2,
                                            borderColor: 'lightGreen.light',
                                            backgroundColor: 'lightGreen.light',
                                            color: 'lightGreen.dark',
                                            '&:hover': {
                                                borderColor: 'lightGreen.dark',
                                                backgroundColor: 'lightGreen.light',
                                            },
                                        }}>
                                        {issue.status}
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                ))
            ) : (
                <Box>
                    <Typography
                        variant='body2'
                        fontWeight='500'
                        textTransform='uppercase'
                        color='text.secondary'
                        my={2}>
                        {issueStatus}
                    </Typography>
                    {issues?.map((issue, i) => (
                        <Box key={i}>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    pb: 1,
                                    mt: 0.3,
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: 'custom.cardHover',
                                    },
                                }}
                                display='flex'
                                alignItems='center'
                                onClick={() =>
                                    navigate(
                                        `/projects/${issue.projectId}/board/?issues=${issue._id}`
                                    )
                                }>
                                <Grid item xs sx={{ minWidth: 0 }}>
                                    <Box display='flex' alignItems='flex-start'>
                                        <Tooltip title={issue.issueType} placement='top'>
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    mr: 1,
                                                    cursor: 'pointer',
                                                }}>
                                                <Image
                                                    name={IssueType[issue.issueType]}
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                        mr: 1,
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>

                                        <Box
                                            sx={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexFlow: 'column nowrap',
                                                position: 'relative',
                                                minHeight: '100%',
                                                minWidth: '0',
                                            }}>
                                            <Typography
                                                variant='body2'
                                                color='text.tertiary'
                                                fontWeight='bold'
                                                lineHeight='1rem'
                                                sx={{
                                                    maxWidth: '300px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    py: 0,
                                                    m: 0,
                                                }}>
                                                {issue.name}
                                            </Typography>
                                            <Typography variant='caption' color='text.secondary'>
                                                {issue.key}
                                                {/* -{issue.projectName} */}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        sx={{
                                            mr: 2,
                                            borderColor: 'lightGreen.light',
                                            backgroundColor: 'lightGreen.light',
                                            color: 'lightGreen.dark',
                                            '&:hover': {
                                                borderColor: 'lightGreen.dark',
                                                backgroundColor: 'lightGreen.light',
                                            },
                                        }}>
                                        {issue.status}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}{' '}
                </Box>
            )}
        </>
    );
};

export default AssignedList;
