import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography, Paper, CircularProgress, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';
import { fetchActorDetails, fetchActorMovies } from '../api/tmdb-api';

const ActorDetailsPage = () => {
    const { id } = useParams();
    const { data: actorDetails, isLoading: isLoadingDetails, isError: isErrorDetails, error: errorDetails } = useQuery(['actorDetails', id], () => fetchActorDetails(id));
    const { data: actorMovies, isLoading: isLoadingMovies } = useQuery(['actorMovies', id], () => fetchActorMovies(id));

    if (isLoadingDetails || isLoadingMovies) return <CircularProgress />;
    if (isErrorDetails) return <Typography color="error">Error: {errorDetails.message}</Typography>;

    return (
        <Paper style={{ padding: 20, margin: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {actorDetails.name}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="450"
                            image={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
                            alt={actorDetails.name}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="body1">{actorDetails.biography}</Typography>
                    <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                        Born: {new Date(actorDetails.birthday).toLocaleDateString()}
                    </Typography>
                    <div>
                        <Typography variant="h6" gutterBottom>
                            Movies:
                        </Typography>
                        {actorMovies.cast.map((movie) => (
                            <Link key={movie.id} href={`/movies/${movie.id}`} underline="hover">
                                {movie.title}
                            </Link>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ActorDetailsPage;
