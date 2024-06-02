import { Box, Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import React from 'react';

const data = [
    { value: 80, label: 'Running Tasks' },
    { value: 20, label: 'Completed Tasks' },
];

const size = {
    width: 400,
    height: 300,
};

const TaskStatus = () => {
    return (
        <>
            <Card
                sx={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '500px',
                }}
            >
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
                    <Typography variant='h6' sx={{ mb: 5 }}>
                        Advanced Task Status
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {' '}
                        <PieChart
                            series={[
                                {
                                    data,

                                    cx: 180,
                                    innerRadius: 50,
                                    outerRadius: 120,
                                    highlightScope: {
                                        faded: 'global',
                                        highlighted: 'item',
                                    },
                                    faded: {
                                        innerRadius: 30,
                                        additionalRadius: -30,
                                    },
                                },
                            ]}
                            {...size}
                            legend={{ hidden: true }}
                        ></PieChart>
                    </Box>
                    <Box mt={2}>
                        <Typography variant='h6' textAlign='center'>
                            Total Tasks = 120
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default TaskStatus;
