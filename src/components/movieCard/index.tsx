import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, CardHeader, Button, Typography, Grid, Box } from "@mui/material";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone"; 
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { red, blue } from "@mui/material/colors";
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

const MovieCard = ({ movie, action, onUpcomingPage }) => {
  const { favourites, addToFavorites } = useContext(MoviesContext);
  const isFavourite = favourites.includes(movie.id);

  const iconColor = onUpcomingPage && isFavourite ? red[500] : blue[500];

  return (
    <Card sx={{ backgroundColor: 'darkgreen', color: 'white' }}>
      <CardMedia
        component="img"
        height="500"
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
        alt={movie.title}
      />
      <CardHeader
        title={<Typography variant="h5" color="inherit">{movie.title}</Typography>}
        sx={{ minHeight: 90, color: 'inherit' }} 
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              <CalendarTodayTwoToneIcon sx={{ color: 'inherit' }} /> 
              Release Date: {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="inherit">
              <StarRateIcon sx={{ color: 'inherit' }} />
              Rating: {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between', color: 'inherit' }}>
        {action && (
          <Box sx={{ flexGrow: 1 }}>
            {action({ ...movie, iconColor })}
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <Button variant="outlined" size="large" fullWidth sx={{ color: 'white', borderColor: 'white' }}>
              More Info ...
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
