import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Grid, Paper, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { fetchPopularMovies } from '../api/tmdb-api';

const PopularMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery('popularMovies', fetchPopularMovies);

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
                                    {movie.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default PopularMoviesPage;
