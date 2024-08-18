import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/authenthication';
import { CircularProgress, Typography, Box, Link, Container, Card, CardMedia, CardContent, Grid, MenuItem, FormControl, InputLabel, Select, Pagination, Button } from "@mui/material";

interface Favorite {
    id: number;
    image_url: string;
    title: string;
    rating: number;
    vote_count: number;
    popularity: number;
    release_date: string;
    overview: string;
    movie_id: number;
}

const FavoritesPage = () => {
    const { supabase } = useContext(AuthContext);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchFavorites = async () => {
            const { data: session, error: sessionError } = await supabase.auth.getSession();
            const user = session?.user;

            if (user) {
                const { data, error, count } = await supabase
                    .from('favorites')
                    .select('*', { count: 'exact' })
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: sortOrder === 'asc' })
                    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

                if (error) {
                    console.error('Error fetching favorites:', error);
                    setError('Failed to fetch favorites');
                } else {
                    setFavorites(data);
                    setTotalPages(Math.ceil(count / itemsPerPage));
                }
            } else {
                console.error("No user session found.");
                setError('No user session found');
            }
            setLoading(false);
        };

        fetchFavorites();
    }, [supabase.auth, sortOrder, page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ maxWidth: 1220 }}>
            <Typography variant="h4" gutterBottom>
                My Favorites
            </Typography>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortOrder}
                        label="Sort By"
                        onChange={(e) => setSortOrder(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="desc">Most Recent First</MenuItem>
                        <MenuItem value="asc">Oldest First</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {favorites.length > 0 ? (
                <Grid container spacing={4}>
                {favorites.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card sx={{ backgroundColor: 'darkgreen', color: 'white', display: 'flex', flexDirection: 'column', minHeight: 400 }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 450 }}  
                                image={`https://image.tmdb.org/t/p/w500${movie.image_url || 'path/to/default/image.jpg'}`}
                                alt={movie.title}
                            />
                            <CardContent sx={{ flexGrow: 1, minHeight: 530 }}>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    {movie.title}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }} color="inherit">
                                    Rating: {movie.rating} | Votes: {movie.vote_count}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }} color="inherit">
                                    Popularity: {movie.popularity}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }} color="inherit">
                                    Release Date: {new Date(movie.release_date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }} color="inherit">
                                    Overview: {movie.overview}
                                </Typography>
                            </CardContent>
                            <Button component={Link} href={`/movies/${movie.movie_id}`} sx={{ mt: 'auto', bgcolor: 'white', color: 'darkgreen', '&:hover': { bgcolor: 'lightgray' } }}>
                                More Info
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            ) : (
                <Typography variant="subtitle1">You haven't added any favorites yet!</Typography>
            )}
            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Container>
    );
};

export default FavoritesPage;
