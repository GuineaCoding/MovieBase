import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Grid, Paper, Typography, Card, CardMedia, CardContent, Box, Pagination } from '@mui/material';
import { fetchPopularActors } from '../api/tmdb-api';

const ActorsPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(['popularActors', page], () => fetchPopularActors(page));

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom>Popular Actors</Typography>
            <Grid container spacing={2}>
                {data.results.map((actor) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                alt={actor.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>{actor.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Known for: {actor.known_for.map(movie => movie.title).join(', ')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {data.total_pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <Pagination count={data.total_pages} page={page} onChange={handlePageChange} />
                </Box>
            )}
        </Paper>
    );
};

export default ActorsPage;
