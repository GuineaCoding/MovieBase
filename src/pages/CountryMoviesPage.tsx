import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Spinner from '../components/spinner';
import getMoviesByCountry from '../api/tmdb-api';

const CountryMoviesPage = () => {
  const { countryCode } = useParams();
  const { data, isLoading, isError, error } = useQuery(['moviesByCountry', countryCode], () => getMoviesByCountry(countryCode));

  if (isLoading) return <Spinner />;
  if (isError) return <Typography variant="h6" color="error">{error.message}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Movies from {countryCode}</Typography>
      <Grid container spacing={2}>
        {data.results.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="textSecondary">{movie.overview}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CountryMoviesPage;
