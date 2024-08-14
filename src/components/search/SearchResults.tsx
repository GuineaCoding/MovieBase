import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Link } from '@mui/material';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface SearchResultsProps {
  results: Movie[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <Grid container spacing={2}>
      {results.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                  {movie.title}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Release Date: {movie.release_date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResults;
