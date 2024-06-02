import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [10, 30, 22, 27, 18, 23, 34, 11, 10, 34, 20, 23];
const pData = [24, 13, 22, 39, 48, 38, 42, 33, 22, 31, 20, 11];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const LineCharts = () => {
    return (
        <LineChart
            height={440}
            sx={{}}
            series={[
                { data: pData, label: 'On going' },
                { data: uData, label: 'Completed' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
    );
};

export default LineCharts;
