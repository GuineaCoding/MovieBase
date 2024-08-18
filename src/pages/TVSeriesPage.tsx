import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Grid, Paper, Typography, Card, CardContent, CardMedia, TextField,
  MenuItem, FormControl, Select, InputLabel, Box, Pagination, Button
} from '@mui/material';
import Spinner from '../components/spinner';
import { fetchTVSeries } from '../api/tmdb-api';
import { useLanguage } from '../components/language';
import { SelectChangeEvent } from '@mui/material/Select';

interface Series {
  id: string;
  poster_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

interface QueryData {
  results: Series[];
  total_pages: number;
}

const releaseYearFilter = (series: Series, year: string) => !year || (series.first_air_date && series.first_air_date.startsWith(year));
const popularityFilter = (series: Series, popularity: string) => !popularity || series.popularity >= parseInt(popularity);

const TVSeriesPage = () => {
    const { language } = useLanguage() as { language: string; switchLanguage: (lang: string) => void };
    const [page, setPage] = useState<number>(1);
    const [sortProperty, setSortProperty] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<string>('');
    const [minimumPopularity, setMinimumPopularity] = useState<string>('');

    const { data, error, isLoading, isError } = useQuery<QueryData, Error>(['tvSeries', page, language], () => fetchTVSeries(page, language), {
        keepPreviousData: true,
    });

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortProperty(event.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />;
    if (isError && error) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    const filteredAndSortedSeries = (data?.results || []).filter(series => 
        releaseYearFilter(series, releaseYear) && popularityFilter(series, minimumPopularity)
    ).sort((a, b) => {
        if (!sortProperty) return 0;
        return sortProperty === 'popularity' ? b.popularity - a.popularity : new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
    });

    return (
        <>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortProperty}
                        onChange={handleSortChange}
                        displayEmpty
                    >
                        <MenuItem value=""><em>Sort By</em></MenuItem>
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
            <Paper style={{ padding: '20px', margin: '20px', backgroundColor: 'transparent' }}>
                <Typography variant="h4" gutterBottom>Popular TV Series</Typography>
                <Grid container spacing={2}>
                    {filteredAndSortedSeries.map((series) => (
                        <Grid item xs={12} sm={6} md={4} key={series.id}>
                            <Card sx={{ backgroundColor: 'darkgreen', color: 'white', display: 'flex', flexDirection: 'column', minHeight: 400 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 250 }}  
                                    image={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                                    alt={series.name}
                                />
                                <CardContent sx={{ flexGrow: 1, minHeight: 460 }}>  
                                    <Typography variant="h6" gutterBottom>
                                        <RouterLink to={`/series/${series.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {series.name}
                                        </RouterLink>
                                    </Typography>
                                    <Typography variant="body2" color="inherit">{series.overview}</Typography>
                                    <Typography variant="body2" color="inherit">First Air Date: {new Date(series.first_air_date).toLocaleDateString()}</Typography>
                                    <Typography variant="body2" color="inherit">Popularity: {series.popularity}</Typography>
                                    <Typography variant="body2" color="inherit">Vote Average: {series.vote_average} ({series.vote_count} votes)</Typography>
                                </CardContent>
                                <Button component={RouterLink} to={`/series/${series.id}`} sx={{ mt: 'auto', bgcolor: 'white', color: 'darkgreen', '&:hover': { bgcolor: 'lightgray' } }}>
                                    More Info
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {data && data.total_pages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <Pagination count={data.total_pages} page={page} onChange={handlePageChange} />
                    </Box>
                )}
            </Paper>
        </>
    );
};

export default TVSeriesPage;
