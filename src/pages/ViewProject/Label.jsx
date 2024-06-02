import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Chip, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useOrganizationId } from '../../hooks/Authorize';
import { useMessage } from '../../components/Header';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const Label = ({ setLabelsList, labels }) => {
    const { showError, showSuccess } = useMessage();
    const organizationId = useOrganizationId();

    const [labelState, setLabelState] = useState(true);
    const [labelsOptions, setLabelsOptions] = useState([]);
    const [value, setValue] = useState(labels);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleSelectChange = (event, newValue) => {
        setValue(newValue);

        setLabelState(false);
    };
    useEffect(() => {
        setLabelsList(value?.map((val) => val._id));
    }, [value, setLabelsList]);

    const fetchlabels = useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/organization/${organizationId}/label`
                );
                setLabelsOptions(response.data.labels);
            } catch (e) {
                console.log(e);
            }
        },
        [setLabelsOptions, organizationId]
    );

    const createlabel = useCallback(
        async function (inputValue) {
            try {
                const response = await axios.post(
                    `/organization/${organizationId}/label`,
                    {
                        name: inputValue,
                    }
                );
                const { success, message, error } = response.data;

                if (!success) return showError(error);

                showSuccess(message);
            } catch (e) {
                console.log(e);
            }
        },
        [organizationId, showError, showSuccess]
    );

    useEffect(() => {
        fetchlabels();
    }, [fetchlabels]);

    const handleAddOption = () => {
        if (
            inputValue.trim() !== '' &&
            !labelsOptions.some((option) => option.name === inputValue)
        ) {
            createlabel(inputValue);
            setLabelsOptions((prevOptions) => [
                ...prevOptions,
                { name: inputValue },
            ]);
            setValue((prevValue) => [...prevValue, { name: inputValue }]);
            setInputValue('');
        }
    };

    const renderTags = (value, getTagProps) =>
        value.map((option, index) => (
            <Chip
                label={option.name}
                {...getTagProps({ index })}
                onDelete={() => {
                    const newValues = [...value];
                    newValues.splice(index, 1);
                    setValue(newValues);
                }}
            />
        ));
    const showAddButton =
        inputValue.trim() !== '' &&
        !labelsOptions.some((option) => option.name === inputValue);
    return (
        <>
            <Grid item xs={4}>
                <Typography
                    variant='caption'
                    color='text.secondary'
                    fontWeight={500}
                >
                    Label
                </Typography>
            </Grid>
            <Grid item xs={8}>
                {labelState ? (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            p: 0.5,
                            cursor: 'pointer',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'white.light',
                            },
                        }}
                        onClick={() => setLabelState(false)}
                    >
                        {labels && labels.length > 0 ? (
                            labels.map((label) => (
                                <Typography
                                    variant='body2'
                                    color='text.tertiary'
                                    sx={{ ml: 1 }}
                                >
                                    {label.name}
                                </Typography>
                            ))
                        ) : (
                            <Typography
                                variant='body2'
                                color='text.tertiary'
                                sx={{ ml: 1 }}
                            >
                                None
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <>
                        <Autocomplete
                            fullWidth
                            size='small'
                            multiple
                            value={value}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            onChange={handleSelectChange}
                            options={labelsOptions}
                            freeSolo
                            sx={{
                                '&.MuiAutocomplete-root .MuiOutlinedInput-root':
                                    {
                                        paddingRight: 0.5,
                                    },
                            }}
                            getOptionLabel={(option) => option.name}
                            renderTags={renderTags}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    placeholder='Labels'
                                    variant='outlined'
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {showAddButton && (
                                                    <IconButton
                                                        onClick={
                                                            handleAddOption
                                                        }
                                                        size='small'
                                                        sx={{
                                                            border: 'none',
                                                            backgroundColor:
                                                                'transparent',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <AddIcon
                                                            color='primary'
                                                            fontSize='small'
                                                        />
                                                    </IconButton>
                                                )}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </>
                )}
            </Grid>
        </>
    );
};

export default Label;
