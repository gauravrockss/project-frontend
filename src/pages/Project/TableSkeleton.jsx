import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';

const TableSkeleton = () => {
    return (
        <>
            <TableContainer>
                <Table
                    stickyHeader
                    aria-label='sticky table'
                    sx={{
                        '& .MuiTableCell-root': {
                            border: 1,
                            borderColor: 'rgba(255, 255, 255, 0.07)',
                            // borderColor: '#1A1A1A',
                            px: 2,
                            py: 1,
                            mt: 4,
                        },
                    }}>
                    <TableHead>
                        <TableRow>
                            {Array(8)
                                .fill()
                                .map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton animation='wave' width={150} height={40} />
                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array(10)
                            .fill()
                            .map((_, i) => (
                                <TableRow hover sx={{ cursor: 'pointer' }} key={i}>
                                    <TableCell component='th' scope='row'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>
                                    <TableCell component='th' scope='row' align='center'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>
                                    <TableCell component='th' scope='row' align='center'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>

                                    <TableCell component='th' scope='row'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>

                                    <TableCell component='th' scope='row'>
                                        <Skeleton animation='wave' width={80} height={40} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableSkeleton;
