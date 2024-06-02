import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const Search = (props) => {
    const { placeholder, sx, ...rest } = props;
    return (
        <Paper
            component='form'
            variant='outlined'
            onClick={(e) => e.stopPropagation()}
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'custom.search.main',
                border: '1px solid',
                borderColor: 'divider',
                minHeight: '36px',
                maxWidth: '300px',
                width: '100%',
                borderRadius: '5px',
                px: 1,
                ...sx,
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    'input::placeholder': {
                        fontSize: '12px',
                    },
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder={placeholder ? placeholder : 'Search......'}
                {...rest}
            />

            <IconButton type='button' aria-label='search'>
                <SearchIcon fontSize='small' />
            </IconButton>
        </Paper>
    );
};

export default Search;
