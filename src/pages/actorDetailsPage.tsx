import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography, Paper, CircularProgress, Grid, Card, CardMedia, CardContent, Link, List, ListItem } from '@mui/material';
import { fetchActorDetails, fetchActorMovies } from '../api/tmdb-api';

const ActorDetailsPage = () => {
    const { id } = useParams();
    const { data: actorDetails, isLoading: isLoadingDetails, isError: isErrorDetails, error: errorDetails } = useQuery(['actorDetails', id], () => fetchActorDetails(id));
    const { data: actorMovies, isLoading: isLoadingMovies } = useQuery(['actorMovies', id], () => fetchActorMovies(id));

    if (isLoadingDetails || isLoadingMovies) return <CircularProgress style={{ display: 'block', margin: '0 auto' }} />;
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
                    <Typography variant="h6" gutterBottom>
                        Movies:
                    </Typography>
                    <List>
                        {actorMovies.cast.map((movie) => (
                            <ListItem key={movie.id}>
                                <Link href={`/movies/${movie.id}`} underline="hover" color="inherit">
                                    {`${movie.title} (${new Date(movie.release_date).getFullYear()})`}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ActorDetailsPage;
