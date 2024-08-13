import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Chip
} from '@mui/material';
import Spinner from '../components/spinner';
import { fetchSeriesDetails } from '../api/tmdb-api';
import { useLanguage } from '../components/language';

const TVSeriesDetailsPage = () => {
  const { language } = useLanguage();
  const { id } = useParams();
  const { data: series, error, isLoading, isError } = useQuery(['tvSeriesDetails', id, language], () => fetchSeriesDetails(id, language));

  if (isLoading) return <Spinner />;
  if (isError) return <Typography variant="h6" color="error">{error.message}</Typography>;

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3">{series.name}</Typography>
          <Typography variant="subtitle1">{series.tagline}</Typography>
          <Typography paragraph>{series.overview}</Typography>
          <Typography variant="h6">Genres:</Typography>
          <Box>
            {series.genres.map(genre => (
              <Chip key={genre.id} label={genre.name} style={{ margin: 2 }} />
            ))}
          </Box>
          <Typography variant="h6">Created by:</Typography>
          <List>
            {series.created_by.map(creator => (
              <ListItem key={creator.id}>
                <ListItemAvatar>
                  <Avatar src={`https://image.tmdb.org/t/p/w92${creator.profile_path}`} alt={creator.name} />
                </ListItemAvatar>
                <ListItemText primary={creator.name} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Seasons:</Typography>
          {series.seasons.map(season => (
            <Box key={season.id} my={2}>
              <Typography variant="subtitle1">{season.name}</Typography>
              <Typography variant="body2">{season.overview}</Typography>
              <CardMedia
                component="img"
                height="140"
                image={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                alt={season.name}
              />
              <Typography variant="body2">Episodes: {season.episode_count}</Typography>
            </Box>
          ))}
          <Typography variant="h6">Networks:</Typography>
          {series.networks.map(network => (
            <Typography key={network.id}>{network.name}</Typography>
          ))}
          <Typography variant="h6">Languages:</Typography>
          {series.languages.map(language => (
            <Chip key={language} label={language} style={{ margin: 2 }} />
          ))}
          <Typography variant="h6">Production Countries:</Typography>
          {series.production_countries.map(country => (
            <Typography key={country.iso_3166_1}>{country.name}</Typography>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TVSeriesDetailsPage;
