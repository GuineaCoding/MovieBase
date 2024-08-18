import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Grid, Paper, Typography, Box, Pagination } from '@mui/material';
import MovieCard from '../components/movieCard'; 
import { fetchPopularMovies } from '../api/tmdb-api';
import { useLanguage } from '../components/language';

const PopularMoviesPage = () => {
    const { language } = useLanguage();
    const [page, setPage] = React.useState(1);

    const { data, error, isLoading, isError } = useQuery(['popularMovies', page, language], () => fetchPopularMovies(page, language));

    const handlePageChange = (event, value) => {
        setPage(value); 
    };

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px', backgroundColor: 'transparent' }}> 
            <Typography variant="h4" gutterBottom>Popular Movies</Typography>
            <Grid container spacing={2}>
                {data.results.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard movie={movie} />  
                    </Grid>
                ))}
            </Grid>
            {data?.total_pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <Pagination count={data.total_pages} page={page} onChange={handlePageChange} />
                </Box>
            )}
        </Paper>
    );
};

export default PopularMoviesPage;
