import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Card, CardContent, Typography } from '@mui/material';
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = ['San', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TaskTime = () => {
    return (
        <>
            <Card sx={{ position: 'relative' }}>
                <CardContent>
                    <Box
                        sx={{
                            borderLeftWidth: '5px',
                            borderLeftColor: 'primary.main',
                            borderLeftStyle: 'solid',
                            height: '40px',
                            width: '5px',
                            position: 'absolute',

                            left: 1,
                        }}
                    ></Box>
                    <Typography variant='h6'>Time Spent On Task</Typography>
                </CardContent>
                <BarChart
                    height={500}
                    series={[
                        {
                            data: pData,
                            label: 'Work',
                            id: 'Work',
                            stack: 'total',
                        },
                        {
                            data: uData,
                            label: 'Working Hours',
                            id: 'Working Hours',
                            stack: 'total',
                        },
                    ]}
                    xAxis={[
                        {
                            data: xLabels,
                            scaleType: 'band',
                            categoryGapRatio: 0.7,
                        },
                    ]}
                />
            </Card>
        </>
    );
};

export default TaskTime;
