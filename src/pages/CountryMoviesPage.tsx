import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import Spinner from '../components/spinner';
import { getMoviesByCountry } from '../api/tmdb-api';
import { useLanguage } from '../components/language';  

const CountryMoviesPage = () => {
  const { language } = useLanguage();
  const { countryCode } = useParams();
  const { data, isLoading, isError, error } = useQuery(['moviesByCountry', countryCode, language], () => getMoviesByCountry(countryCode, language), {
    onSuccess: (data) => {
      console.log("Fetched movies data:", data); 
    }
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Typography variant="h6" color="error">{error.message}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Movies from {countryCode}</Typography>
      <Grid container spacing={2}>
        {data.results.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 420 }}>
              <CardMedia
                component="img"
                height="250"  
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  <RouterLink to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {movie.title}
                  </RouterLink>
                </Typography>
                <Typography variant="body2" color="textSecondary">{movie.overview}</Typography>
                <Box sx={{ pt: 2 }}>
                  <Typography variant="body2" color="textSecondary">Release Date: {new Date(movie.release_date).toLocaleDateString()}</Typography>
                  <Typography variant="body2" color="textSecondary">Rating: {movie.vote_average} ({movie.vote_count} votes)</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CountryMoviesPage;
