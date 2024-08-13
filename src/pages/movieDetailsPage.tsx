import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  Link,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import Spinner from '../components/spinner';
import { getMovie, getMovieCredits } from '../api/tmdb-api';
import { useLanguage } from '../components/language';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: movie, isLoading: movieLoading, isError: movieIsError, error: movieError } = useQuery(['movie', id, language], () => getMovie(id, language));
  const { data: credits, isLoading: creditsLoading, isError: creditsIsError, error: creditsError } = useQuery(['movieCredits', id, language], () => getMovieCredits(id, language));

  if (movieLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <Typography variant="h6" color="error">{movieError.message}</Typography>;
  }

  if (creditsIsError) {
    return <Typography variant="h6" color="error">{creditsError.message}</Typography>;
  }

  return (
    <Paper style={{ padding: 20, margin: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>{movie.title}</Typography>
          <Typography variant="subtitle1">{movie.tagline}</Typography>
          <Typography variant="body1">{movie.overview}</Typography>
          <Typography variant="body2">Release Date: {new Date(movie.release_date).toLocaleDateString()}</Typography>
          <Typography variant="body2">Runtime: {movie.runtime} minutes</Typography>
          <Typography variant="body2">Budget: ${movie.budget.toLocaleString()}</Typography>
          <Typography variant="body2">Revenue: ${movie.revenue.toLocaleString()}</Typography>
          <Typography variant="body2">Status: {movie.status}</Typography>
          <Typography variant="body2">Vote Average: {movie.vote_average} ({movie.vote_count} votes)</Typography>
          <Typography variant="body2">Popularity: {movie.popularity}</Typography>
          {movie.homepage && (
            <Link href={movie.homepage} target="_blank" rel="noopener noreferrer">Visit Official Website</Link>
          )}
          <Typography variant="h6" gutterBottom>Genres:</Typography>
          {movie.genres.map(genre => (
            <Link component={RouterLink} to={`/genres/${genre.id}`} key={genre.id} style={{ marginRight: 8 }}>{genre.name}</Link>
          ))}
          <Typography variant="h6" gutterBottom>Production Companies:</Typography>
          {movie.production_companies.map(company => (
            <Link key={company.id} href={`/companies/${company.id}`}>{company.name}</Link>
          ))}
          <Typography variant="h6" gutterBottom>Production Countries:</Typography>
          {movie.production_countries.map(country => (
            <Link key={country.iso_3166_1} href={`/countries/${country.iso_3166_1}`}>{country.name}</Link>
          ))}
          <Typography variant="h6" gutterBottom>Spoken Languages:</Typography>
          {movie.spoken_languages.map(language => (
            <Typography key={language.iso_639_1}>{language.name} ({language.english_name})</Typography>
          ))}
          {movie.imdb_id && (
            <Link href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDb</Link>
          )}
          <Typography variant="h6" gutterBottom>Cast:</Typography>
          <List>
            {credits.cast.slice(0, 10).map((actor) => (
              <ListItem key={actor.cast_id}>
                <ListItemAvatar>
                  <Avatar src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`} alt={actor.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link component={RouterLink} to={`/actors/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {actor.name}
                    </Link>
                  }
                  secondary={actor.character}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieDetailsPage;
