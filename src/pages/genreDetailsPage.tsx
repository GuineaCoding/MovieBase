import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner'; 
import { Grid, Paper, Typography } from '@mui/material';
import { fetchGenreMovies } from "../api/tmdb-api";

const GenreDetailsPage = () => {
    const { genreId } = useParams();
    const { data, error, isLoading, isError } = useQuery(['genreMovies', genreId], () => fetchGenreMovies(genreId));

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom>Movies in this Genre</Typography>
            <Grid container spacing={2}>
                {data.results.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Typography>{movie.title}</Typography> 
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default GenreDetailsPage;
