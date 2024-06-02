import React from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
    width: '100%',
    background: theme.palette.background.paper,
    padding: '8px 10px',
    borderRadius: '12px',
    borderColor: 'transparent',
}));

const DataGrid = (props) => {
    return <StyledDataGrid {...props} />;
};

export default DataGrid;
