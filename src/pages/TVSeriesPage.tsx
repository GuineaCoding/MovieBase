import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Grid, Paper, Typography, Card, CardContent, CardMedia, TextField, MenuItem, FormControl, Select, InputLabel, Box } from '@mui/material';
import Spinner from '../components/spinner';
import { fetchTVSeries } from '../api/tmdb-api';

// Define the filtering functions
const releaseYearFilter = (series, year) => !year || (series.first_air_date && series.first_air_date.startsWith(year));
const popularityFilter = (series, popularity) => !popularity || series.popularity >= parseInt(popularity);

const TVSeriesPage = () => {
    const { data, error, isLoading, isError } = useQuery('tvSeries', fetchTVSeries);
    const [sortProperty, setSortProperty] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [minimumPopularity, setMinimumPopularity] = useState('');

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    const handleSortChange = (event) => {
        setSortProperty(event.target.value);
    };

    const filteredAndSortedSeries = data?.results.filter(series => 
        releaseYearFilter(series, releaseYear) && popularityFilter(series, minimumPopularity)
    ).sort((a, b) => {
        if (!sortProperty) return 0;
        return sortProperty === 'popularity' ? b.popularity - a.popularity : new Date(b.first_air_date) - new Date(a.first_air_date);
    });

    return (
        <>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortProperty}
                        label="Sort By"
                        onChange={handleSortChange}
                        displayEmpty
                    >
                        <MenuItem value=""><em></em></MenuItem>
                        <MenuItem value="popularity">Popularity</MenuItem>
                        <MenuItem value="first_air_date">Release Date</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Release Year"
                    type="number"
                    value={releaseYear}
                    onChange={e => setReleaseYear(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Minimum Popularity"
                    type="number"
                    value={minimumPopularity}
                    onChange={e => setMinimumPopularity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </Box>
            <Paper style={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h4" gutterBottom>Popular TV Series</Typography>
                <Grid container spacing={2}>
                    {filteredAndSortedSeries?.map((series) => (
                        <Grid item xs={12} sm={6} md={4} key={series.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                                    alt={series.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{series.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {series.overview}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    );
};

export default TVSeriesPage;
