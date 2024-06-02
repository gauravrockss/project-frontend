import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import {
    Box,
    FormControl,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import Image from '../../components/Image';
import { IssueType, Priority } from '../../services/stickerColor';
import { Select } from '../../components/Select';
import Search from '../../components/Search';
import TableSkeleton from '../Project/TableSkeleton';

const columns = [
    { id: 'Type', label: 'Type', minWidth: 80 },

    {
        id: 'Key',
        label: 'Key',
        minWidth: 100,
    },
    {
        id: 'Summary',
        label: 'Summary',
        minWidth: 500,
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 150,
    },

    {
        id: 'Assignee',
        label: 'Assignee',
        minWidth: 150,
    },
    {
        id: 'Priority',
        label: 'Priority',
        minWidth: 100,
    },

    {
        id: 'CreatedAt',
        label: 'Created At',
        minWidth: 100,
    },
    {
        id: 'UpdatedAt',
        label: 'Updated At',
        minWidth: 100,
    },
    {
        id: 'Reporter',
        label: 'Reporter',
        minWidth: 150,
    },
];

const priorities = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];
const types = ['Task', 'Bug'];

const List = props => {
    const issueListData = [
        {
            status: 'Done',
            name: 'This is my demo issue data',
            issueType: 'Bug',
            key: 'C0123',

            priority: 'High',
        },
        {
            status: 'Done',
            name: 'This is my demo issue data',
            issueType: 'Bug',
            key: 'C0123',

            priority: 'High',
        },
        {
            status: 'Done',
            name: 'This is my demo issue data',
            issueType: 'Bug',
            key: 'C0123',

            priority: 'High',
        },
    ];
    const { members } = props;

    const [issues] = React.useState(issueListData);

    const [query, setQuery] = React.useState({
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

    // const fetchIssues = React.useCallback(
    //     async function () {
    //         try {
    //             const response = await axios.get(
    //                 `/organization/${organizationId}/project/${projectId}/issue?${
    //                     query.search && `search=${query.search}`
    //                 }&${query.assignee && `assignee=${query.assignee}`}&${
    //                     query.priority && `priority=${query.priority}`
    //                 }&${query.type && `issueType=${query.type}`}`
    //             );
    //             setIssues(response.data.issues);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [
    //         setIssues,
    //         projectId,
    //         organizationId,
    //         query.assignee,
    //         query.priority,
    //         query.type,
    //         query.search,
    //     ]
    // );

    // React.useEffect(() => {
    //     fetchIssues();
    // }, [fetchIssues]);

    return (
        <Box sx={{ height: 'calc(100vh - 215px)', overflow: 'auto' }}>
            {issues ? (
                <>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='space-between'
                        my={2}
                        px={2}>
                        <Search
                            placeholder='Search this board'
                            sx={{ height: '35px' }}
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
                            mb={1}
                            spacing={2}
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
                                    clear={() =>
                                        setQuery({ ...query, assignee: '' })
                                    }
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
                                        width: '100%',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        paddingTop: '0px',
                                        paddingBottom: '0px',
                                    }}
                                    value={query.priority}
                                    name='priority'
                                    displayEmpty
                                    onChange={handleChangeQuery}
                                    filter={query.priority}
                                    clear={() =>
                                        setQuery({ ...query, priority: '' })
                                    }
                                    renderValue={v => {
                                        if (!query.priority) return 'Priority';

                                        return v;
                                    }}>
                                    {priorities.map(priority => (
                                        <MenuItem value={priority}>
                                            {priority}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl size='small'>
                                <Select
                                    sx={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        paddingTop: '0px',
                                        paddingBottom: '0px',
                                    }}
                                    value={query.type}
                                    name='type'
                                    displayEmpty
                                    onChange={handleChangeQuery}
                                    filter={query.type}
                                    clear={() =>
                                        setQuery({ ...query, type: '' })
                                    }
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
                    <TableContainer sx={{ my: 1 }}>
                        <Table
                            stickyHeader
                            aria-label='sticky table'
                            sx={{
                                '& .MuiTableCell-root': {
                                    border: 1,
                                    borderColor: 'divider',
                                },
                            }}>
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}>
                                            <Typography variant='caption'>
                                                {column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {issues?.map((issue, i) => {
                                    const taskReporter = 'Gaurav Gupta';
                                    const taskAssign = 'Gaurav Gupta';

                                    return (
                                        <TableRow key={i} hover>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                align='center'>
                                                <Tooltip
                                                    title={`${issue.issueType}`}
                                                    placement='bottom'>
                                                    <Box>
                                                        <Image
                                                            name={
                                                                IssueType[
                                                                    issue
                                                                        .issueType
                                                                ]
                                                            }
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                            }}
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    {issue.key}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    {issue.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    <Typography
                                                        variant='caption'
                                                        sx={{
                                                            backgroundColor:
                                                                issue.status ===
                                                                'Done'
                                                                    ? 'lightGreen.light'
                                                                    : 'skyBlue.light',
                                                            fontWeight: 600,
                                                            color:
                                                                issue.status ===
                                                                'Done'
                                                                    ? 'lightGreen.dark'
                                                                    : 'skyBlue.dark',
                                                        }}>
                                                        {issue.status}
                                                    </Typography>
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    {taskAssign}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                align='center'>
                                                <Tooltip
                                                    title={`${issue.priority}`}
                                                    placement='bottom'>
                                                    <Box>
                                                        <Image
                                                            name={
                                                                Priority[
                                                                    issue
                                                                        .priority
                                                                ]
                                                            }
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                            }}
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            </TableCell>

                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    12 jan 2024
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    13 jan 2024
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                <Typography
                                                    variant='caption'
                                                    color='text.tertiary'>
                                                    {taskReporter}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <TableSkeleton />
            )}
            {/* <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component='div'
                count={issueList ? issueList?.length : '0'}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Box>
    );
};

export default List;
