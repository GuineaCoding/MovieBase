import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Grid, Paper, Typography, Card, CardMedia, CardContent, Box, Pagination } from '@mui/material';
import { fetchPopularMovies } from '../api/tmdb-api';

const PopularMoviesPage = () => {
    const [page, setPage] = React.useState(1);

    const { data, error, isLoading, isError } = useQuery(['popularMovies', page], () => fetchPopularMovies(page));

    const handlePageChange = (event, value) => {
        setPage(value); 
    };

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom>Popular Movies</Typography>
            <Grid container spacing={2}>
                {data.results.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>{movie.title}</Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Release Date: {movie.release_date}
                                </Typography>
                                <Typography variant="body2">
                                    {movie.overview}
                                </Typography>
                            </CardContent>
                        </Card>
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
