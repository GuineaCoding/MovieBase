import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/tmdb-api'; 
import { Container, List, ListItem, ListItemText, Divider, CircularProgress, Typography, Button } from '@mui/material';

const MovieListViewer: React.FC = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const data = await getMovies(page, itemsPerPage);
                setMovies(data.results);
                setError('');
            } catch (error) {
                setError('Failed to fetch movies');
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    const handlePrevPage = () => {
        setPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPage(prev => prev + 1);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Movie List Viewer
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {movies.map(movie => (
                        <React.Fragment key={movie.id}>
                            <ListItem>
                                <ListItemText primary={movie.title} secondary={`Release date: ${movie.release_date}`} />
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            )}
            <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={page === 1}>
                Previous
            </Button>
            <Button variant="contained" color="primary" onClick={handleNextPage}>
                Next
            </Button>
        </Container>
    );
};

export default MovieListViewer;
