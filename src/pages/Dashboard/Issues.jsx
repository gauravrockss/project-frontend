import * as React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { IssueType } from '../../services/stickerColor';
import Image from '../../components/Image';
import { useNavigate } from 'react-router-dom';

const Completed = ({ issues }) => {
    const navigate = useNavigate();

    return (
        <>
            {issues.map((issue, i) => (
                <Grid container key={i} spacing={2} flexWrap='nowrap'>
                    <Grid item xs sx={{ minWidth: 0, mb: 1.8 }}>
                        <Box display='flex' alignItems='flex-start'>
                            <Image
                                name={IssueType[issue.issueType]}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    mr: 1,
                                }}
                            />

                            <Box
                                overflow='hidden'
                                minWidth={0}
                                sx={{ cursor: 'pointer' }}
                                onClick={() =>
                                    navigate(
                                        `/${issue.projectId}/board?issues=${issue._id}`
                                    )
                                }
                            >
                                <Typography
                                    variant='body2'
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {issue.name}
                                </Typography>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                >
                                    {issue.key} - {issue.projectName}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='outlined'
                            size='small'
                            sx={{
                                mr: 1,
                                borderColor:
                                    issue.status === 'Done'
                                        ? 'lightGreen.light'
                                        : 'yellow.light',
                                backgroundColor:
                                    issue.status === 'Done'
                                        ? 'lightGreen.light'
                                        : 'yellow.light',
                                color:
                                    issue.status === 'Done'
                                        ? 'lightGreen.dark'
                                        : 'yellow.dark',
                                '&:hover': {
                                    backgroundColor:
                                        issue.status === 'Done'
                                            ? 'lightGreen.light'
                                            : 'yellow.light',
                                    borderColor:
                                        issue.status === 'Done'
                                            ? 'lightGreen.dark'
                                            : 'yellow.dark',
                                },
                            }}
                        >
                            {issue.status}
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default Completed;
