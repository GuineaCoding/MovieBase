import React, { useState } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';

const MovieListFilter = ({ onFilterChange, onSortChange }) => {
    const [filter, setFilter] = useState('');
    const [sortOption, setSortOption] = useState('popularity.desc');

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        if (onFilterChange) {
            onFilterChange(newFilter);
        }
    };

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        setSortOption(newSort);
        if (onSortChange) {
            onSortChange(newSort);
        }
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Filter and Sort Movies
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Search Movies"
                        variant="outlined"
                        fullWidth
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Type to search movies..."
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            label="Sort By"
                            onChange={handleSortChange}
                        >
                            <MenuItem value="popularity.desc">Most Popular</MenuItem>
                            <MenuItem value="release_date.desc">Newest Releases</MenuItem>
                            <MenuItem value="vote_average.desc">Top Rated</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MovieListFilter;
