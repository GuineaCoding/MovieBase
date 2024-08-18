import { useQuery } from 'react-query';
import Spinner from '../components/spinner';  
import GenreItem from '../components/genresPage/index';
import { fetchGenres } from "../api/tmdb-api";
import { Grid, Paper, Typography } from '@mui/material';
import { useLanguage } from '../components/language';

const GenresPage = () => {
    const { language } = useLanguage();
    const { data, error, isLoading, isError } = useQuery(['genres', language], () => fetchGenres(language));
    console.log(data)
    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px', backgroundColor: 'transparent' }}>
            <Typography variant="h4" gutterBottom>Genres</Typography>
            <Grid container spacing={2}>
                {data.genres.map((genre) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
                        <GenreItem genre={genre} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default GenresPage;
