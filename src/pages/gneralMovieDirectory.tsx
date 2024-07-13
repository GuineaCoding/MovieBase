import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMovies } from '../api/tmdb-api';
import { Container, Grid, Typography, TextField, Button, Box, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';

const MovieDirectoryPage: React.FC = () => {
    const [filter, setFilter] = useState('');
    const { data: movies, error, isLoading, isError } = useQuery('movies', getMovies);

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Container>
            <Typography variant="h3" gutterBottom>Movie Directory</Typography>
            <Box mb={4}>
                <TextField
                    label="Search Movies"
                    variant="outlined"
                    fullWidth
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </Box>
            <Grid container spacing={2}>
                {movies.filter(movie => movie.title.toLowerCase().includes(filter.toLowerCase())).map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">{movie.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {movie.overview.substring(0, 100)}...
                                </Typography>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MovieDirectoryPage;
