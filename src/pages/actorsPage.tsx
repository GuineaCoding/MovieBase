import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Grid, Paper, Typography, Card, CardMedia, CardContent, Box, Pagination, Button } from '@mui/material';
import { fetchPopularActors } from '../api/tmdb-api';
import { useLanguage } from '../components/language';  

const ActorsPage = () => {
    const { language } = useLanguage(); 
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(['popularActors', page, language], () => fetchPopularActors(page, language));

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px', backgroundColor: 'transparent' }}>
            <Typography variant="h4" gutterBottom>Popular Actors</Typography>
            <Grid container spacing={2}>
                {data.results.map((actor) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                        <Card sx={{ backgroundColor: 'darkgreen', color: 'white' }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                alt={actor.name}
                            />
                            <CardContent sx={{ minHeight: '100px' }}>
                                <Typography gutterBottom variant="h6" color="inherit">
                                    <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none', color: 'white' }}>{actor.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Known for: {actor.known_for.map(movie => movie.title).join(', ')}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                                <Button variant="contained" sx={{ backgroundColor: 'white', color: 'darkgreen', '&:hover': { backgroundColor: 'lightgray' } }}>
                                    <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none', color: 'darkgreen' }}>More Info</Link>
                                </Button>
                            </Box>
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
