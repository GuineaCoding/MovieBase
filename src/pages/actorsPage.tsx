import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import { Grid, Paper, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { fetchPopularActors } from '../api/tmdb-api';

const ActorsPage = () => {
    const { data, error, isLoading, isError } = useQuery('popularActors', fetchPopularActors);

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom>Popular Actors</Typography>
            <Grid container spacing={2}>
                {data.results.map((actor) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                        <Card>
                            <CardActionArea component={Link} to={`/actors/${actor.id}`}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                    alt={actor.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6">
                                        {actor.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default ActorsPage;
